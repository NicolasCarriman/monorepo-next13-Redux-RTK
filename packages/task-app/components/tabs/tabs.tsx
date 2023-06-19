import React from 'react';

function Tabs() {
  return (
    <div className='flex flex-col h-min w-min font-medium justify-start items-start gap-4 p-2 shadow-lg rounded-lg'>
      <p>Team Group</p>
      <label  className='p-2 text-white z-10 bg-blue-200 rounded-lg '>Marketing Estratégico</label>
      <label className='p-2'>Marketing Operativo</label>
    </div>
  );
}

export default Tabs;
