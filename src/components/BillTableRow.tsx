import type { Bill } from "@/types/bills";
import { billColumns } from "@/utils/table";
import { TableCell, TableRow } from "@mui/material";

export function BillTableRow({ bill }: { bill: Bill }) {
  return (
    <TableRow>
      {billColumns.map((col) => (
        <TableCell key={col.id}>{col.render(bill)}</TableCell>
      ))}
    </TableRow>
  );
}
