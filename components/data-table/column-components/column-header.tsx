import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
} from '@nextui-org/react';
import { cn } from '@/utils/cn';
import { ArrowDownIcon, ArrowUpIcon, ArrowDownUp, EyeOff } from 'lucide-react';
import { Column } from '@tanstack/react-table';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant='bordered'
            size='sm'
            className='data-[state=open]:bg-accent -ml-3 h-8'
          >
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className='ml-2 h-4 w-4' />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className='ml-2 h-4 w-4' />
            ) : (
              <ArrowDownUp className='ml-2 h-4 w-4' />
            )}
          </Button>
        </DropdownTrigger>
        <DropdownMenu className='align-start'>
          <DropdownItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className='text-muted-foreground/70 mr-2 h-3.5 w-3.5' />
            Asc
          </DropdownItem>
          <DropdownItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className='text-muted-foreground/70 mr-2 h-3.5 w-3.5' />
            Desc
          </DropdownItem>
          <DropdownItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className='text-muted-foreground/70 mr-2 h-3.5 w-3.5' />
            Hide
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
