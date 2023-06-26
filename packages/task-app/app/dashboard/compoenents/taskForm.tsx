'use client';
import { TaskPriority, TaskTags } from '@app/components/common';
import AvatarComponent from '@app/components/common/avatar';
import Button from '@app/components/common/button';
import Input from '@app/components/common/input';
import List from '@app/components/common/list';
import ListItem from '@app/components/common/listItem';
import InputSearch, { onClickCallBack } from '@app/components/ui/inputSearch/inputSearch';
import { useAppSelector } from '@app/hooks/redux';
import { useProject } from '@app/hooks/useProject';
import { useTask } from '@app/hooks/useTasks';
import { useTeam } from '@app/hooks/useTeam';
import { getRandomId } from '@app/utils';
import { taskPriorities } from '@app/utils/priority';
import { ITask, ITeam, ITeamCategory, ProjectTeam, category, priorityType, IUser } from '@core/models';
import { projectSelector } from '@core/redux/reducers/projectSlice/project.selector';
import React, { useState } from 'react';

interface TaskFormModal {
  closeModal: () => void;
}

function TaskForm({
  closeModal
}: TaskFormModal) {
  const [error, setError] = useState<undefined | string>(undefined);
  const [members, setMembers] = useState<{ name: string, id: string }[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<{ name: string, id: string }>({
    name: '',
    id: '',
  });
  const [category, setCategory] = useState<{ name: string, id: string }>({ name: '', id: '' });
  const [priority, setPriority] = useState<priorityType>();
  const { team, updateTeamCategory, addNewCategory } = useTeam();
  const { addNewTeam } = useProject();
  const { addNewTask } = useTask();
  const project = useAppSelector(projectSelector);

  const users = project.users as IUser[];
  const teams = project.teams as ProjectTeam[];
  const currentTeam = selectedTeam && teams?.find((t: ProjectTeam) => t.id === selectedTeam.id);
  const categories: category[] | undefined = currentTeam && currentTeam.categories;
  const isNewTeam = !currentTeam;
  const priorities = taskPriorities;

  const updateCategory = (newTask: ITask) => {
    const currentCategory = team.teamCategory.find((c) => c.categoryid === category.id);
    if (!currentCategory) return;
    const updatedCategory: ITeamCategory = {
      name: currentCategory.name,
      tasks: [...currentCategory.tasks,
      newTask.taskId
      ],
      usersId: [
        ...currentCategory.usersId,
        ...members.map((m) => m.id)
      ],
      categoryid: currentCategory.categoryid,
      goals: currentCategory.goals
    };

    updateTeamCategory(updatedCategory);
  };

  const addCategory = (taskId: string, categoryName: string) => {
    const newCategory: ITeamCategory = {
      name: categoryName,
      tasks: [taskId],
      usersId: members.map(m => m.id),
      categoryid: getRandomId(),
      goals: []
    };
    addNewCategory(newCategory);
  };

  const addTeam = (name: string, categoryName: string) => {
    const newTeam: ProjectTeam = {
      departament: name,
      id: getRandomId(),
      categories: [
        {
          name: categoryName,
          id: getRandomId()
        }
      ]
    };

    addNewTeam(newTeam);

  };

  const handleUsers = (name: string, id: string, fn: onClickCallBack) => {
    const newMember = {
      name,
      id,
    };
    fn(name);
    if (members.find(m => m.id === id)) return;

    setMembers([
      ...members,
      newMember,
    ]);
  };

  const deleteMembers = (id: string) => {
    const filtered = members.filter(member => member.id !== id);
    setMembers(filtered);
  };

  const handleTeam = (name: string, id: string, fn: onClickCallBack) => {
    fn(name);
    setSelectedTeam({
      name,
      id,
    });
  };

  const handleCategory = (name: string, id: string, fn: onClickCallBack) => {
    fn(name);
    setCategory({
      name,
      id,
    });
  };

  const handlePriority = (name: priorityType, id: string, fn: onClickCallBack) => {
    fn(name);
    setPriority(name);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const date = new Date();
    const today = `${date.getMonth() + 1}/${date.getDate()}`;
    const formData = new FormData(event.currentTarget);
    let formValues: { [keyof: string]: FormDataEntryValue } = {};

    if (!priority) {
      setError('Invalid priority');
      return;
    } else setError(undefined);
    if (members.length === 0) {
      setError('add members');
      return;
    } else setError(undefined);


    for (let [name, value] of formData.entries()) {
      formValues[name] = value;
    }

    const newTask: ITask = {
      taskName: formValues['taskName'] as string,
      taskDate: today,
      taskDescription: formValues['taskDescription'] as string,
      taskCategory: formValues['category'] as string || category.id,
      taskPriority: priority,
      taskId: getRandomId(),
      taskStatus: 'inProgress',
      taskUsersId: members.map(m => m.id),
      subtasks: []
    };
    const isNewCategory = formValues['category'] as string !== category.name;

    if (!isNewTeam && !isNewCategory) updateCategory(newTask);
    if (!isNewTeam && isNewCategory) addCategory(newTask.taskId, formValues['category'] as string);
    if (isNewTeam) addTeam(formValues['team'] as string, formValues['category'] as string);
    addNewTask(newTask);
    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <div
        className='flex flex-col w-auto justify-center items-center gap-6 sm:flex-row-reverse sm:items-end '
      >
        <div className='flex flex-col gap-3 max-w-[45vh]' >
          <div>
            <p>members:</p>
            <List
              className='flex flex-wrap border-none gap-1'
              data={members}
              renderedItem={
                (item) => (
                  <TaskTags variant='small'>
                    {item.name}
                    <span
                      onClick={() => deleteMembers(item.id)}
                      className='font-medium cursor-pointer'
                    >X
                    </span>
                  </TaskTags>
                )
              }
            />
          </div>
          <InputSearch
            placeHolder='users'
            data={users}
            render={
              (user, fn) => (
                <ListItem
                  onClick={() => handleUsers(user.name, user.id, fn)}
                >
                  <AvatarComponent variant='small' label={user.name} />
                  <p className='font-medium'>{user.name}</p>
                  <p className='font-light'>{user.departament}</p>
                </ListItem>
              )} />
          <InputSearch
            name='team'
            placeHolder='team'
            data={teams}
            render={
              (team: ITeam, fn) => (
                <ListItem
                  onClick={
                    () => handleTeam(team.departament, team.id, fn)
                  }
                >
                  <p>
                    {team.departament}
                  </p>
                </ListItem>
              )} />
          {
            !isNewTeam ?
              <InputSearch
                name='category'
                placeHolder='category'
                data={categories ? categories : []}
                render={
                  (category: category, fn) => (
                    <ListItem
                      onClick={
                        () => handleCategory(category.name, category.id, fn)
                      }
                    >
                      <p>
                        {category.name}
                      </p>
                    </ListItem>
                  )} />
              : <Input name='category' placeholder='category' required />
          }
        </div>
        <div className='flex flex-col gap-3'>
          <Input name='taskName' required placeholder='task name' />
          <Input name='taskDescription' required placeholder='task description' />
          <InputSearch
            placeHolder='priotiy'
            data={priorities}
            render={
              (priority, fn) => (
                <ListItem
                  onClick={
                    () => handlePriority(priority.name, priority.id, fn)
                  }
                >
                  <TaskPriority priority={priority.name} />
                </ListItem>
              )
            }
          />
        </div>
      </div>
      {
        error &&
        <div className='text-red-500 text-center'>
          {error}
        </div>
      }
      <div className='flex justify-center items-center min-t-[6vh] mt-4'>
        <Button
          size={'medium'}
          variant='hover'
          type='submit'
        >
          <p className='font-medium h-[6vh] justify-center items-center flex'>
            Create Task
          </p>
        </Button>
      </div>
    </form>
  );
}

export default TaskForm;
