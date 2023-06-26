import HeaderNav from './components/nav';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import style from '../style/animate.module.css';
import Image from 'next/image';
import dino from '../../public/dino2.jpg';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HeaderNav />
      <main className='w-full h-full flex flex-col gap-3'>
        <div className={twMerge('flex w-100% justify-center items-center mt-10', style.slideAppearAnimation)}>
          <h1 className='text-3xl font-bold '>
            T-Task
          </h1>
        </div>
        <section className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
          <div
            className='
          p-4 
          max-w-[40%] 
          min-w-[24rem] 
          flex 
          gap-4 
          flex-col 
          ml-2 
          shadow-xl 
          rounded-lg 
          z-100 
          min-h-[50vh]'
          >
            {
              children
            }
          </div>
          <div className='flex justify-center items-cente shadow-2xl rounded-lg p-4 z-50 min-h-[69vh] min-w-[30%]'>
            <Image src={dino} alt={'dinosaur'} height='200' width='400' />
          </div>
        </section>
      </main>
    </>
  );
}
