import React from 'react';
import { twMerge } from 'tailwind-merge';
import style from '../style/animate.module.css';
import SideBarLink from '@app/components/common/link';
import Button from '@app/components/common/button';

async function Home() {

  return (
    <>
      <div className='overflow-hidden'>
        <h2 className={twMerge('text-xl font-bold', style.appearAnimation)}>
          Optimiza la colaboración en equipo y maximiza tu productividad.
        </h2>
      </div>
      <div className='overflow-hidden'>
        <p className={twMerge(`
              text-lg 
              font-medium
              `, style.fontSlide)}
        >
          Utiliza equipos y categorías para estructurar y asignar responsabilidades.
          Desglosa tareas en subtareas para un seguimiento detallado.
          Simplifica la gestión de proyectos y maximiza tu productividad con nuestra herramienta especializada.
        </p>
      </div>
      <SideBarLink href='./dashboard'>
        <Button size={'small'}>
          <p className='p-2 whitespace-nowrap'>
            Prueba Ahora!
          </p>
        </Button>
      </SideBarLink>
    </>
  );
}

export default Home;
