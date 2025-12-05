import type { ApiBillResponse } from "@/types/bills";

export function billsResponseMapper(bills: ApiBillResponse): ApiBillResponse {
  return {
    head: bills.head,
    results: bills.results.map((bill) => {
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
      } = bill.bill;
      return {
        bill: {
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
        },
      };
    }),
  };
}
