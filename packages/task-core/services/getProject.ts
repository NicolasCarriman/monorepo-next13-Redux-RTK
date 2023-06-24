import data from '../data/fakedata.project.json';

export const getProject = async () => {
  const projectData = {
    name: data.name,
    users: data.users,
    description: data.description,
    teams: [
      {
        departament: 'Marketing',
        id: 'marketing-team',
        categories: [
          {
            name: 'Marketing Operativo',
            id:'marketing-operativo',
          },
          {
            name: 'Marketing Estratégico',
            id:'marketing-estrategico',
          },
        ]
      },
      {
        departament: 'Business',
        id: 'bussines-team',
        categories: [
          {
            name: 'Business Intelligence',
            id:'business-operativo',
          }
        ]
      }
    ]
  };

  return projectData; 
};
