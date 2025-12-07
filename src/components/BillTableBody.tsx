import { BillTableRow } from "@/components/BillTableRow";
import { EmptyTableRow } from "@/components/common/EmptyTableRow";
import type { Bill } from "@/types/bills";
import { billColumns } from "@/utils/table";
import { TableBody } from "@mui/material";

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
