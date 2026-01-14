import type { Bill } from "@/types/bills";

export function getBillId(bill: Bill): string {
  return `${bill.billYear}/${bill.billNo}`;
}
