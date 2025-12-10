import { TableFooter, TablePagination, TableRow } from "@mui/material";

import { billColumns } from "@/utils/table";

export function BillTableFooter({
  total,
  page,
  limit,
  setPage,
  setLimit,
}: {
  total: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}) {
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          colSpan={billColumns.length}
          count={total}
          page={page}
          rowsPerPage={limit}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setLimit(Number(event.target.value))}
        />
      </TableRow>
    </TableFooter>
  );
}
