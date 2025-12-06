import { BillsTable } from "@/components/BillsTable";
import { useBills } from "@/hooks/useBills";
import { Container } from "@mui/material";

function App() {
  const {
    data: billsResponse,
    isLoading: billsLoading,
    error: billsError,
  } = useBills({
    skip: 0, // TODO: Make pagination dynamic
    limit: 50, // TODO: Make limit dynamic
    bill_status: ["Enacted"], // TODO: Make filter dynamic
  });

  if (billsLoading) return <div>Loading...</div>;
  if (billsError) return <div>Error: {billsError.message}</div>;

  console.log(billsResponse);

  return (
    <Container>
      <h1>Oireachtas Bills Viewer</h1>
      <BillsTable bills={billsResponse?.results} />
    </Container>
  );
}

export default App;
