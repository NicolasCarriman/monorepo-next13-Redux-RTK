export const getProject = async () => {
  const project = await fetch('http://localhost:3000/api/project', { cache: 'no-store' });
  return project.json(); 
};
