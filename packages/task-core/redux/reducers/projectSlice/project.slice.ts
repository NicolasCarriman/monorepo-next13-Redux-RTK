import { createSlice } from "@reduxjs/toolkit";
import { projectState } from "./project.state";

const projectSlice = createSlice({
  name: "project",
  initialState: projectState,
  reducers: {
    setProject: (state, action) => {
      return action.payload;
    },
    addTeam: (state, team) => {
      if (state.teams === undefined) return;

      const newTeam = team.payload;
      state.teams = [
        ...state.teams,
        newTeam
      ];
    }
  },
});

export const { setProject, addTeam } = projectSlice.actions;
export default projectSlice.reducer;
