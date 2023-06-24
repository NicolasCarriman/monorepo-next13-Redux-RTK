import project from '../data/fakedata.project.json';

export async function getTasks() {

  let taskData ={
    tasks: project.tasks,
    currentSubtask: '' ,
    currentTask: ''
  };

  return taskData;
};
