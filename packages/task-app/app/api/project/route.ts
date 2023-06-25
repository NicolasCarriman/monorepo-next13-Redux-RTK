import { NextResponse } from 'next/server';
import data from '@core/data/fakedata.project.json';

export async function GET() {

  const projectData = {
    name: data.name,
    users: data.users,
    description: data.description,
    teams: [
      {
        departament: 'Marketing',
        id: 'marketing-team',
        categories: [
          {
            name: 'Marketing Operativo',
            id:'marketing-operativo',
          },
          {
            name: 'Marketing Estratégico',
            id:'marketing-estrategico',
          },
        ]
      },
      {
        departament: 'Business',
        id: 'bussines-team',
        categories: [
          {
            name: 'Business Intelligence',
            id:'business-operativo',
          }
        ]
      }
    ]
  };

  return NextResponse.json(projectData);
};
