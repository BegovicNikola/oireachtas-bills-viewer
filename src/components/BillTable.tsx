import { BillTableBody } from "@/components/BillTableBody";
import { BillTableFooter } from "@/components/BillTableFooter";
import { BillTableHead } from "@/components/BillTableHead";
import type { ApiBillResponse } from "@/types/bills";
import { Paper, Table, TableContainer } from "@mui/material";

export function BillTable({
  bills,
  loading,
  error,
  page,
  limit,
  setPage,
  setLimit,
}: {
  bills: ApiBillResponse | null;
  loading: boolean;
  error: Error | null;
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error?.message}</div>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <BillTableHead />
        <BillTableBody bills={bills?.results ?? []} />
        <BillTableFooter
          total={bills?.head.counts.billCount ?? 0}
          page={page}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
        />
      </Table>
    </TableContainer>
  );
}
