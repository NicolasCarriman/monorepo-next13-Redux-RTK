export const getProject = async () => {
  const project = await fetch('http://localhost:3000/api/project');
  return project.json(); 
};
