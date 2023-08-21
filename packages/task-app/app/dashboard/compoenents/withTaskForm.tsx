import { onClickCallBack } from '@app/components/ui/inputSearch/inputSearch';
import { useAppSelector } from '@app/hooks/redux';
import { useProject } from '@app/hooks/useProject';
import { useTask } from '@app/hooks/useTasks';
import { useTeam } from '@app/hooks/useTeam';
import { taskPriorities, getRandomId } from '@app/utils';
import { priorityType, IUser, ProjectTeam, ITask, ITeamCategory } from '@core/models';
import { projectSelector } from '@core/redux/reducers/projectSlice/project.selector';
import React, { ComponentType, useState } from 'react';

function WithTaskForm<P extends object>(WrappedComponent: ComponentType<P>) {

  const EnhancedComponent = (props: P) => {

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

  const usersProject = project.users as IUser[];
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
    
    return <WrappedComponent {...props}/>;
  } ;
  return EnhancedComponent;
}

export default WithTaskForm;
