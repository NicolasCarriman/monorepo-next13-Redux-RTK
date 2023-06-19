import { RootState } from "redux/store/store";
import { TaskState } from "./task.state";

export const taskSelector = (state: RootState) => state.tasks as TaskState;