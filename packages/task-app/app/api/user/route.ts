import data from '@core/data/user.json';
import { NextResponse } from 'next/server';

export async function GET() {
  let user = data;
  return NextResponse.json(user);
};
