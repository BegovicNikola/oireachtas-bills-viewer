import { BillFilter } from "@/components/BillFilter";
import { BillTable } from "@/components/BillTable";
import type { BillStatus } from "@/types/bills";
import { Container, Typography } from "@mui/material";
import { useState } from "react";

function App() {
  const [billStatus, setBillStatus] = useState<BillStatus[]>([]);

  return (
    <Container>
      <Typography variant="h1">Oireachtas Bills Viewer</Typography>
      <BillFilter onSetBillStatus={setBillStatus} billStatus={billStatus} />
      <BillTable billStatus={billStatus} />
    </Container>
  );
}

export default App;
