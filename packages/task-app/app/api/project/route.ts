import { NextResponse } from 'next/server';
import data from '@core/data/fakedata.project.json';

export async function GET() {
  const projectData = {
    name: data.name,
    users: data.users,
    description: data.description
  };
  return NextResponse.json(projectData);
};
