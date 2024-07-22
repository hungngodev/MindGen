'use client';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Table } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { DrawingLines, PlusButton, StraightLine } from './line';
import { NestedBooleanNode } from './nestedBooleanNode';
import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';
import { RotateCcw, Sparkle } from 'lucide-react';

interface DataTableFilterProps<TData> {
  table: Table<TData>;
  endPoints: {
    filter: string;
  };
  submitFunction: (data: any) => void;
}
const formSchema = z.object({
  or: z.array(
    z.object({
      and: z.array(
        z.object({
          columns: z.string(),
          operator: z.string(),
          value: z.array(z.object({ query: z.string() })),
        })
      ),
    })
  ),
});
export function DataTableFilter<TData>({
  table,
  endPoints,
  submitFunction,
}: DataTableFilterProps<TData>) {
  const columns = table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== 'undefined' && column.getCanHide()
    );
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      or: [],
    },
    resolver: zodResolver(formSchema),
  });
  const { control, handleSubmit, getValues, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'or',
  });
  const [isLastItemRemoved, setIsLastItemRemoved] = useState(false);
  const [lastItemIndex, setLastItemIndex] = useState<null | number>(null);

  const currentData = watch('or');

  const addElement = () => {
    append({
      and: [
        {
          columns: '',
          operator: '',
          value: [{ query: '' }],
        },
      ],
    });
  };
  function remmeberData() {
    localStorage.setItem('data', JSON.stringify(currentData));
  }
  window.addEventListener('beforeunload', remmeberData);
  useEffect(() => {
    const data = localStorage.getItem('data');
    if (data) {
      const parsedData = JSON.parse(data);
      form.setValue('or', parsedData);
    }
  }, []);

  const handleRemove = (index: number) => {
    if (index === fields.length - 1) {
      remove(index);
      setIsLastItemRemoved(true);
      setLastItemIndex(index);
    } else {
      remove(index);
    }
  };
  const submit = async (data: any) => {
    submitFunction(data);
  };

  return (
    <div>
      {getValues('or').length === 0 ? (
        <div className='flex items-center space-x-4'>
          <h1> No Filters yet</h1>
          <div className='' onClick={addElement}>
            <PlusButton text={'Or'} />
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(submit)}
          className='flex w-full flex-col items-start'
        >
          <Form {...form}>
            <AnimatePresence
              onExitComplete={() => {
                if (
                  isLastItemRemoved &&
                  lastItemIndex !== null &&
                  lastItemIndex >= 0
                ) {
                  remove(lastItemIndex as number);
                  setIsLastItemRemoved(false);
                  setLastItemIndex(null);
                }
              }}
            >
              {fields.map((item, index) => {
                const straightLineLength =
                  currentData[index].and.reduce(
                    (acc: number, e) => (e.value ? acc + e.value.length : acc),
                    0
                  ) +
                  1 +
                  currentData[index].and.length * 1.2;
                return (
                  <motion.section
                    layout
                    key={item.id + 'sectionInner'}
                    animate='open'
                    exit='collapsed'
                    variants={{
                      open: { opacity: 1, height: 'auto' },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    <motion.section layout className='relative'>
                      <DrawingLines
                        key={item.id + 'OuterKey'}
                        index={item.id + 'outerIndex'}
                      >
                        <NestedBooleanNode
                          key={item.id + 'innerNode'}
                          index={index}
                          columns={columns}
                          outerLevel={currentData[index]}
                          control={control}
                          remove={() => handleRemove(index)}
                        />
                      </DrawingLines>
                    </motion.section>
                    <AnimatePresence>
                      {Array.from(
                        {
                          length: straightLineLength,
                        },
                        (_, indexLine) => (
                          <motion.div
                            key={item.id + indexLine + 'OuterLine'}
                            className='relative -z-10'
                            layout
                          >
                            <StraightLine
                              index={item.id + indexLine + 'OuterLineIndex'}
                            />
                            {indexLine == Math.floor(straightLineLength / 2) &&
                              index !== currentData.length - 1 && (
                                <motion.h1
                                  layout
                                  initial='collapsed'
                                  animate='open'
                                  exit='collapsed'
                                  variants={{
                                    open: { opacity: 1, height: 'auto' },
                                    collapsed: { opacity: 0, height: 0 },
                                  }}
                                  transition={{
                                    duration: 0.5,
                                    ease: [0.04, 0.62, 0.23, 0.98],
                                  }}
                                  className={`absolute left-2 top-5 focus:outline-none ${straightLineLength % 2 === 1 && 'translate-y-8'}`}
                                >
                                  Or
                                </motion.h1>
                              )}
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>
                  </motion.section>
                );
              })}
            </AnimatePresence>
          </Form>
          <div className='mt-4' onClick={addElement}>
            <PlusButton text={'Or'} />
          </div>
          <div className='absolute right-10 flex flex-col gap-4'>
            <Button type='submit' variant='bordered'>
              <Sparkle /> Apply
            </Button>
            <Button
              variant='bordered'
              onClick={() => {
                form.reset();
              }}
            >
              <RotateCcw /> Reset
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
