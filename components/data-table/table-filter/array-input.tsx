'use client';

import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { GripVertical, PlusCircle, XCircle } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';

interface BooleanNodeProps<TData, TValue> {
  id: string;
  control: any;
  fieldName: string;
  openInput: boolean;
  fieldArrayName: string;
  type: string;
  allowMany: boolean;
}
export const ArrayInput = <TData, TValue>({
  id,
  control,
  fieldArrayName,
  fieldName,
  openInput,
  type,
  allowMany,
}: BooleanNodeProps<TData, TValue>) => {
  const {
    fields: fieldsInput,
    remove: removeInput,
    append: appendInput,
    move: moveInput,
  } = useFieldArray({
    control,
    name: fieldArrayName,
  });
  const handleDrag: OnDragEndResponder = ({ source, destination }) => {
    if (destination) {
      moveInput(source.index, destination.index);
    }
  };
  return (
    <motion.div layout={!(fieldsInput.length == 0)} className='absolute z-50'>
      {openInput && (
        <DragDropContext onDragEnd={handleDrag}>
          <ul>
            <Droppable
              droppableId={`${fieldArrayName}-items`}
              direction='vertical'
            >
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className='flex flex-col items-center'
                >
                  {fieldsInput.map((inputField, indexInput) => (
                    <Draggable
                      key={
                        `${fieldArrayName}-item-${inputField.id}` + indexInput
                      }
                      draggableId={'drag' + fieldArrayName + indexInput}
                      index={indexInput}
                    >
                      {(provided, snapshot) => (
                        <li
                          key={inputField.id + 'li'}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <motion.div
                            className='mb-6 flex items-center justify-center gap-2'
                            layout
                            animate='open'
                            whileInView='open'
                            viewport={{ once: true }}
                            exit='collapsed'
                            variants={{
                              open: { opacity: 1, width: 'auto' },
                              collapsed: { opacity: 0, width: 0 },
                            }}
                            transition={{
                              duration: 0.2,
                              ease: [0.04, 0.62, 0.23, 0.98],
                            }}
                          >
                            <FormField
                              control={control}
                              name={`${fieldName}.value.${indexInput}.query`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      className='border-accent-foreground w-[15vw] flex-1 rounded-md border border-solid'
                                      key={
                                        inputField.id + id + 'InputFormField'
                                      }
                                      type={type}
                                      {...field}
                                      placeholder='Value'
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            {allowMany && (
                              <XCircle
                                key={inputField.id + 'delete'}
                                className={`size-6 cursor-pointer`}
                                onClick={() => removeInput(indexInput)}
                              />
                            )}

                            <div
                              {...provided.dragHandleProps}
                              className='relative z-50'
                            >
                              <GripVertical className='cursor-move' />
                            </div>
                          </motion.div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </ul>
          {allowMany && (
            <PlusCircle
              key={id + 'plus'}
              className={`z-200 relative w-min max-w-[24px] ${fieldsInput.length === 0 ? 'top-[0.6rem]' : 'left-20'} cursor-pointer`}
              onClick={() => {
                appendInput({
                  query: '',
                });
              }}
            />
          )}
        </DragDropContext>
      )}
    </motion.div>
  );
};

{
  /* <PlusCircle
key={id + "plus"}
className={`z-200 relative w-min  max-w-[24px] ${fieldsInput.length === 0 ? "bottom-[0.15rem]" : "right-8"} cursor-pointer`}
onClick={() => {
  appendInput({
    query: "",
  });
}}
/> */
}
