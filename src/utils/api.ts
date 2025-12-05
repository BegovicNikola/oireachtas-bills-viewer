import { API_ENDPOINTS } from "@/constants/api";
import type { ApiBillQueryParams, ApiBillResponse } from "@/types/bills";
import { billsResponseMapper } from "@/utils/mapper";

export function buildQueryString(params: ApiBillQueryParams): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    if (Array.isArray(value)) {
      if (value.length > 0) {
        searchParams.append(key, value.join(","));
      }
    } else {
      searchParams.append(key, value.toString());
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export async function fetchBills(
  params: ApiBillQueryParams,
): Promise<ApiBillResponse> {
  const queryString = buildQueryString(params);
  const url = `${API_ENDPOINTS.BILLS}${queryString}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch bills: ${response.statusText}`);
  }

  const data = await response.json();
  return billsResponseMapper(data);
}
