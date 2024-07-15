'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'z-3 relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-md bg-white dark:bg-slate-950',
        className
      )}
    >
      <div className='relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center'>
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className='absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible bg-gradient-conic from-cyan-400 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]'
        >
          <div className='absolute bottom-0 left-0 z-20 h-40 w-[100%] bg-white [mask-image:linear-gradient(to_top,black,transparent)] dark:bg-slate-950 dark:[mask-image:linear-gradient(to_top,white,transparent)]' />
          <div className='absolute bottom-0 left-0 z-20 h-[100%] w-40 bg-white [mask-image:linear-gradient(to_right,black,transparent)] dark:bg-slate-950 dark:[mask-image:linear-gradient(to_right,white,transparent)]' />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className='absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-400 text-white [--conic-position:from_290deg_at_center_top]'
        >
          <div className='absolute bottom-0 right-0 z-20 h-[100%] w-40 bg-white [mask-image:linear-gradient(to_left,black,transparent)] dark:bg-slate-950 dark:[mask-image:linear-gradient(to_left,white,transparent)]' />
          <div className='absolute bottom-0 right-0 z-20 h-40 w-[100%] bg-white [mask-image:linear-gradient(to_top,black,transparent)] dark:bg-slate-950 dark:[mask-image:linear-gradient(to_top,white,transparent)]' />
        </motion.div>
        <div className='absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-white blur-2xl dark:bg-slate-950'></div>
        <div className='absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md'></div>
        <div className='absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-300 opacity-50 blur-3xl dark:bg-cyan-500'></div>
        <motion.div
          initial={{ width: '8rem' }}
          whileInView={{ width: '16rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className='absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-500 blur-2xl dark:bg-cyan-400'
        ></motion.div>
        <motion.div
          initial={{ width: '15rem' }}
          whileInView={{ width: '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className='absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-500 dark:bg-cyan-400'
        ></motion.div>

        <div className='absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-white dark:bg-slate-950'></div>
      </div>

      <div className='relative z-50 flex -translate-y-[400px] flex-col items-center px-5'>
        {children}
      </div>
    </div>
  );
};
