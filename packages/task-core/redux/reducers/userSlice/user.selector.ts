import { IUser } from "models";
import { RootState } from "redux/store/store";

export const userSelector = (state: RootState) => state.user as IUser;
