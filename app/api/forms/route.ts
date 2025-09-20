import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const formsFilePath = path.join(process.cwd(), 'data/forms.json');

export async function GET() {
   try {
      const fileContent = await fs.readFile(formsFilePath, 'utf-8');
      const forms = JSON.parse(fileContent);
      return NextResponse.json(forms);
   } catch (error) {
      console.error('Failed to read forms data:', error);
      return NextResponse.json({ error: 'Failed to load forms data.' }, { status: 500 });
   }
}

export async function POST(request: Request) {
   try {
      const newForm = await request.json();
      const fileContent = await fs.readFile(formsFilePath, 'utf-8');
      const forms = JSON.parse(fileContent);

      const formWithId = {
         id: uuidv4(),
         ...newForm,
         updatedAt: new Date().toISOString(),
      };

      forms.push(formWithId);

      await fs.writeFile(formsFilePath, JSON.stringify(forms, null, 2));

      return NextResponse.json(formWithId, { status: 201 });
   } catch (error) {
      console.error('Failed to create new form:', error);
      return NextResponse.json({ error: 'Failed to create form.' }, { status: 500 });
   }
}
