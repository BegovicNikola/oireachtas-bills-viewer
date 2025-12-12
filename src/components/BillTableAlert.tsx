import { Alert, AlertTitle, Button } from "@mui/material";

export function BillTableAlert({
  error,
  onRetry,
}: {
  error: Error;
  onRetry: () => void;
}) {
  return (
    <Alert
      severity="error"
      sx={{ m: 2 }}
      action={
        onRetry && (
          <Button color="inherit" size="small" onClick={() => onRetry()}>
            Retry
          </Button>
        )
      }
    >
      <AlertTitle>Failed to load bills</AlertTitle>
      {error?.message ||
        "An unexpected error occurred while fetching bills. Please try again."}
    </Alert>
  );
}
