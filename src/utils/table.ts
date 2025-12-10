import { format } from "date-fns";

import type { BillColumn } from "@/types/table";

// Single source of truth for table columns
export const billColumns: BillColumn[] = [
  {
    id: "number",
    label: "Number",
    render: (bill) => `${bill.billYear}/${bill.billNo}`,
  },
  {
    id: "type",
    label: "Type",
    render: (bill) => bill.billType,
  },
  {
    id: "source",
    label: "Source",
    render: (bill) => bill.source,
  },
  {
    id: "status",
    label: "Status",
    render: (bill) => bill.status,
  },
  {
    id: "sponsors",
    label: "Sponsors",
    render: (bill) => {
      // TODO: Bold the primary sponsor
      return (
        bill.sponsors
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
    render: (bill) => format(bill.lastUpdated, "dd MMM yyyy"),
  },
];
