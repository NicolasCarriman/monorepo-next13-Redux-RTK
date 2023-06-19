import { ITask } from '@core/models';
import { TaskPriority, TaskStatus, TaskTags } from '../../common/taskItem';
import { AvatarStack } from '../avatarStack/avatarStack';
import DateComponent from '../../common/date';
import { ButtonDelete } from '../button-icon/buttonIcon';

interface TaskProps {
  children: React.ReactNode;
}

export const TaskTr: React.FC<TaskProps> = ({ children }) => {

  return (
    <tr className='shadow-xl bg-white h-20 hover:bg-blue-200 hover:text-white'>
      {children}
    </tr>
  );
};

interface TableDataProps {
  children: React.ReactNode;
  isFirstRow?: boolean;
  isLastRow?: boolean;
  width?: string
}

export const TaskTd: React.FC<TableDataProps> = (props) => {
  const tdClasses = `${props.isFirstRow ? 'rounded-tl-2xl' : null} ` +
    `${props.isLastRow ? 'rounded-tr-2xl' : null} ` +
    `${props.isFirstRow ? 'rounded-bl-2xl' : null} ` +
    `${props.isLastRow ? 'rounded-br-2xl' : null}` +
    `${props.width ? 'w-'.concat(props.width) : null}`;
  return (
    <td
      className={tdClasses}
      width={props.width ? props.width : undefined}
    >
      {props.children}
    </td>
  );
};
interface TableContentProps {
  data: ITask[]
  // eslint-disable-next-line no-unused-vars
  onDelete: (id:string) => void;
}
export const TableContent: React.FC<TableContentProps> = ({ data, onDelete }) => {
  return (
    <>
      {
        data.map((item) => (
          <TaskTr key={item.taskId}>
            <TaskTd width='1/4' isFirstRow>
              <div className='flex flex-row gap-4 ml-4'>
                <ButtonDelete onClick={() => onDelete(item.taskId)}/>
                <p className='flex justify-center align-center'>{item.taskName}</p>
              </div>
            </TaskTd>
            <TaskTd width='1/6'>
              <AvatarStack usersId={item.taskUsersId}/>
            </TaskTd>
            <TaskTd width='1/6'>
              <DateComponent date={item.taskDate} />
            </TaskTd>
            <TaskTd width='1/6'>
              <TaskStatus status={item.taskStatus} />
            </TaskTd>
            <TaskTd width='1/6'>
              <TaskPriority priority={item.taskPriority} />
            </TaskTd>
            <TaskTd width='1/4' isLastRow>
              <TaskTags>{item.taskCategory}</TaskTags>
            </TaskTd>
          </TaskTr>
        ))
      }
    </>
  );
};
