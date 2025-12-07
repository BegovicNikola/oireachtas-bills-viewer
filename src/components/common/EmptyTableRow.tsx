import { TableCell, TableRow } from "@mui/material";

export function EmptyTableRow({
  colSpan,
  message,
  align = "center",
}: {
  colSpan: number;
  message: string;
  align?: "left" | "center" | "right";
}) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align={align}>
        {message}
      </TableCell>
    </TableRow>
  );
}
