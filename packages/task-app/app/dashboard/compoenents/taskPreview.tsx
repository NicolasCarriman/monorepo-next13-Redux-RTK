import { TaskPriority } from '@app/components/common';
import useTaskBuilder from '../hooks/useTaskBuilder';
import { AiOutlineCalendar } from 'react-icons/ai';
import { AvatarStack } from '@app/components/ui/avatarStack/avatarStack';

export const FirstFacePreview = () => {

  const {
    getTaskDescription,
    getTaskName,
    getTaskPriority
  } = useTaskBuilder();

  const taskName = getTaskName();
  const taskDescription = getTaskDescription();
  const taskPriority = getTaskPriority();

  return (
    <div
      className='
        p-3
        border-2 
        rounded-md  
        border-gray 
        bg-white 
        flex 
        flex-col 
        justify-end 
        items-center  
        gap-[10%] 
        shadow-md  
        w-[80%] 
        h-full
      '
    >
      <div className='w-full flex justify-start  max-h-[20%] h-full '>
        <span className='text-3xl font-normal max-w-[100%] break-words '>
          {taskName}
        </span>
      </div>
      <div className='h-[60%] w-full flex justify-start items-start'>

        <p
          className='italic font-[400] text-xl text-gray-500 break-words max-w-[100%]'
        >
          {taskDescription}
        </p>
      </div>

      <div className='flex flex-row items-start gap-3'>
        <p
          className='font-light text-2xl text-gray-500'
        >
          {'priority: '}
        </p>
        <TaskPriority priority={taskPriority} />
      </div>
    </div>
  );
};


export const SecondFaceTaskPreview = () => {

  const {
    getTaskUsersId,
    getTaskCategory,
    getTaskTeam,
    getTaskDate,
  } = useTaskBuilder();


  const TaskDateComponent: React.FC<React.ComponentProps<'div'>> = () => {
    return (
      <div className='flex flex-row p-3 w-[10vw] justify-center gap-3 rounded-md items-center bg-[#0d1a24]'>
        <AiOutlineCalendar className='text-white' />
        <p className='text-white'>
          {getTaskDate()}
        </p>
      </div>
    );
  };

  return (
    <div
      className='
        p-3
        border-2 
        rounded-md  
        border-gray 
        bg-white 
        flex 
        flex-col 
        justify-end 
        items-center  
        gap-[10%] 
        shadow-md  
        w-[80%] 
        h-full
      '
    >
      <div className='h-[40%] w-full flex flex-col gap-3 justify-start items-start'>
        <p
          className='
          px-2
          py-1  
          italic font-[400] 
          text-xl 
          text-gray-500 
          break-words 
          rounded-md 
          bg-[#e5e7eb] 
          max-w-[100%]'
        >
          {getTaskTeam()}
        </p>
        <p
          className='
            px-2
            py-1 
            italic font-[400] 
            text-xl 
            rounded-md 
            text-gray-500 
            break-words 
            bg-[#e5e7eb]
            max-w-[100%]'
        >
          {getTaskCategory()}
        </p>
      </div>
      <div className='w-full flex justify-center  max-h-[20%] h-full '>
        <AvatarStack usersId={getTaskUsersId()}/>
      </div>
      <div className='flex flex-row items-start gap-3'>
        <TaskDateComponent />
      </div>
    </div>
  );
};
