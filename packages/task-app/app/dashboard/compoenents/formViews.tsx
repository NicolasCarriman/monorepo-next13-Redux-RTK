import AvatarComponent from '@app/components/common/avatar';
import ButtonComponent from '@app/components/common/button';
import FloatingLabelInput from '@app/components/common/inputLabel';
import List from '@app/components/common/list';
import ListItem from '@app/components/common/listItem';
import { TaskPriority, TaskTags } from '@app/components/common/taskItem';
import InputSearch, { onClickCallBack } from '@app/components/ui/inputSearch/inputSearch';
import useTaskBuilder from '../hooks/useTaskBuilder';
import { IUser, ProjectTeam, category, priorityType } from '@core/models';
import useValidateTaskForm from '../hooks/useValidateTaskForm';

type itemType = {
  name: string,
  id: string
}

// todo: implement better type name for priorityType

interface IFirstInputView {
  handleClick: () => void;
  priorities: itemType[];
  // eslint-disable-next-line no-unused-vars
  handlePriority: (name: priorityType, priority: string, fn: onClickCallBack) => void;
  // eslint-disable-next-line no-unused-vars
  setTaskName: (name: string) => void;
  // eslint-disable-next-line no-unused-vars
  setTaskDescription: (description: string) => void;
}

export const FirstInputView: React.FC<IFirstInputView> = (props) => {

  const { error, validateFirstInput }  = useValidateTaskForm();
  const { priorities, handlePriority, handleClick, setTaskDescription, setTaskName } = props;

  // eslint-disable-next-line no-unused-vars
  type seterFn = (value: string) => void;

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>, setFn: seterFn) => {
    setFn(e.target.value);
  };

  const handleNext = () => {
    if (validateFirstInput()) {
      handleClick();
    }
  };

  return (
    <>
      <div className="flex-col gap-3 w-100% ">

        <FloatingLabelInput
          onChange={(e) => handleChangeInput(e, setTaskName)}
          name="taskName"
          required
          placeholder="Task Name"
        />

        <FloatingLabelInput
          name="taskDescription"
          required
          placeholder="Task Description"
          onChange={(e) => handleChangeInput(e, setTaskDescription)}
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
          label="Continue"
          onClick={handleNext}
        />
      </div>
    </>
  );
};

interface ISecondInputView {
  users: IUser[];
  teams: ProjectTeam[];
  isNewTeam: boolean;
  categories: (category | undefined)[];

  previous: () => void;
  // eslint-disable-next-line no-unused-vars
  deleteMembers: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  handleTeam: (name: string, priority: string, fn: onClickCallBack) => void;
  // eslint-disable-next-line no-unused-vars
  handleCategory: (name: string, priority: string, fn: onClickCallBack) => void;
  // eslint-disable-next-line no-unused-vars
  handleUsers: (name: string, priority: string, fn: onClickCallBack) => void;
  onClose: () => void;
}

export const SecondInputView: React.FC<ISecondInputView> = (props) => {
  const {
    users,
    teams,
    isNewTeam,
    categories,
    previous,
    deleteMembers,
    handleTeam,
    handleCategory,
    handleUsers,
    onClose
  } = props;

  const { setTaskTeam, setTaskCategory, isNewCategory, getTaskUsersId, buildTask, reset } = useTaskBuilder();
  const { error, validateSecondInput }  = useValidateTaskForm();

  const members = getTaskUsersId()
    .map((id) => users.find((user) => user.id === id)).filter(Boolean);
    //obtains users that match with the given taks users id

  const handleSubmit = () => {
    if (validateSecondInput()) {
      buildTask();
      onClose();
      reset();
      //BUILDtASK
    }
  };

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

        {
          !isNewTeam ?
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
          :
          <FloatingLabelInput
            name="teamcategory"
            required
            placeholder="New Team Name"
            onChange={(e) => { setTaskTeam(e.target.value); }}
          /> 
        }

        {!(isNewCategory())  ? (
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
            placeholder="New Category Name"
            onChange={(e) => setTaskCategory(e.target.value)}
          />
        )}

        {
          error && <div className="text-red-500 text-center mt-4">{error}</div>
        }

        <div className="flex justify-center gap-4 min-t-[6vh] mt-4">
          <ButtonComponent
            type='button'
            size="large"
            variant="hover"
            label="Previous"
            onClick={previous}
          />
          <ButtonComponent
            type='button'
            size="large"
            variant="hover"
            label="Generate"
            onClick={handleSubmit}
          />
        </div>

      </div>
    </>
  );
};
