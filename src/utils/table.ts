import { format } from "date-fns";

import { getBillId } from "@/utils/bill";
import { formatSponsors } from "@/utils/sponsors";

import type { Bill } from "@/types/bills";
import type { BillColumn } from "@/types/table";

// Helper function for simple text columns
function textColumn(
  id: BillColumn["id"],
  label: string,
  accessor: (bill: Bill) => string,
  align: BillColumn["align"],
): BillColumn {
  return {
    id,
    label,
    render: accessor,
    align,
  };
}

// Helper function for formatted columns
function formattedColumn(
  id: BillColumn["id"],
  label: string,
  formatter: (bill: Bill) => React.ReactNode,
  align: BillColumn["align"],
): BillColumn {
  return {
    id,
    label,
    render: formatter,
    align,
  };
}

// Single source of truth for table columns
export const billColumns: BillColumn[] = [
  formattedColumn("number", "Number", (bill) => getBillId(bill), "left"),
  textColumn("type", "Type", (bill) => bill.billType, "left"),
  textColumn("source", "Source", (bill) => bill.source, "left"),
  textColumn("status", "Status", (bill) => bill.status, "left"),
  formattedColumn(
    "sponsors",
    "Sponsors",
    (bill) => formatSponsors(bill.sponsors, 50),
    "left",
  ),
  formattedColumn(
    "lastUpdated",
    "Last Updated",
    (bill) => format(bill.lastUpdated, "dd MMM yyyy"),
    "right",
  ),
];
