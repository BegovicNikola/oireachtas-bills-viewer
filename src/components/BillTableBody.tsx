import { BillTableRow } from "@/components/BillTableRow";
import type { Bill } from "@/types/bills";
import { billColumns } from "@/utils/table";
import { TableBody, TableCell, TableRow } from "@mui/material";

export function BillTableBody({ bills }: { bills: Bill[] }) {
  return (
    <TableBody>
      {bills.length > 0 ? (
        bills.map((bill) => (
          <BillTableRow
            key={`${bill.bill.billYear}/${bill.bill.billNo}`}
            bill={bill}
          />
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={billColumns.length} align="center">
            No bills found
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
