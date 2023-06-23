import { ITeam } from "../../../models";
import { RootState } from "../../store/store";

export const teamSelector = (state: RootState) => state.team as ITeam;
