import type { Bill } from "@/types/bills";

export type BillColumnId =
  | "number"
  | "type"
  | "source"
  | "status"
  | "sponsors"
  | "lastUpdated";

export interface BillColumn {
  id: BillColumnId;
  label: string;
  render: (bill: Bill) => React.ReactNode;
}
