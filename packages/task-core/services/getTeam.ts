import data from '../data/fakedata.project.json';

export const getTeam = async () => {
  const firstTeam = data.teams[0];
  const teamData = {
    ...firstTeam,
    currentCategoryId: 'marketing-estrategico'
  };
  return teamData;
};
