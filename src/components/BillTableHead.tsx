import { billColumns } from "@/utils/table";
import { TableCell, TableHead, TableRow } from "@mui/material";

export function BillTableHead() {
  return (
    <TableHead>
      <TableRow>
        {billColumns.map((col) => (
          <TableCell key={col.id}>{col.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
