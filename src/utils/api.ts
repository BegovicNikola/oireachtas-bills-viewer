import { API_ENDPOINTS } from "@/constants/api";
import { billsResponseMapper } from "@/utils/mapper";

import type {
  ApiBillQueryParams,
  ApiBillResponse,
  RawApiBillResponse,
} from "@/types/bills";

export async function mockFavouriteBill(
  billId: string,
  isFavourite: boolean,
): Promise<void> {
  // Simulate a network delay (realistic mock)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log(
    `[API Request] ${isFavourite ? "Favouriting" : "Unfavouriting"} bill: ${billId}`,
  );
}

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

export function normalizeBillParams(
  params: ApiBillQueryParams,
): ApiBillQueryParams {
  const { skip, limit, bill_status, bill_source, bill_year } = params;

  return {
    skip: skip ?? 0,
    limit: limit ?? 50,
    // Sorting the arrays to ensure consistent serialization
    bill_status: bill_status?.slice().sort(),
    bill_source: bill_source?.slice().sort(),
    bill_year: bill_year,
  };
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

  const data: RawApiBillResponse = await response.json();
  return billsResponseMapper(data);
}
