import { BillTableBody } from "@/components/BillTableBody";
import { BillTableHead } from "@/components/BillTableHead";
import type { Bill } from "@/types/bills";
import { Paper, Table, TableContainer } from "@mui/material";

export function BillsTable({ bills }: { bills: Bill[] }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <BillTableHead />
        <BillTableBody bills={bills} />
      </Table>
    </TableContainer>
  );
}
