import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// 1. Визначаємо інтерфейс для контексту маршруту
interface RouteContext {
   params: {
      id: string;
   };
}

const formsFilePath = path.join(process.cwd(), 'data/forms.json');

export async function GET(request: Request, context: RouteContext) {
   const { id } = context.params;
   try {
      const fileContent = await fs.readFile(formsFilePath, 'utf-8');
      const forms = JSON.parse(fileContent);
      const form = forms.find((f: any) => f.id === id);

      if (!form) {
         return NextResponse.json({ error: 'Form not found' }, { status: 404 });
      }

      return NextResponse.json(form);
   } catch (error) {
      console.error('Failed to get form:', error);
      return NextResponse.json({ error: 'Failed to load form data.' }, { status: 500 });
   }
}

export async function PUT(request: Request, context: RouteContext) {
   const { id } = context.params;
   try {
      const updatedForm = await request.json();
      const fileContent = await fs.readFile(formsFilePath, 'utf-8');
      const forms = JSON.parse(fileContent);

      const formIndex = forms.findIndex((f: any) => f.id === id);

      if (formIndex === -1) {
         return NextResponse.json({ error: 'Form not found' }, { status: 404 });
      }

      const newForms = forms.map((form: any) =>
         form.id === id ? { ...form, ...updatedForm, updatedAt: new Date().toISOString() } : form
      );

      await fs.writeFile(formsFilePath, JSON.stringify(newForms, null, 2));

      return NextResponse.json({ message: 'Form updated successfully' }, { status: 200 });
   } catch (error) {
      console.error('Failed to update form:', error);
      return NextResponse.json({ error: 'Failed to update form.' }, { status: 500 });
   }
}

export async function DELETE(request: Request, context: RouteContext) {
   const { id } = context.params;
   try {
      const fileContent = await fs.readFile(formsFilePath, 'utf-8');
      const forms = JSON.parse(fileContent);

      const initialFormsCount = forms.length;
      const filteredForms = forms.filter((f: any) => f.id !== id);

      if (initialFormsCount === filteredForms.length) {
         return NextResponse.json({ error: 'Form not found' }, { status: 404 });
      }

      await fs.writeFile(formsFilePath, JSON.stringify(filteredForms, null, 2));

      return NextResponse.json({ message: 'Form deleted successfully' }, { status: 200 });
   } catch (error) {
      console.error('Failed to delete form:', error);
      return NextResponse.json({ error: 'Failed to delete form.' }, { status: 500 });
   }
}
