'use client';

import { AuroraBackground } from '@/components/ui';
import { motion } from 'framer-motion';
import Link from 'next/link';

function Home() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className='relative flex flex-col items-center justify-center gap-4 px-4'
      >
        <div className='text-center text-3xl font-bold dark:text-white md:text-7xl'>
          Generate your Plan
        </div>
        <div className='py-4 text-base font-extralight dark:text-neutral-200 md:text-4xl'>
          Using OpenAI
        </div>
        <Link href='/plan'>
          <button className='w-fit rounded-full bg-black px-4 py-2 text-white dark:bg-white dark:text-black'>
            Try now
          </button>
        </Link>
      </motion.div>
    </AuroraBackground>
  );
}

export default Home;
