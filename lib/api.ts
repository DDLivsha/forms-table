import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const formsFilePath = path.join(process.cwd(), 'data/forms.json');

export async function getForms() {
   try {
      const fileContent = await fs.readFile(formsFilePath, 'utf-8');
      const forms = JSON.parse(fileContent);
      return { data: forms, status: 200 };
   } catch (error) {
      console.error('Failed to read forms data:', error);
      return { error: 'Failed to load forms data.', status: 500 };
   }
}

export async function createForm(newFormData: any) {
   try {
      const fileContent = await fs.readFile(formsFilePath, 'utf-8');
      const forms = JSON.parse(fileContent);

      const formWithId = {
         id: uuidv4(),
         ...newFormData,
         updatedAt: new Date().toISOString(),
      };

      forms.push(formWithId);
      await fs.writeFile(formsFilePath, JSON.stringify(forms, null, 2));

      return { data: formWithId, status: 201, message: 'Form created successfully!' };
   } catch (error) {
      console.error('Failed to create new form:', error);
      return { error: 'Failed to create form.', status: 500 };
   }
}

export async function getFormById(id: string) {
   try {
      const fileContent = await fs.readFile(formsFilePath, 'utf-8');
      const forms = JSON.parse(fileContent);
      const form = forms.find((f: any) => f.id === id);

      if (!form) {
         return { error: 'Form not found', status: 404 };
      }

      return { data: form, status: 200 };
   } catch (error) {
      console.error('Failed to get form:', error);
      return { error: 'Failed to load form data.', status: 500 };
   }
}

export async function updateForm(id: string, updatedFormData: any) {
   try {
      const fileContent = await fs.readFile(formsFilePath, 'utf-8');
      const forms = JSON.parse(fileContent);
      const formIndex = forms.findIndex((f: any) => f.id === id);

      if (formIndex === -1) {
         return { error: 'Form not found', status: 404 };
      }

      const newForms = forms.map((form: any) =>
         form.id === id
            ? { ...form, ...updatedFormData, updatedAt: new Date().toISOString() }
            : form
      );

      await fs.writeFile(formsFilePath, JSON.stringify(newForms, null, 2));
      return { message: 'Form updated successfully', status: 200 };
   } catch (error) {
      console.error('Failed to update form:', error);
      return { error: 'Failed to update form.', status: 500 };
   }
}

export async function deleteForm(id: string) {
   try {
      const fileContent = await fs.readFile(formsFilePath, 'utf-8');
      const forms = JSON.parse(fileContent);
      const initialFormsCount = forms.length;
      const filteredForms = forms.filter((f: any) => f.id !== id);

      if (initialFormsCount === filteredForms.length) {
         return { error: 'Form not found', status: 404 };
      }

      await fs.writeFile(formsFilePath, JSON.stringify(filteredForms, null, 2));
      return { message: 'Form deleted successfully', status: 200 };
   } catch (error) {
      console.error('Failed to delete form:', error);
      return { error: 'Failed to delete form.', status: 500 };
   }
}
