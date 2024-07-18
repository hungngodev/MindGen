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
  return (
    <motion.div layout className='flex w-full items-start' key={id + 'div'}>
      <motion.div
        layout
        className='border-accent-foreground flex w-[45vw] items-center justify-around gap-4 rounded-md border border-solid'
      >
        <FormField
          key={id + 'column'}
          control={control}
          name={`${fieldName}.columns`}
          render={({ field }) => (
            <FormItem>
              <Select
                key={id + 'selectColumn'}
                onValueChange={field.onChange}
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
                <SelectContent>
                  {columns.map((column) => (
                    <SelectItem key={column.id} value={column.id}>
                      {column.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          key={id + 'operator'}
          control={control}
          name={`${fieldName}.operator`}
          render={({ field }) => (
            <FormItem>
              <Select
                key={id + 'selectOperator'}
                onValueChange={field.onChange}
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
                  <SelectItem value='in'>in</SelectItem>
                  <SelectItem value='not'>not in</SelectItem>
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
        />
      </motion.div>
    </motion.div>
  );
};
