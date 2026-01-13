import { Paper, Table, TableContainer } from "@mui/material";

import { BillTableAlert } from "@/components/BillTableAlert";
import { BillTableBody } from "@/components/BillTableBody";
import { BillTableFooter } from "@/components/BillTableFooter";
import { BillTableHead } from "@/components/BillTableHead";
import { BillTableLoading } from "@/components/BillTableLoading";

import type { ApiBillResponse, Bill } from "@/types/bills";

export function BillTable({
  bills,
  loading,
  error,
  page,
  limit,
  onBillClick,
  setPage,
  setLimit,
  onRetry,
}: {
  bills: ApiBillResponse | null;
  loading: boolean;
  error: Error | null;
  page: number;
  limit: number;
  onBillClick: (bill: Bill) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  onRetry: () => void;
}) {
  if (loading) {
    return <BillTableLoading limit={limit} />;
  }

  if (error) {
    return <BillTableAlert error={error} onRetry={onRetry} />;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <BillTableHead />
        <BillTableBody bills={bills?.results ?? []} onBillClick={onBillClick} />
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
