
/**
 * todo: should implement get team id query
 */

export const getTeam = async () => {
  const team = await fetch('http://localhost:3000/api/team', { cache: 'no-store' });
  return team.json(); 
};
