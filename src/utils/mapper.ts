import type { ApiBillResponse, RawApiBillResponse } from "@/types/bills";

export function billsResponseMapper(
  bills: RawApiBillResponse,
): ApiBillResponse {
  return {
    head: bills.head,
    results: bills.results.map(({ bill }) => {
      const {
        act,
        billNo,
        billType,
        billYear,
        lastUpdated,
        longTitleEn,
        longTitleGa,
        method,
        shortTitleEn,
        shortTitleGa,
        source,
        sponsors,
        status,
        uri,
      } = bill;
      return {
        act,
        billNo,
        billType,
        billYear,
        lastUpdated,
        longTitleEn,
        longTitleGa,
        method,
        shortTitleEn,
        shortTitleGa,
        source,
        sponsors,
        status,
        uri,
      };
    }),
  };
}
