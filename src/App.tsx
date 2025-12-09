import { BillFilter } from "@/components/BillFilter";
import { BillTable } from "@/components/BillTable";
import { useBills } from "@/hooks/useBills";
import type { BillStatus } from "@/types/bills";
import { Container, Typography } from "@mui/material";
import { useState } from "react";

function App() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [billStatus, setBillStatus] = useState<BillStatus[]>([]);

  const {
    data: billsResponse,
    isLoading: billsLoading,
    error: billsError,
  } = useBills({
    skip: page * limit,
    limit: limit,
    bill_status: billStatus,
  });

  return (
    <Container>
      <Typography variant="h1">Oireachtas Bills Viewer</Typography>
      <BillFilter billStatus={billStatus} setBillStatus={setBillStatus} />
      <BillTable
        bills={billsResponse ?? null}
        loading={billsLoading}
        error={billsError}
        page={page}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
      />
    </Container>
  );
}

export default App;
