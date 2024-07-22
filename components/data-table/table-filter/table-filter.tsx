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

interface DataTableFilterProps<TData> {
  table: Table<TData>;
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
export function DataTableFilter<TData>({ table }: DataTableFilterProps<TData>) {
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
  const { control, register, handleSubmit, getValues, reset, watch, setValue } =
    form;
  const { fields, append, remove, prepend } = useFieldArray({
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

  const handleRemove = (index: number) => {
    if (index === fields.length - 1) {
      /**
       * Without doing it this way (in combination with onExitComplete),
       * the last item will stay in "options" with quoted string-values.
       */
      remove(index);
      setIsLastItemRemoved(true);
      setLastItemIndex(index);
    } else {
      remove(index);
    }
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
        <form className='flex w-full flex-col items-start'>
          <Form {...form}>
            <AnimatePresence
              onExitComplete={() => {
                if (
                  isLastItemRemoved &&
                  lastItemIndex !== null &&
                  lastItemIndex >= 0
                ) {
                  console.log(
                    'onExitComplete: exit,',
                    'lastItem',
                    lastItemIndex
                  );
                  /**
                   * Without doing it this way,
                   * the last item will stay in "options" with quoted string-values.
                   * This was my last attempt to fix the warnings.
                   */
                  remove(lastItemIndex as number);
                  setIsLastItemRemoved(false);
                  setLastItemIndex(null);
                }
              }}
            >
              {fields.map((item, index) => {
                const straightLineLength =
                  index === currentData.length - 1
                    ? 0
                    : currentData[index].and.reduce(
                        (acc: number, e) =>
                          e.value ? acc + e.value.length : acc,
                        0
                      ) +
                      1 +
                      currentData[index].and.length * 1.3;
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
        </form>
      )}
    </div>
  );
}
