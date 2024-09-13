'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type ReactNode, useCallback } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { handlePagination } from '@/utils/pagination';

import { Button } from '../ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '../ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export interface PaginationWithLinksProps {
  pageSizeSelectOptions?: {
    pageSizeSearchParam?: string;
    pageSizeOptions: number[];
  };
  totalCount: number;
  pageSize: number;
  page: number;
  pageSearchParam?: string;
}

export function PaginationWithLinks({
  pageSizeSelectOptions,
  pageSize,
  totalCount,
  page,
  pageSearchParam,
}: PaginationWithLinksProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const totalPageCount = Math.ceil(totalCount / pageSize);

  const buildLink = useCallback(
    (newPage: number) => {
      const key = pageSearchParam || 'page';
      if (!searchParams) return `${pathname}?${key}=${newPage}`;
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, String(newPage));
      return `${pathname}?${newSearchParams.toString()}`;
    },
    [searchParams, pathname, pageSearchParam],
  );

  const handlePaginate = (newPage: number) => {
    handlePagination(newPage, searchParams, router);
  };

  const handleNextPage = () => {
    handlePaginate(page + 1);
  };

  const handlePreviousPage = () => {
    handlePaginate(page - 1);
  };

  const handleLimitChange = (newLimit: number) => {
    const updatedParams = new URLSearchParams(
      searchParams as unknown as URLSearchParams,
    );
    updatedParams.set('per_page', newLimit.toString());

    handlePagination(1, updatedParams, router);
  };

  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const maxVisiblePages = 5;

    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        items.push(
          <Button
            key={i}
            onClick={() => handlePaginate(Number(i))}
            variant={Number(i) === page ? 'default' : 'outline'}
          >
            {i}
          </Button>,
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink href={buildLink(1)} isActive={page === 1}>
            1
          </PaginationLink>
        </PaginationItem>,
      );

      if (page > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPageCount - 1, page + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={buildLink(i)} isActive={page === i}>
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }

      if (page < totalPageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      items.push(
        <PaginationItem key={totalPageCount}>
          <PaginationLink
            href={buildLink(totalPageCount)}
            isActive={page === totalPageCount}
          >
            {totalPageCount}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  return (
    <div className="m-5">
      <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
        {pageSizeSelectOptions && (
          <div className="flex flex-1 flex-col gap-4">
            <SelectRowsPerPage
              options={pageSizeSelectOptions.pageSizeOptions}
              setPageSize={handleLimitChange}
              pageSize={pageSize}
            />
          </div>
        )}
        <Pagination
          className={cn({ 'md:justify-center': pageSizeSelectOptions })}
        >
          <PaginationContent className="max-sm:gap-0">
            <PaginationItem>
              <Button
                variant={'link'}
                size={'icon'}
                onClick={handlePreviousPage}
                aria-disabled={page === 1}
                tabIndex={page === 1 ? -1 : undefined}
                className={`mr-2 ${
                  page === 1 ? 'pointer-events-none opacity-50' : ''
                }`}
              >
                <ChevronLeft />
              </Button>
            </PaginationItem>
            {renderPageNumbers()}
            <PaginationItem>
              <Button
                variant={'link'}
                size={'icon'}
                onClick={handleNextPage}
                aria-disabled={page === totalPageCount}
                tabIndex={page === totalPageCount ? -1 : undefined}
                className={`ml-2 ${
                  page === totalPageCount
                    ? 'pointer-events-none opacity-50'
                    : ''
                }`}
              >
                <ChevronRight />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div></div>
      </div>
    </div>
  );
}

function SelectRowsPerPage({
  options,
  setPageSize,
  pageSize,
}: {
  options: number[];
  setPageSize: (newSize: number) => void;
  pageSize: number;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="whitespace-nowrap text-sm">Itens por página</span>

      <Select
        value={String(pageSize)}
        onValueChange={(value) => setPageSize(Number(value))}
      >
        <SelectTrigger className="w-16">
          <SelectValue placeholder={pageSize.toString()} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
