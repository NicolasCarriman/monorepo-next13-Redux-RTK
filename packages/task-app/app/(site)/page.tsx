import React from 'react';
import { twMerge } from 'tailwind-merge';
import style from '../style/animate.module.css';
import Image from 'next/image';
import dino from '../../public/dino2.jpg';
import SideBarLink from '@app/components/common/link';
import Button from '@app/components/common/button';

async function Home() {
  return (
    <main className='w-full h-full flex flex-col gap-3'>
      <div className={twMerge('flex w-100% justify-center items-center mt-10', style.slideAppearAnimation)}>
        <h1 className='text-3xl font-bold '>
          T-Task
        </h1>
      </div>
      <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
        <div
          className={twMerge('p-4 max-w-[40%] min-w-[30rem] flex gap-4 flex-col ml-2 shadow-xl rounded-lg z-100', style.slideInAnimation)}
        >
          <h2 className='text-xl font-bold'>
            Optimiza la colaboración en equipo y maximiza tu productividad.
          </h2>
          <p className='text-lg font-medium'>
            Utiliza equipos y categorías para estructurar y asignar responsabilidades.
            Desglosa tareas en subtareas para un seguimiento detallado.
            Simplifica la gestión de proyectos y maximiza tu productividad con nuestra herramienta especializada.
          </p>
          <SideBarLink href='./dashboard'>
            <Button size={'small'}>
              <p className='p-2 whitespace-nowrap'>
                Prueba Ahora!
              </p>
            </Button>
          </SideBarLink>
        </div>
        <div className='flex justify-center items-cente shadow-2xl rounded-lg p-4 z-50'>
          <Image src={dino} alt={'dinosaur'} height='200' width='400' />
        </div>
      </div>
    </main>
  );
}

export default Home;
