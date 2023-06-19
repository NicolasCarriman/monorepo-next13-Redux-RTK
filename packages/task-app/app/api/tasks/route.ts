import { NextResponse } from 'next/server';
import project from '@core/data/fakedata.project.json';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  
  const name = searchParams.get('taskName');

  let taskData ={
    tasks: project.tasks,
    currentSubtask: 'subtask-3' ,
    currentTask: 'task-2'
  };

  if (name) {
    taskData.tasks = taskData.tasks.filter((task) =>
      task.taskName.toLowerCase().includes(name.toLowerCase())
    );
  }

  return NextResponse.json(taskData);
};
