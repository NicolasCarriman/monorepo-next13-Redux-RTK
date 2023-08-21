import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { teamState } from './team.state';
import { ITeamCategory } from '../../../models';

const teamSlice = createSlice({
  name: 'team',
  initialState: teamState,
  reducers: {
    setTeam: (state, team) => {
      return team.payload;
    },
    selectCategory: (state, category) => {
      state.currentCategoryId = category.payload;
    },
    addCategory: (state, category: PayloadAction<ITeamCategory>) => {
      const newCategory = category.payload;
      const teamCategory = state.teamCategory;

      const updatedCategory = [
        ...teamCategory,
        newCategory
      ];

      state.teamCategory = updatedCategory;
    }, updateCategory: (state, category) => {
      const updatedCategory = category.payload;
      const teamCategory = state.teamCategory;

      const updatedTeamCategory = teamCategory.map((cat) => {
        if (cat.categoryid === updatedCategory.categoryid) {
          return updatedCategory;
        } else return cat;
      })

      state.teamCategory = updatedTeamCategory;
    }
  },
});

export const {
  setTeam,
  selectCategory,
  addCategory,
  updateCategory,
} = teamSlice.actions;

export default teamSlice.reducer;
