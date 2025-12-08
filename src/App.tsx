import { BillsTable } from "@/components/BillsTable";
import { Container, Typography } from "@mui/material";

function App() {
  // const [billStatus, setBillStatus] = useState<BillStatus[]>(["Enacted"]);

  return (
    <Container>
      <Typography variant="h1">Oireachtas Bills Viewer</Typography>
      <BillsTable />
    </Container>
  );
}

export default App;
