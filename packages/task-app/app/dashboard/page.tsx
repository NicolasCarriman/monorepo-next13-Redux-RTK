
import React from 'react';
import { DashboardContent } from './dashboard.styled';
import DashboardModal from './compoenents/dashboardModal';
import Preloader from '@app/components/ui/preloader/preloader';
import TableFilter from './compoenents/tableFilter';
import { getProject } from '@core/services/getProject';
import { getUser } from '@core/services/getUser';
import { getTeam } from '@core/services/getTeam';

async function Dashboard() {

  const req = await fetch('http://localhost:3000/api/tasks', { cache: 'no-store' });
  const taskData = await req.json();
  const project = await getProject();
  const user = await getUser();
  const team = await getTeam();

  return (
    <div className='flex flex-col w-full'>
      <Preloader
        tasks={taskData}
        project={project}
        user={user}
        team={team}
      />
      <TableFilter />
      <DashboardContent>
        <DashboardModal />
      </DashboardContent>
    </div>
  );
}

export default Dashboard;
