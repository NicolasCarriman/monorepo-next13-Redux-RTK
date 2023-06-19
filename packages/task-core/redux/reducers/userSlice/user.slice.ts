import { createSlice } from '@reduxjs/toolkit';
import { userState } from './user.state';

const usersSlice = createSlice({
  name: 'users',
  initialState: userState,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
  },
});

export const { setUser } = usersSlice.actions;
export default usersSlice.reducer;
