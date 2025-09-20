import { NextRequest, NextResponse } from 'next/server';
import { getForms, createForm } from '@/lib/api';


export async function GET() {
   const result = await getForms();
   if (result.error) {
      return NextResponse.json({ error: result.error }, { status: result.status });
   }
   return NextResponse.json(result.data, { status: result.status });
}

export async function POST(request: NextRequest) {
   const newForm = await request.json();
   const result = await createForm(newForm);
   if (result.error) {
      return NextResponse.json({ error: result.error }, { status: result.status });
   }
   return NextResponse.json(result.data, { status: result.status });
}
