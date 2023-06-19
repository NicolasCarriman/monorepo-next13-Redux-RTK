import data from '@core/data/fakedata.project.json';
import { NextResponse } from 'next/server';

export async function GET() {
  const firstTeam = data.teams[0];
  const teamData = {
    ...firstTeam,
    currentCategoryId: 'marketing-estrategico'
  };
  return NextResponse.json(teamData);
};
