'use client';
import { TaskPriority, TaskTags } from '@app/components/common';
import AvatarComponent from '@app/components/common/avatar';
import ButtonComponent from '@app/components/common/button';
import List from '@app/components/common/list';
import ListItem from '@app/components/common/listItem';
import InputSearch, {
  onClickCallBack,
} from '@app/components/ui/inputSearch/inputSearch';
import { useAppSelector } from '@app/hooks/redux';
import { useProject } from '@app/hooks/useProject';
import { useTask } from '@app/hooks/useTasks';
import { useTeam } from '@app/hooks/useTeam';
import { getRandomId } from '@app/utils';
import { taskPriorities } from '@app/utils/priority';
import {
  ITask,
  ITeamCategory,
  ProjectTeam,
  category,
  priorityType,
  IUser,
} from '@core/models';
import { projectSelector } from '@core/redux/reducers/projectSlice/project.selector';
import React, { useState } from 'react';
import '../../style/animate.module.css';
import FloatingLabelInput from '@app/components/common/inputLabel';

interface IInputView {
  error: string | undefined;
  handleClick: () => void;
}

type itemType = {
  name: string,
  id: string
}

// todo: implement better type name for priorityType

interface IFirstInputView extends IInputView {
  priorities: itemType[];
  // eslint-disable-next-line no-unused-vars
  handlePriority: (name: priorityType, priority: string, fn: onClickCallBack) => void;
}

const FirstInputView: React.FC<IFirstInputView> = (props) => {

  const { priorities, handlePriority, error, handleClick } = props;

  return (
    <>
      <div className="flex-col gap-3 w-100% ">

        <FloatingLabelInput
          name="taskName"
          required
          placeholder="Task Name"
        />

        <FloatingLabelInput
          name="taskDescription"
          required
          placeholder="Task Description"
        />

        <InputSearch
          placeHolder="Priority"
          data={priorities}
          render={(priority, fn) => (
            <ListItem onClick={() => handlePriority(priority.name, priority.id, fn)}>
              <TaskPriority priority={priority.name} />
            </ListItem>
          )}
        />

      </div>

      {
        error && <div className="text-red-500 text-center mt-4">{error}</div>
      }

      <div className="flex justify-center min-t-[6vh] mt-4">
        <ButtonComponent
          type='button'
          size="large"
          variant="hover"
          label="Create Task"
          onClick={handleClick}
        />
      </div>
    </>
  );
};



interface ISecondInputView extends IInputView {
  members: itemType[];
  users: IUser[];
  teams: ProjectTeam[];
  isNewTeam: boolean;
  categories: category[] | undefined;

  // eslint-disable-next-line no-unused-vars
  deleteMembers: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  handleTeam: (name: string, priority: string, fn: onClickCallBack) => void;
  // eslint-disable-next-line no-unused-vars
  handleCategory: (name: string, priority: string, fn: onClickCallBack) => void;
  // eslint-disable-next-line no-unused-vars
  handleUsers: (name: string, priority: string, fn: onClickCallBack) => void;

}

const SecondInputView: React.FC<ISecondInputView> = (props) => {
  const {
    members,
    users,
    teams,
    isNewTeam,
    categories,
    error,

    deleteMembers,
    handleTeam,
    handleCategory,
    handleUsers,
    handleClick
  } = props;

  return (
    <>
      <div className="flex-col gap-3 w-100% ">

        <div className="mb-4 ">
          <p className="font-semibold text-lg mb-2">Members:</p>
          <List
            className="flex flex-wrap border-none gap-1"
            data={members}
            renderedItem={(item) => (
              <TaskTags variant="small">
                {item.name}
                <span
                  onClick={() => deleteMembers(item.id)}
                  className="ml-2 font-medium cursor-pointer">
                  X
                </span>
              </TaskTags>
            )}
          />
        </div>
        <InputSearch
          type='userPicker'
          placeHolder="Users"
          data={users}
          render={(user, fn) => (
            <ListItem onClick={() => handleUsers(user.name, user.id, fn)}>
              <AvatarComponent variant="small" label={user.name} />
              <p className="ml-2 font-medium">{user.name}</p>
              <p className="ml-2 font-light">{user.departament}</p>
            </ListItem>
          )}
        />

        <InputSearch
          name="team"
          placeHolder="Team"
          data={teams}
          render={(team, fn) => (
            <ListItem onClick={() => handleTeam(team.departament, team.id, fn)}>
              <p>{team.departament}</p>
            </ListItem>
          )}
        />

        {!isNewTeam ? (
          <InputSearch
            name="teamcategory"
            placeHolder="Category"
            data={categories ? categories : []}
            render={(category, fn) => (
              <ListItem onClick={() => handleCategory(category.name, category.id, fn)}>
                <p>{category.name}</p>
              </ListItem>
            )}
          />
        ) : (
          <FloatingLabelInput
            name="teamcategory"
            required
            placeholder="Category"
          />
        )}

        {
          error && <div className="text-red-500 text-center mt-4">{error}</div>
        }

        <div className="flex justify-center min-t-[6vh] mt-4">
          <ButtonComponent
            type='button'
            size="large"
            variant="hover"
            label="Create Task"
            onClick={handleClick}
          />
        </div>

      </div>
    </>
  );
};



