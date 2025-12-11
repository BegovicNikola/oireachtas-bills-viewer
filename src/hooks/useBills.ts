import { useEffect } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchBills, normalizeBillParams } from "@/utils/api";

import type { ApiBillQueryParams } from "@/types/bills";

export function useBills(params: ApiBillQueryParams) {
  const queryClient = useQueryClient();
  const normalizedParams = normalizeBillParams(params);

  const query = useQuery({
    queryKey: ["bills", normalizedParams],
    queryFn: () => fetchBills(normalizedParams),
  });

  // Prefetch one page ahead and one page behind when current page is loaded
  useEffect(() => {
    if (!query.data) return;

    const totalBills = query.data.head.counts.billCount;
    const currentSkip = normalizedParams.skip;
    const limit = normalizedParams.limit;

    // Prefetch next page
    const nextSkip = currentSkip + limit;
    if (nextSkip < totalBills) {
      const nextPageParams = normalizeBillParams({
        ...normalizedParams,
        skip: nextSkip,
      });

      queryClient.prefetchQuery({
        queryKey: ["bills", nextPageParams],
        queryFn: () => fetchBills(nextPageParams),
      });
    }

    // Prefetch previous page (useful when changing rows per page)
    const prevSkip = currentSkip - limit;
    if (prevSkip >= 0) {
      const prevPageParams = normalizeBillParams({
        ...normalizedParams,
        skip: prevSkip,
      });

      queryClient.prefetchQuery({
        queryKey: ["bills", prevPageParams],
        queryFn: () => fetchBills(prevPageParams),
      });
    }
  }, [query.data, normalizedParams, queryClient]);

  return query;
}
