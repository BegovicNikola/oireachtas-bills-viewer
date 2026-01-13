import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { BILL_STATUS, type BillStatus } from "@/types/bills";

export function BillFilter({
  billStatus,
  handleBillStatusChange,
}: {
  billStatus: BillStatus[];
  handleBillStatusChange: (billStatus: BillStatus[]) => void;
}) {
  return (
    <FormControl>
      <InputLabel id="bill-status-label">Bill Status</InputLabel>
      <Select
        multiple
        labelId="bill-status-label"
        label="Bill Status"
        sx={{ width: 300 }}
        value={billStatus}
        onChange={(e) => handleBillStatusChange(e.target.value as BillStatus[])}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {(selected as BillStatus[]).map((value) => (
              <Chip key={`chip-${value}`} label={value} size="medium" />
            ))}
          </Box>
        )}
      >
        {BILL_STATUS.map((status: BillStatus) => (
          <MenuItem key={`menu-item-${status}`} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
