'use client';

import { TableContent } from './taskTable.styled';
import { ITask } from '@core/models/task.model';
import React from 'react';
import { useTask } from '@app/hooks/useTasks';

interface TaskTableProps {
  data?: ITask[] | null;
  // eslint-disable-next-line no-unused-vars
}

function TaskTable({ data }: TaskTableProps) {
  const { deleteCurrentTask } = useTask();

  const handleDelete = (id: string) => {
    deleteCurrentTask(id);
  };

  return (
    <div className="overflow-auto max-h-700px">
      <table style={{ borderCollapse: 'separate', borderSpacing: '0 1em' }}>
        <thead className="z-20 sticky top-0 bg-slate-100 h-12 text-blue-200">
          <tr>
            <th className="w-1/4">Name</th>
            <th className="w-1/6">User</th>
            <th className="w-1/6">Date</th>
            <th className="w-1/6">Status</th>
            <th className="w-1/6">Priority</th>
            <th className="w-1/4">Category</th>
          </tr>
        </thead>
        <tbody className="z-1">
          {data && <TableContent data={data} onDelete={handleDelete} />}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
