export interface IForm {
   id: string;
   title: string;
   description: string | undefined;
   status: 'active' | 'draft' | 'archived';
   updatedAt: string;
   fieldsCount: number;
}