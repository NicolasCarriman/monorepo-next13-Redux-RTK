import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../reducers/userSlice/user.slice';
import teamSlice from '../reducers/teamSlice/team.slice';
import taskSlice from '../reducers/taskSlice/task.slice';
import { taskApi } from '../reducers/services/taskApi';
import projectSlice from '../reducers/projectSlice/project.slice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    team: teamSlice,
    tasks: taskSlice,
    taskApi: taskApi.reducer,
    project: projectSlice
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(taskApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