interface TaskFormModal {
  closeModal: () => void;
  next: () => void;
  prev: () => void;
}

type formViews = {
  firstInputView: boolean,
  secondInputView: boolean
}

function TaskForm({
  closeModal,
  next,
  prev,
}: TaskFormModal) {

  const [views, setViews] = useState<formViews>({
    firstInputView: true,
    secondInputView: false
  });

  const [error, setError] = useState<undefined | string>(undefined);
  const [members, setMembers] = useState<{ name: string; id: string }[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<{
    name: string;
    id: string;
  }>({
    name: '',
    id: '',
  });
  const [category, setCategory] = useState<{ name: string; id: string }>({
    name: '',
    id: '',
  });
  const [priority, setPriority] = useState<priorityType>();
  const { team, updateTeamCategory, addNewCategory } = useTeam();
  const { addNewTeam } = useProject();
  const { addNewTask } = useTask();
  const project = useAppSelector(projectSelector);

  const users = project.users as IUser[];
  const teams = project.teams as ProjectTeam[];

  const currentTeam =
    selectedTeam && teams?.find((t: ProjectTeam) => t.id === selectedTeam.id);
  const categories: category[] | undefined =
    currentTeam && currentTeam.categories;

  const isNewTeam = !currentTeam;
  const priorities = taskPriorities;

  const updateCategory = (newTask: ITask) => {
    const currentCategory = team.teamCategory.find(
      (c) => c.categoryid === category.id
    );
    if (!currentCategory) return;

    const updatedCategory: ITeamCategory = {
      name: currentCategory.name,
      tasks: [...currentCategory.tasks, newTask.taskId],
      usersId: [...currentCategory.usersId, ...members.map((m) => m.id)],
      categoryid: currentCategory.categoryid,
      goals: currentCategory.goals,
    };

    updateTeamCategory(updatedCategory);
  };

  const addCategory = (taskId: string, categoryName: string) => {
    const newCategory: ITeamCategory = {
      name: categoryName,
      tasks: [taskId],
      usersId: members.map((m) => m.id),
      categoryid: getRandomId(),
      goals: [],
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
          id: getRandomId(),
        },
      ],
    };

    addNewTeam(newTeam);
  };

  const handleUsers = (name: string, id: string, fn: onClickCallBack) => {
    const newMember = {
      name,
      id,
    };
    fn(name);
    if (members.find((m) => m.id === id)) return;

    setMembers([...members, newMember]);
  };

  const deleteMembers = (id: string) => {
    const filtered = members.filter((member) => member.id !== id);
    setMembers(filtered);
  };

  const handleTeam = (name: string, id: string, fn: onClickCallBack) => {
    fn(name);
    setSelectedTeam({
      name,
      id,
    });
    console.log('Set Selected Team:', name, id);
  };

  const handleCategory = (name: string, id: string, fn: onClickCallBack) => {
    // console.log("Name:", name, "ID:", id);
    fn(name);
    setCategory({
      name,
      id,
    });
  };

  const handlePriority = (
    name: priorityType,
    id: string,
    fn: onClickCallBack
  ) => {
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
      taskCategory: (formValues['category'] as string) || category.id,
      taskPriority: priority,
      taskId: getRandomId(),
      taskStatus: 'inProgress',
      taskUsersId: members.map((m) => m.id),
      subtasks: [],
    };
    const isNewCategory = (formValues['category'] as string) !== category.name;

    if (!isNewTeam && !isNewCategory) updateCategory(newTask);
    if (!isNewTeam && isNewCategory)
      addCategory(newTask.taskId, formValues['category'] as string);
    if (isNewTeam)
      addTeam(formValues['team'] as string, formValues['category'] as string);
    addNewTask(newTask);
    closeModal();
  };

  function showSecondView() {
    setViews({
      firstInputView: false,
      secondInputView: true
    });
  };

  const handleFirstInput = () => {
    next();
    showSecondView();
  };



  return (
    <form>
      {
        views.firstInputView &&
        <FirstInputView
          priorities={priorities}
          handlePriority={handlePriority}
          error={error}
          handleClick={handleFirstInput}
        />
      }

      {
        views.secondInputView &&
        <SecondInputView
          error={error}
          handleClick={next}
          members={members}
          users={users}
          teams={teams}
          isNewTeam={isNewTeam}
          categories={categories}

          deleteMembers={deleteMembers}
          handleTeam={handleTeam}
          handleCategory={handleCategory}
          handleUsers={handleUsers}
        />
      }
    </form>
  );
}
export default TaskForm;
