import type { Bill } from "@/types/bills";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export function BillsTable({ bills }: { bills: Bill[] | undefined }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Sponsors</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bills ? (
            bills.map((bill) => (
              <TableRow key={`${bill.bill.billYear}/${bill.bill.billNo}`}>
                <TableCell>{`${bill.bill.billYear}/${bill.bill.billNo}`}</TableCell>
                <TableCell>{bill.bill.billType}</TableCell>
                <TableCell>{bill.bill.billYear}</TableCell>
                <TableCell>{bill.bill.status}</TableCell>
                <TableCell>{bill.bill.source}</TableCell>
                <TableCell>
                  {bill.bill.sponsors
                    ?.map((sponsor) => sponsor.sponsor.as?.showAs)
                    .join(", ")}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No bills found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
