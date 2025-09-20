import { NextResponse, NextRequest } from 'next/server';
import { getFormById, updateForm, deleteForm } from '@/lib/api';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
   const { id } = await params;
   const result = await getFormById(id);
   if (result.error) {
      return NextResponse.json({ error: result.error }, { status: result.status });
   }
   return NextResponse.json(result.data, { status: result.status });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
   const { id } = await params;
   const updatedForm = await request.json();
   const result = await updateForm(id, updatedForm);
   if (result.error) {
      return NextResponse.json({ error: result.error }, { status: result.status });
   }
   return NextResponse.json({ message: result.message }, { status: result.status });
}

export async function DELETE(
   request: NextRequest,
   { params }: { params: Promise<{ id: string }> }
) {
   const { id } = await params;
   const result = await deleteForm(id);
   if (result.error) {
      return NextResponse.json({ error: result.error }, { status: result.status });
   }
   return NextResponse.json({ message: result.message }, { status: result.status });
}
