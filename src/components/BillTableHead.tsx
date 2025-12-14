import { TableCell, TableHead, TableRow } from "@mui/material";

import { billColumns } from "@/utils/table";

export function BillTableHead() {
  return (
    <TableHead>
      <TableRow>
        {billColumns.map((col) => (
          <TableCell key={col.id} align={col.align}>
            {col.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
