import { useState } from "react";

import { Container, Typography } from "@mui/material";

import { BillDetailModal } from "@/components/BillDetailModal";
import { BillFilter } from "@/components/BillFilter";
import { BillTable } from "@/components/BillTable";
import { useBills } from "@/hooks/useBills";

import type { Bill, BillStatus } from "@/types/bills";

function App() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [billStatus, setBillStatus] = useState<BillStatus[]>([]);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBillStatusChange = (newStatus: BillStatus[]) => {
    setBillStatus(newStatus);
    setPage(0);
  };

  const handleBillClick = (bill: Bill) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  const {
    data: billsResponse,
    isLoading: billsLoading,
    error: billsError,
    refetch: refetchBills,
  } = useBills({
    skip: page * limit,
    limit: limit,
    bill_status: billStatus,
  });

  return (
    <Container>
      <Typography variant="h1">Oireachtas Bills Viewer</Typography>
      <BillFilter
        billStatus={billStatus}
        handleBillStatusChange={handleBillStatusChange}
      />
      <BillTable
        bills={billsResponse ?? null}
        loading={billsLoading}
        error={billsError}
        page={page}
        limit={limit}
        onBillClick={handleBillClick}
        setPage={setPage}
        setLimit={setLimit}
        onRetry={refetchBills}
      />
      <BillDetailModal
        key={`dialog-${selectedBill?.billYear}/${selectedBill?.billNo}`}
        open={isModalOpen}
        bill={selectedBill}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
}

export default App;
