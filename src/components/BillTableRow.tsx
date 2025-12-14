import { TableCell, TableRow } from "@mui/material";

import { billColumns } from "@/utils/table";

import type { Bill } from "@/types/bills";

export function BillTableRow({ bill }: { bill: Bill }) {
  return (
    <TableRow>
      {billColumns.map((col) => (
        <TableCell key={col.id} align={col.align}>
          {col.render(bill)}
        </TableCell>
      ))}
    </TableRow>
  );
}
