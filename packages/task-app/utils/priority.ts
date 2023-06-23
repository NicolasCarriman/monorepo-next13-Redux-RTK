export const taskPriorities = [
  {
    name: 'high',
    id: 'p-1'
  },
  {
    name: 'low',
    id: 'p-2'
  },
  {
    name:'medium',
    id: 'p-3'
  },
  {
    name: 'none',
    id: 'p-4'
  }
];

export const validatePriority = (priority: string) => {
  const priorities = taskPriorities.map((p) => p.name);

  if (!priorities.includes(priority))
  return false;
  else return true;
};
