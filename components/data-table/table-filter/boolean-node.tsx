'use client';

import { FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Column } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import React from 'react';
import {
  typeMapping,
  operatorsMapping,
  notAllowManyInputs,
} from '../column-components/columns-def';
import { ArrayInput } from './array-input';

interface BooleanNodeProps<TData, TValue> {
  id: string;
  outerIndex: number;
  nestedIndex?: number;
  columns: Column<TData, TValue>[];
  openInput: boolean;
  control: any;
  children?: React.ReactNode;
}
export const BooleanNode = <TData, TValue>({
  columns,
  id,
  outerIndex,
  control,
  openInput,
  nestedIndex,
  children,
}: BooleanNodeProps<TData, TValue>) => {
  const fieldName = `or.${outerIndex}.and.${nestedIndex}`;
  const fieldArrayName =
    `or.${outerIndex}.and.${nestedIndex}.value` as `or.${number}.and.${number}.value`;
  const [selected, setSelected] = React.useState<string>('id');
  const type = typeMapping[selected as keyof typeof typeMapping];
  const operator = operatorsMapping[type];
  const [allowMany, setAllowMany] = React.useState<boolean>(true);
  return (
    <motion.div layout className='flex w-full items-start' key={id + 'div'}>
      <motion.div
        layout
        className='flex w-[45vw] items-center justify-around gap-4 rounded-md'
      >
        <FormField
          key={id + 'column'}
          control={control}
          name={`${fieldName}.columns`}
          render={({ field }) => {
            return (
              <FormItem>
                <Select
                  key={id + 'selectColumn'}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelected(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-[16vw] select-none'>
                      <SelectValue
                        key={id + 'selectColumnValue'}
                        placeholder='Column'
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='z-10 bg-white dark:bg-black'>
                    {columns.map((column) => (
                      <SelectItem key={column.id} value={column.id}>
                        {column.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            );
          }}
        />
        <FormField
          key={id + 'operator'}
          control={control}
          name={`${fieldName}.operator`}
          render={({ field }) => (
            <FormItem>
              <Select
                key={id + 'selectOperator'}
                onValueChange={(value) => {
                  field.onChange(value);
                  setAllowMany(!notAllowManyInputs.includes(value));
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className='w-[16vw] select-none'>
                    <SelectValue
                      key={id + 'selectOperatorValue '}
                      placeholder='Operator'
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {operator.map((op: string) => (
                    <SelectItem key={op} value={op}>
                      {op}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {children}
      </motion.div>
      <motion.div layout className='relative ml-2'>
        <ArrayInput
          id={id}
          fieldName={fieldName}
          openInput={openInput}
          control={control}
          fieldArrayName={fieldArrayName}
          type={type}
          allowMany={allowMany}
        />
      </motion.div>
    </motion.div>
  );
};
