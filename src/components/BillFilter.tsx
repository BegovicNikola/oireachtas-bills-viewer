import type { BillStatus } from "@/types/bills";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export function BillFilter({
  onSetBillStatus,
  billStatus,
}: {
  onSetBillStatus: (billStatus: BillStatus[]) => void;
  billStatus: BillStatus[];
}) {
  return (
    <FormControl>
      <InputLabel id="bill-status-label">Bill Status</InputLabel>
      <Select
        multiple
        labelId="bill-status-label"
        label="Bill Status"
        value={billStatus}
        onChange={(e) => onSetBillStatus(e.target.value as BillStatus[])}
        sx={{ minWidth: 200, width: "auto" }}
      >
        <MenuItem value="Current">Current</MenuItem>
        <MenuItem value="Withdrawn">Withdrawn</MenuItem>
        <MenuItem value="Enacted">Enacted</MenuItem>
        <MenuItem value="Rejected">Rejected</MenuItem>
      </Select>
    </FormControl>
  );
}
