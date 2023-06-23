'use client';

import React from 'react';
import DynamicSelector from '../dynamicSelector/dynamicSelector';
import { teamSelector } from '@core/redux/reducers/teamSlice/team.selector';
import { useAppSelector } from '@app/hooks/redux';
import { useTeam } from '@app/hooks/useTeam';
import { ITeamCategory } from '@core/models';
import { TextBox } from '@app/components/common/textBox';
import Card from '@app/components/common/card';

function TeamCategoryCard() {
  const [ newGoal, setNewGoal ] = React.useState(
    'Ingresa una nueva meta u objetivo, presiona enter para confirmar'
  );
  const { departament, currentCategoryId, teamCategory } = useAppSelector(teamSelector);
  const { getCurrentCategory, setCurrenCategory, addCategoryByName, addGoal } = useTeam();

  const currentCategory = getCurrentCategory(currentCategoryId);
  const elements = teamCategory.map((c: ITeamCategory) => ({ id: c.categoryid, name: c.name }));

  if (!currentCategory) return null;

  const { goals } = currentCategory;

  const handleClick = (categoryName: string) => {
    addCategoryByName(categoryName);
  };

  const handleInput = (event: any) => {
    const content = event.target.innerText;
    setNewGoal(content);
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    addGoal(newGoal);
    setNewGoal('Ingresa una nueva meta u objetivo, presiona enter para confirmar');
  };


  return (
    <div
      className='flex align-center justify-center h-full'
    >
      <Card
        header={'Equipo de Marketing'}
      >
        <div className='flex flex-row h-full max-h-[35vh]'>
          <div  className='w-[52%] h-full'
          >
            <DynamicSelector
              onSelect={setCurrenCategory}
              selectedId={currentCategoryId}
              title={departament}
              elements={elements}
              onClick={handleClick}
              newTabElement={'nombre de la categoria'}
            />
          </div>
          <div className='flex flex-col h-full font-medium w-[48%] justify-start items-start gap-4 p-2 shadow-lg rounded-lg'>
            <p>Team Goal</p>
            {
              goals.length ? 
              <p className='p-2'>
                {goals[0]}
              </p> :
              <TextBox
                className='bg-transparent text-blue-200'
                onInput={handleInput}
                onKeyDown={handleKeydown}
              >
                {newGoal}
              </TextBox>
            }
          </div>
        </div>
      </Card>
    </div>
  );
}

export default TeamCategoryCard;
