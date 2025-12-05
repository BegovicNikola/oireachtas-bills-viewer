import type { ApiBillQueryParams } from "@/types/bills";
import { fetchBills } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export function useBills(params: ApiBillQueryParams) {
  return useQuery({
    queryKey: [
      "bills",
      params.skip,
      params.limit,
      // Sorting the arrays to ensure consistent serialization
      params.bill_status?.slice().sort().join(",") ?? null,
      params.bill_source?.slice().sort().join(",") ?? null,
      params.bill_year ?? null,
    ],
    queryFn: () => fetchBills(params),
  });
}
