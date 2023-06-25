import React from 'react';
import { PageWrapper } from '../components/wrapperAnmiation';
import { twMerge } from 'tailwind-merge';
import style from '../../style/animate.module.css';

function About() {
  return (
    <PageWrapper>
      <section className='flex gap-4 flex-col overflow-hidden'>
        <h1 className='font-bold text-xl'>
          ¿Quiénes somos y cómo trabajamos?
        </h1>
        <p>
          <span className='font-bold text-blue-200'>
            T-Task
          </span>
          {' '}comenzó con un equipo de
          individuos apasionados por el poder de la colaboración y la gestión eficiente de tareas.
        </p>
        <div className={twMerge('flex flex-col gap-2', style.fontSlide)}>
          <p>
            Nos encontramos en un mundo donde la productividad y la organización son clave para el éxito,
            pero también comprendimos que trabajar en equipo puede ser un desafío
          </p>
          <p>
            Nos comprometimos a construir una herramienta que realmente comprendiera las necesidades de los equipos.
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}

export default About;
