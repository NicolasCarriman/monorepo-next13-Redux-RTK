/* eslint-disable no-unused-vars */
import { ITask } from '@core/models/task.model';
import React, { useState } from 'react';


interface ITaskFormProps {
  onSubmit: ( task: ITask ) => void;
}

const TaskForm: React.FC<ITaskFormProps> = ({ onSubmit }) => {
  const [taskData, setTaskData] = useState<ITask>({
    taskName: '',
    taskDate: '',
    taskCategory: '',
    taskUser: '',
    taskPriority: 'none',
    taskStatus: 'inProgress',
    taskId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(taskData);
    setTaskData({
      taskName: '',
      taskDate: '',
      taskCategory: '',
      taskUser: '',
      taskPriority: 'none',
      taskStatus: 'inProgress',
      taskId: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      
    </form>
  );
};

export default TaskForm;
