'use client';
import {
  onClickCallBack,
} from '@app/components/ui/inputSearch/inputSearch';
import { useProject } from '@app/hooks/useProject';
import { taskPriorities } from '@app/utils/priority';
import {
  ProjectTeam,
  category,
  priorityType,
} from '@core/models';
import React, { useState } from 'react';
import '../../style/animate.module.css';
import useTaskBuilder from '../hooks/useTaskBuilder';
import { useTeamMediator } from '../hooks/useTeamMediator';
import { CollectionManager } from '@app/utils/addObjectToArray';
import { FirstInputView, SecondInputView } from './formViews';



export interface TaskFormModal {
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

  const {
    setTaskDescription,
    setTaskName,
    setTaskPriority,
    addTaskUserId,
    setTaskCategory,
    deleteTaskUserId,
    setTaskCategoryId,
    setTaskNewTeam,
    setTaskNewCategory,
    isNewTeam,
    setTaskTeam
  } = useTaskBuilder();
  const {
    setSelectedTeam,
    getTeamCategories
  } = useTeamMediator();

  const { getProjectTeams, getUsersProject } = useProject();

  console.log(closeModal);

  const users = getUsersProject();

  const teams = new CollectionManager<ProjectTeam>() //get teams and the option to add new team
    .setCollection(getProjectTeams())
    .insertObject({
      departament: 'add new Team',
      id: 'new-team',
      categories: []
    })
    .getCollection();

  const categories = new CollectionManager<category | undefined>() //get teams and the option to add new category
    .setCollection(getTeamCategories())
    .insertObject({
      name: 'add new category',
      id: 'new-category'
    })
    .getCollection();

  const priorities = taskPriorities;

  const handleUsers = (name: string, id: string, fn: onClickCallBack) => {
    fn(name);
    addTaskUserId(id);
  };

  const deleteMembers = (id: string) => {
    deleteTaskUserId(id);
  };

  const handleTeam = (name: string, id: string, fn: onClickCallBack) => {
    if(id === 'new-team') {
      setTaskNewTeam(true);  
    }
    fn(name);
    setTaskTeam(name);
    setSelectedTeam(id);
  };

  const handleCategory = (name: string, id: string, fn: onClickCallBack) => {
    if(id === 'new-category') {
      setTaskNewCategory(true);
    }
    fn(name);
    setTaskCategory(name);
    setTaskCategoryId(id);
  };

  const handlePriority = (
    name: priorityType,
    _id: string,
    fn: onClickCallBack
  ) => {
    fn(name);
    setTaskPriority(name);
  };

  function showSecondView() {
    setViews({
      firstInputView: false,
      secondInputView: true
    });
  };

  function showFirstView() {
    setViews({
      firstInputView: true,
      secondInputView: false
    });
  };

  const handleFirstInput = () => {
    next();
    showSecondView();
  };

  const handleSecondInputPrevius = () => {
    prev();
    showFirstView();
  };
 
  return (
    <form>
      {
        views.firstInputView &&
        <FirstInputView
          setTaskName={setTaskName}
          setTaskDescription={setTaskDescription}
          priorities={priorities}
          handlePriority={handlePriority}
          handleClick={handleFirstInput}
        />
      }

      {
        views.secondInputView &&
        <SecondInputView
          users={users}
          teams={teams}
          isNewTeam={isNewTeam()}
          categories={categories}
          previous={handleSecondInputPrevius}
          deleteMembers={deleteMembers}
          handleTeam={handleTeam}
          handleCategory={handleCategory}
          handleUsers={handleUsers}
          onClose={closeModal}
        />
      }
    </form>
  );
}
export default TaskForm;
