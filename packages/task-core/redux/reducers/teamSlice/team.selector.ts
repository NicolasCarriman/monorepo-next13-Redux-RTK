import { ITeam } from "models";
import { RootState } from "redux/store/store";

export const teamSelector = (state: RootState) => state.team as ITeam;
