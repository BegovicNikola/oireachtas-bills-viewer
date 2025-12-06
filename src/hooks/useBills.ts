import type { ApiBillQueryParams } from "@/types/bills";
import { fetchBills, normalizeBillParams } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export function useBills(params: ApiBillQueryParams) {
  const normalizedParams = normalizeBillParams(params);

  return useQuery({
    queryKey: ["bills", normalizedParams],
    queryFn: () => fetchBills(normalizedParams),
  });
}
