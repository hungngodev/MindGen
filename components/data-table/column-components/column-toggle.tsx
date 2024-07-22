'use client';

import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from '@hello-pangea/dnd';
import { Table } from '@tanstack/react-table';
import { GripVertical, X } from 'lucide-react';
import { useState } from 'react';
import { CheckboxLabel } from '../check-box';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}
const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const [columns, setColumns] = useState(
    table
      .getAllColumns()
      .filter(
        (column) =>
          typeof column.accessorFn !== 'undefined' && column.getCanHide()
      )
  );
  const handleDrag: OnDragEndResponder = ({ source, destination }) => {
    if (destination) {
      const items = reorder(columns, source.index, destination.index);
      setColumns(items);
    }
  };
  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId='droppable' direction='horizontal'>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='flex flex-row space-x-4'
          >
            {columns &&
              columns.map((column, index) => (
                <Draggable
                  key={column.id + index}
                  draggableId={'drag' + index}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <div
                        className='hover:bg-muted flex cursor-pointer items-center justify-center space-x-1 rounded-md border-2 border-foreground p-2 transition-all duration-500'
                        onClick={() =>
                          column.toggleVisibility(!column.getIsVisible())
                        }
                      >
                        <X
                          id={column.id}
                          className={`${column.getIsVisible() ? '' : 'rotate-[45deg]'} transition-all duration-200`}
                          width={14}
                          height={14}
                        />
                        <CheckboxLabel
                          id={column.id}
                          isChecked={!column.getIsVisible()}
                        >
                          {column.id}
                        </CheckboxLabel>
                        <div className='mr-2' {...provided.dragHandleProps}>
                          <GripVertical
                            className='cursor-move'
                            width={14}
                            height={14}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
