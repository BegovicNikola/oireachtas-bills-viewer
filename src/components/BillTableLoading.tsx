import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import { BillTableHead } from "@/components/BillTableHead";
import { billColumns } from "@/utils/table";

export function BillTableLoading({ limit }: { limit: number }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <BillTableHead />
        <TableBody>
          {Array.from({ length: limit }).map((_, index) => (
            <TableRow key={index}>
              {billColumns.map((col) => (
                <TableCell key={col.id}>
                  <Skeleton variant="text" width="100%" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
