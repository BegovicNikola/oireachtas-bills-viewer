import type { BillColumn } from "@/types/table";
import { format } from "date-fns";

// Single source of truth for table columns
export const billColumns: BillColumn[] = [
  {
    id: "number",
    label: "Number",
    render: (bill) => `${bill.bill.billYear}/${bill.bill.billNo}`,
  },
  {
    id: "type",
    label: "Type",
    render: (bill) => bill.bill.billType,
  },
  {
    id: "source",
    label: "Source",
    render: (bill) => bill.bill.source,
  },
  {
    id: "status",
    label: "Status",
    render: (bill) => bill.bill.status,
  },
  {
    id: "sponsors",
    label: "Sponsors",
    render: (bill) => {
      // TODO: Bold the primary sponsor
      return (
        bill.bill.sponsors
          ?.map(
            (sponsor) =>
              sponsor.sponsor.by?.showAs || sponsor.sponsor.as?.showAs || "N/A",
          )
          .join(", ") || "N/A"
      );
    },
  },
  {
    id: "lastUpdated",
    label: "Last Updated",
    render: (bill) => format(bill.bill.lastUpdated, "dd MMM yyyy"),
  },
];
