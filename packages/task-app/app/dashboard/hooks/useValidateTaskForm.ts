import { useState } from 'react';
import useTaskBuilder from './useTaskBuilder';

interface IValidateTaskFormHook {
  error: string | null;
  validateFirstInput: () => boolean;
  validateSecondInput: () => boolean;
}

function useValidateTaskForm(): IValidateTaskFormHook {
  
  const [ error, setError ] = useState<string | null>(null);
  const {
    getTaskName,
    getTaskDescription,
    getTaskUsersId,
    getTaskTeam,
    getTaskCategory
  } = useTaskBuilder();

  const errorMessage = 'Please fill in all the required fields before proceeding.';
  
  const validateFirstInput = () => {
    const taskName = getTaskName();
    const taskDescription = getTaskDescription();

    if (taskName === '') {
      setError(errorMessage);
      return false;
    }
    if (taskDescription === '') {
      setError(errorMessage);
      return false;
    }
    else {
      setError(null);
      return true;
    }
  };

  const validateSecondInput = () => {
    const taskUsers = getTaskUsersId();
    const taskTeam = getTaskTeam();
    const taskCategory = getTaskCategory();

    if (taskUsers.length === 0) {
      setError(errorMessage);
      return false;
    }
    
    if (taskCategory === '') {
      setError(errorMessage);
      return false;
    }
    
    if (taskTeam === '') {
      setError(errorMessage);
      return false;
    }
    else {
      setError(null);
      return true;
    }
  };

  return  {
    error,
    validateFirstInput,
    validateSecondInput
  };
}

export default useValidateTaskForm;
