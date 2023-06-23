export const getUser = async () => {
  const user = await fetch('http://localhost:3000/api/user', { cache: 'no-store' });
  return user.json(); 
};
