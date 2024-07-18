import { delay, motion } from 'framer-motion';
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: ({ delay, duration }: { delay: number; duration: number }) => {
    return {
      pathLength: 2,
      opacity: 1,
      transition: {
        pathLength: { delay, type: 'spring', duration: 1 + delay, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};
type drawingLinesProps = {
  index: string;
  children: React.ReactNode;
};
export const StraightLine = ({
  index,
  height,
  width = '2',
  size = 16,
}: {
  index: string;
  height?: string;
  width?: string;
  size?: number;
}) => {
  return (
    <motion.section
      key={index + 'sectionStraightLine'}
      initial='collapsed'
      animate='open'
      exit='collapsed'
      className='relative'
      variants={{
        open: { opacity: 1, height: 'auto' },
        collapsed: { opacity: 0, height: 0 },
      }}
      transition={{
        duration: 0.6,
        ease: [0.04, 0.62, 0.23, 0.98],
      }}
    >
      <motion.svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth={width}
        className={`relative size-${size}`}
        key={index + 'svg2'}
        initial='hidden'
        animate='visible'
        exit='hidden'
      >
        <motion.line
          key={index + 'StraightLine'}
          x1='0'
          x2='0'
          y1='0'
          y2='200'
          variants={draw}
          custom={{ delay: 0, duration: 10 }}
        />
      </motion.svg>
    </motion.section>
  );
};
export const DrawingLines = ({ index, children }: drawingLinesProps) => {
  return (
    <>
      <motion.svg
        layout
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        className='relative size-16'
        key={index + 'svg'}
        initial='hidden'
        animate='visible'
        exit='hidden'
      >
        <motion.line
          layout
          key={index + 'StraightLineOuter'}
          x1='0'
          x2='0'
          y1='0'
          y2='200'
          variants={draw}
          custom={{ delay: 0, duration: 0.8 }}
        />
        <motion.svg
          layout
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1'
          className='absolute left-0 top-1/2 size-16'
          key={index + 'svg'}
          initial='hidden'
          animate='visible'
          exit='hidden'
        >
          <motion.line
            layout
            key={index + 'StraightLineOuter2'}
            x1='0'
            x2='50'
            y1='12'
            y2='12'
            variants={draw}
            custom={{ delay: 0.2, duration: 0.8 }}
          />
        </motion.svg>
      </motion.svg>
      <div className='absolute left-[40%] top-[20%]'>{children}</div>
    </>
  );
};
export const AddingNestedButton = () => (
  <div className='flex flex-col items-start justify-center'>
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='size-8 cursor-pointer border-0 focus:outline-none'
      initial='hidden'
      animate='visible'
    >
      <motion.circle variants={draw} custom={0} cx='6' cy='6' r='3' />
      <motion.path variants={draw} custom={0.2} d='M6 9v12' />
      <motion.path variants={draw} custom={0.2} d='M13 6h3a2 2 0 0 1 2 2v3' />
      <motion.path variants={draw} custom={0.5} d='M18 15v6' />
      <motion.path variants={draw} custom={0.5} d='M21 18h-6' />
    </motion.svg>
    <h1>And</h1>
  </div>
);
export const AddingButton = () => (
  <div className='flex flex-col items-center justify-center'>
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='size-16 cursor-pointer border-0 focus:outline-none'
      initial='hidden'
      animate='visible'
    >
      <motion.path variants={draw} custom={0} d='M6 3v12' />
      <motion.path
        variants={draw}
        custom={0.2}
        d='M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
      />
      <motion.path
        variants={draw}
        custom={0.2}
        d='M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
      />
      <motion.path variants={draw} custom={0.3} d='M15 6a9 9 0 0 0-9 9' />
      <motion.path variants={draw} custom={0.3} d='M18 15v6' />
      <motion.path variants={draw} custom={0.4} d='M21 18h-6' />
    </motion.svg>
    <h1>Or</h1>
  </div>
);
export const PlusButton = ({ text }: { text: string }) => (
  <div className='flex items-center justify-start space-x-4'>
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      whileHover={{ scale: 1.1, rotate: 90 }}
      whileTap={{
        scale: 0.8,
        rotate: -90,
        borderRadius: '100%',
      }}
      initial='hidden'
      animate='visible'
      className='size-6 cursor-pointer focus:outline-none'
    >
      <motion.circle
        variants={draw}
        custom={{ delay: 0, duration: 1 }}
        cx='12'
        cy='12'
        r='10'
      />
      <motion.path
        variants={draw}
        custom={{ delay: 0.2, duration: 1 }}
        d='M8 12h8'
      />
      <motion.path
        variants={draw}
        custom={{ delay: 0.4, duration: 1 }}
        d='M12 8v8'
      />
    </motion.svg>
    <h1>{text}</h1>
  </div>
);
export const MinusButton = ({ text }: { text: string }) => (
  <motion.svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    className='size-6 cursor-pointer focus:outline-none'
    whileHover={{ scale: 1.1 }}
    whileTap={{
      scale: 0.8,
      rotate: -90,
      borderRadius: '100%',
    }}
    initial='hidden'
    animate='visible'
  >
    <motion.circle
      variants={draw}
      custom={{ delay: 0, duration: 0.5 }}
      cx='12'
      cy='12'
      r='10'
    />
    <motion.path
      variants={draw}
      custom={{ delay: 0.2, duration: 0.6 }}
      d='M8 12h8'
    />
  </motion.svg>
);

export const UpArrow = ({ disabled }: { disabled?: boolean }) => (
  <motion.svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={`size-6 ${disabled ? 'cursor-not-allowed' : 'cursor-default'} focus:outline-none`}
    whileHover={!disabled ? { scale: 1.1, y: -3 } : {}}
    whileTap={
      !disabled
        ? {
            scale: 0.8,
            y: -10,
          }
        : {}
    }
    initial='hidden'
    animate='visible'
  >
    <motion.path
      d='m5 12 7-7 7 7'
      variants={draw}
      custom={{ delay: 0, duration: 0.6 }}
    />
    <motion.path
      d='M12 19V5'
      variants={draw}
      custom={{ delay: 0, duration: 0.5 }}
    />
  </motion.svg>
);
export const DownArrow = ({ disabled }: { disabled?: boolean }) => (
  <motion.svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={`size-6 ${disabled ? 'cursor-not-allowed' : 'cursor-default'} focus:outline-none`}
    whileHover={!disabled ? { scale: 1.1, y: 3 } : {}}
    whileTap={
      !disabled
        ? {
            scale: 0.8,
            y: 10,
          }
        : {}
    }
    initial='hidden'
    animate='visible'
  >
    <motion.path
      d='M12 19V5'
      variants={draw}
      custom={{ delay: 0, duration: 0.5 }}
    />
    <motion.path
      d='m5 12 7 7 7-7'
      variants={draw}
      custom={{ delay: 0, duration: 0.6 }}
    />
  </motion.svg>
);
export const MoveTableIndicator = () => (
  <motion.svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={`size-6 focus:outline-none`}
    whileHover={{ scale: 1.1 }}
    whileTap={{
      scale: 1.5,
    }}
    initial='hidden'
    animate='visible'
  >
    <motion.line
      x1='12'
      x2='12'
      y1='3'
      y2='21'
      variants={draw}
      custom={{ delay: 0, duration: 0.5 }}
    />
    <motion.polyline
      points='8 8 4 12 8 16'
      variants={draw}
      custom={{ delay: 0, duration: 0.5 }}
    />
    <motion.polyline
      points='16 16 20 12 16 8'
      variants={draw}
      custom={{ delay: 0, duration: 0.5 }}
    />
  </motion.svg>
);
export const LogoIconLoading = () => {
  return (
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 1024 1024'
      version='1.1'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      className='h-[128px] w-[128px] cursor-pointer focus:outline-none'
      whileHover={{ scale: 1.1 }}
      whileTap={{
        scale: 0.8,
        rotate: -90,
        borderRadius: '100%',
      }}
      initial='hidden'
      animate='visible'
    >
      <motion.g id='surface1'>
        <motion.path
          fill='rgb(30.980392%,75.294118%,81.568627%)'
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: 1,
          }}
          strokeWidth={4}
          strokeDasharray='0 1'
          d='M 890.460938 767.539062 L 475.363281 767.539062 C 474.34375 767.539062 473.355469 767.171875 472.601562 766.480469 C 441.195312 737.585938 461.210938 701.628906 489.625 701.628906 L 853.523438 701.628906 C 856.695312 701.628906 858.675781 698.191406 857.089844 695.449219 L 546.710938 157.851562 C 537.609375 142.089844 543.011719 121.933594 558.773438 112.832031 C 574.539062 103.730469 594.695312 109.132812 603.796875 124.894531 L 924.878906 681.027344 C 941.960938 710.609375 931.058594 749.59375 892.175781 767.175781 C 891.636719 767.421875 891.054688 767.539062 890.46875 767.539062 Z M 867.792969 713.984375 L 867.800781 713.984375 Z M 867.792969 713.984375 '
        />
        <motion.path
          stroke='none'
          fillRule='nonzero'
          fill='rgb(9.019608%,29.411765%,37.647059%)'
          fillOpacity={1}
          variants={draw}
          custom={{ delay: 0, duration: 8 }}
          d='M 103.484375 835.515625 C 97.890625 835.515625 92.230469 834.09375 87.035156 831.097656 C 71.273438 821.996094 65.871094 801.84375 74.972656 786.078125 L 396.054688 229.945312 C 406.480469 211.886719 425.152344 201.109375 446.003906 201.109375 C 466.851562 201.109375 485.527344 211.890625 495.949219 229.945312 L 688.601562 563.625 C 697.703125 579.386719 692.300781 599.542969 676.539062 608.644531 C 660.773438 617.746094 640.617188 612.34375 631.515625 596.578125 L 449.570312 281.4375 C 447.984375 278.691406 444.019531 278.691406 442.4375 281.4375 L 132.050781 819.03125 C 125.945312 829.605469 114.871094 835.515625 103.480469 835.515625 Z M 103.484375 835.515625 '
        />
        <motion.path
          style={{
            stroke: 'none',
            fillRule: 'nonzero',
            fill: 'rgb(10.196078%,42.352941%,58.039216%)',
            fillOpacity: 1,
          }}
          variants={draw}
          custom={{ delay: 0, duration: 8 }}
          d='M 920.746094 915.84375 L 278.574219 915.84375 C 257.722656 915.84375 239.050781 905.0625 228.625 887.007812 C 218.199219 868.949219 218.199219 847.390625 228.625 829.339844 L 421.277344 495.660156 C 430.378906 479.894531 450.53125 474.492188 466.296875 483.59375 C 482.0625 492.695312 487.464844 512.847656 478.363281 528.617188 L 296.417969 843.757812 C 294.832031 846.503906 296.8125 849.9375 299.984375 849.9375 L 920.746094 849.9375 C 938.949219 849.9375 953.703125 864.691406 953.703125 882.894531 C 953.703125 901.097656 938.949219 915.851562 920.746094 915.851562 Z M 920.746094 915.84375 '
        />
      </motion.g>
    </motion.svg>
  );
};
