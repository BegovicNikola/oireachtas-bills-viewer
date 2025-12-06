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
import { format } from "date-fns";

export function BillsTable({ bills }: { bills: Bill[] | undefined }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Sponsors</TableCell>
            <TableCell>Last Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bills && bills.length > 0 ? (
            bills.map((bill) => {
              const {
                billYear,
                billNo,
                billType,
                source,
                status,
                sponsors,
                lastUpdated,
              } = bill.bill;

              const sponsorsList = sponsors
                ?.map(
                  (sponsor) =>
                    sponsor.sponsor.by?.showAs ||
                    sponsor.sponsor.as?.showAs ||
                    "N/A",
                )
                .join(", ");

              return (
                <TableRow key={`${billYear}/${billNo}`}>
                  <TableCell>{`${billYear}/${billNo}`}</TableCell>
                  <TableCell>{billType}</TableCell>
                  <TableCell>{source}</TableCell>
                  <TableCell>{status}</TableCell>
                  <TableCell>{sponsorsList}</TableCell>
                  <TableCell>{format(lastUpdated, "dd MMM yyyy")}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No bills found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
