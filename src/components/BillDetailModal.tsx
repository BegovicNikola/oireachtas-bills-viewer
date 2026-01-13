import { useState } from "react";

import { Dialog, DialogContent, DialogTitle, Tab, Tabs } from "@mui/material";

import { LANGUAGE_VALUES, type LanguageValue } from "@/constants/language";

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
  const { ENGLISH: english, GAELIGE: gaelige } = LANGUAGE_VALUES;
  const [tabValue, setTabValue] = useState<LanguageValue>(english);

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: LanguageValue,
  ) => {
    setTabValue(newValue);
  };

  if (bill === null) {
    return null;
  }

  const title = tabValue === english ? bill.shortTitleEn : bill.shortTitleGa;
  const description =
    tabValue === english ? bill.longTitleEn : bill.longTitleGa;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab
          label={english}
          value={english}
          sx={{ textTransform: "capitalize" }}
        />
        <Tab
          label={gaelige}
          value={gaelige}
          sx={{ textTransform: "capitalize" }}
        />
      </Tabs>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{description}</DialogContent>
    </Dialog>
  );
}
