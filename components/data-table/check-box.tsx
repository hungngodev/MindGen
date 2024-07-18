import { motion } from 'framer-motion';
import { ReactNode, createContext, useContext } from 'react';

interface CheckboxContextProps {
  id: string;
  isChecked: boolean | 'indeterminate';
  setIsChecked: (isChecked: boolean) => void;
}

const CheckboxContext = createContext<CheckboxContextProps>({
  id: '',
  isChecked: false || 'indeterminate',
  setIsChecked: () => {},
});

interface CheckboxProps<TData> {
  children: ReactNode;
  id: string;
  isChecked: boolean | 'indeterminate';
  setIsChecked: (isChecked: boolean) => void;
}

export function CustomCheckbox<TData>({
  children,
  id,
  isChecked,
  setIsChecked,
}: CheckboxProps<TData>) {
  return (
    <div className='flex items-center'>
      <CheckboxContext.Provider
        value={{
          id,
          isChecked: isChecked,
          setIsChecked: setIsChecked,
        }}
      >
        {children}
      </CheckboxContext.Provider>
    </div>
  );
}

const tickVariants = {
  checked: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: 0.2,
    },
  },
  unchecked: {
    pathLength: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};
export function CheckboxIndicator() {
  const { id, isChecked, setIsChecked } = useContext(CheckboxContext);

  return (
    <button className='relative flex items-center'>
      <input
        type='checkbox'
        className='relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-black transition-all duration-500 checked:border-blue-400 checked:bg-blue-500 dark:border-white'
        onChange={(e) => setIsChecked(e.target.checked)}
        checked={isChecked === 'indeterminate' ? false : isChecked}
      />
      <div className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        <motion.svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='3.5'
          className={`h-3.5 w-3.5 ${
            isChecked &&
            typeof isChecked == 'string' &&
            isChecked == 'indeterminate'
              ? 'stroke-blue-600'
              : 'stroke-white'
          }`}
          initial={false}
          animate={
            isChecked ||
            (typeof isChecked == 'string' && isChecked == 'indeterminate')
              ? 'checked'
              : 'unchecked'
          }
        >
          <motion.path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4.5 12.75l6 6 9-13.5'
            variants={tickVariants}
          />
        </motion.svg>
      </div>
    </button>
  );
}

interface CheckboxLabelProps {
  children: ReactNode;
  isChecked: boolean;
  id: string;
}

export function CheckboxLabel({ children, isChecked, id }: CheckboxLabelProps) {
  return (
    <motion.label
      className={`relative ml-2 select-none overflow-hidden text-sm line-through`}
      htmlFor={id}
      animate={{
        x: isChecked ? [0, -4, 0] : [0, 4, 0],
        textDecorationLine: isChecked ? 'line-through' : 'none',
      }}
      initial={false}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
    >
      <p className={`${isChecked ? 'text-gray-400' : ''}`}>{children}</p>
    </motion.label>
  );
}
