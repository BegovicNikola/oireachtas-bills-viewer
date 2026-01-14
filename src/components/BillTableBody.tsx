import { TableBody } from "@mui/material";

import { BillTableRow } from "@/components/BillTableRow";
import { EmptyTableRow } from "@/components/common/EmptyTableRow";
import { getBillId } from "@/utils/bill";
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
            key={`table-row-${getBillId(bill)}`}
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
