import { BillTableBody } from "@/components/BillTableBody";
import { BillTableFooter } from "@/components/BillTableFooter";
import { BillTableHead } from "@/components/BillTableHead";
import { useBills } from "@/hooks/useBills";
import { Paper, Table, TableContainer } from "@mui/material";
import { useState } from "react";

export function BillsTable() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);

  const {
    data: billsResponse,
    isLoading: billsLoading,
    error: billsError,
  } = useBills({
    skip: page * limit,
    limit: limit,
    bill_status: [], // TODO: Make filter dynamic
  });

  if (billsLoading) return <div>Loading...</div>;
  if (billsError) return <div>Error: {billsError.message}</div>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <BillTableHead />
        <BillTableBody bills={billsResponse?.results ?? []} />
        <BillTableFooter
          total={billsResponse?.head.counts.billCount ?? 0}
          page={page}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
        />
      </Table>
    </TableContainer>
  );
}
