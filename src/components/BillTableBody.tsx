import { TableBody } from "@mui/material";

import { BillTableRow } from "@/components/BillTableRow";
import { EmptyTableRow } from "@/components/common/EmptyTableRow";
import { billColumns } from "@/utils/table";

import type { Bill } from "@/types/bills";

export function BillTableBody({
  bills,
  onBillClick,
}: {
  bills: Bill[];
  onBillClick: (bill: Bill) => void;
}) {
  return (
    <TableBody>
      {bills.length > 0 ? (
        bills.map((bill) => (
          <BillTableRow
            key={`${bill.billYear}/${bill.billNo}`}
            bill={bill}
            onBillClick={onBillClick}
          />
        ))
      ) : (
        <EmptyTableRow colSpan={billColumns.length} message="No bills found" />
      )}
    </TableBody>
  );
}
