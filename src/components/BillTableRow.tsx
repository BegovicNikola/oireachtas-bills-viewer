import { TableCell, TableRow } from "@mui/material";

import { billColumns } from "@/utils/table";

import type { Bill } from "@/types/bills";

export function BillTableRow({
  bill,
  onBillClick,
}: {
  bill: Bill;
  onBillClick: (bill: Bill) => void;
}) {
  return (
    <TableRow
      sx={{ cursor: "pointer" }}
      hover
      onClick={() => onBillClick(bill)}
    >
      {billColumns.map((col) => (
        <TableCell key={col.id} align={col.align}>
          {col.render(bill)}
        </TableCell>
      ))}
    </TableRow>
  );
}
