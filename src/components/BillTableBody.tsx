import { TableBody } from "@mui/material";

import { BillTableRow } from "@/components/BillTableRow";
import { EmptyTableRow } from "@/components/common/EmptyTableRow";
import { billColumns } from "@/utils/table";

import type { Bill } from "@/types/bills";

export function BillTableBody({ bills }: { bills: Bill[] }) {
  return (
    <TableBody>
      {bills.length > 0 ? (
        bills.map((bill) => (
          <BillTableRow key={`${bill.billYear}/${bill.billNo}`} bill={bill} />
        ))
      ) : (
        <EmptyTableRow colSpan={billColumns.length} message="No bills found" />
      )}
    </TableBody>
  );
}
