import { useQuery } from "@tanstack/react-query";

import { fetchBills, normalizeBillParams } from "@/utils/api";

import type { ApiBillQueryParams } from "@/types/bills";

export function useBills(params: ApiBillQueryParams) {
  const normalizedParams = normalizeBillParams(params);

  return useQuery({
    queryKey: ["bills", normalizedParams],
    queryFn: () => fetchBills(normalizedParams),
  });
}
