import { NextResponse } from 'next/server';
import data from '@core/data/fakedata.project.json';

export async function GET() {
  const result = await data;

  return NextResponse.json(result);
};
