import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import type { Bill } from "@/types/bills";

export function BillDetailModal({
  open,
  bill,
  onClose,
}: {
  open: boolean;
  bill: Bill | null;
  onClose: () => void;
}) {
  if (bill === null) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{bill.shortTitleEn}</DialogTitle>
      <DialogContent>{bill.longTitleEn}</DialogContent>
    </Dialog>
  );
}
