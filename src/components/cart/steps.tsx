'use client';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ChevronLeft } from 'lucide-react';

import { Button } from '../ui/button';

const Steps = () => {
  const router = useRouter();
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter(Boolean);
  console.log(pathSegments);
  const buildBreadcrumbUrl = (index: number) => {
    return '/' + pathSegments.slice(0, index + 1).join('/');
  };

  return (
    <div className="my-auto flex items-center justify-between">
      <Button size={'icon'} onClick={() => router.back()} variant={'outline'}>
        <ChevronLeft />
      </Button>
      <Breadcrumb>
        <BreadcrumbList>
          {pathSegments.map((segment, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink href={buildBreadcrumbUrl(index)}>
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div />
    </div>
  );
};

export default Steps;
