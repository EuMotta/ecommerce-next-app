'use client';
import { AiFillAlert } from 'react-icons/ai';

import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { WidgetForm } from './helper-form';

export function Widget() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="group fixed flex h-12 cursor-pointer items-center rounded-full px-3">
          <Button size="icon" className="rounded-full">
            <AiFillAlert className="h-5 w-5" />
          </Button>
          <span className="max-w-0 overflow-hidden transition-all duration-500 ease-linear group-hover:max-w-xs">
            <span className="pl-2"></span>
            Feedback
          </span>
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="flex w-auto items-end justify-end p-4"
        sideOffset={10}
      >
        <WidgetForm />
      </PopoverContent>
    </Popover>
  );
}
