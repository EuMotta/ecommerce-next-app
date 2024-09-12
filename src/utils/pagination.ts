import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function handlePagination(
  pageIndex: number | null,
  searchParams: URLSearchParams,
  router: AppRouterInstance,
) {
  const params = new URLSearchParams(searchParams);

  if (pageIndex != null) {
    params.set('page', pageIndex.toString());
  } else {
    params.delete('page');
  }

  router.push(`?${params.toString()}`);
}
