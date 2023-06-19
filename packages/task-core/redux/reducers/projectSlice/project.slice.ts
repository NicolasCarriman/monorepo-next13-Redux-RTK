import { createSlice } from "@reduxjs/toolkit";
import { projectState } from "./project.state";

const projectSlice = createSlice({
  name: "project",
  initialState: projectState,
  reducers: {
    setProject: (state, action) => {
      return action.payload;
    },
  },
});

export const { setProject } = projectSlice.actions;
export default projectSlice.reducer;
