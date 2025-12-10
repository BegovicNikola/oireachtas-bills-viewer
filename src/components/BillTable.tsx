import { BillTableBody } from "@/components/BillTableBody";
import { BillTableFooter } from "@/components/BillTableFooter";
import { BillTableHead } from "@/components/BillTableHead";
import type { ApiBillResponse } from "@/types/bills";
import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableContainer,
} from "@mui/material";

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
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error: {error?.message || "Failed to load bills"}
      </Alert>
    );
  }

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
