import { useBills } from "./hooks/useBills";

function App() {
  const {
    data: bills,
    isLoading: billsLoading,
    error: billsError,
  } = useBills({
    skip: 0, // TODO: Make pagination dynamic
    limit: 50, // TODO: Make limit dynamic
    bill_status: ["Enacted"], // TODO: Make filter dynamic
  });

  if (billsLoading) return <div>Loading...</div>;
  if (billsError) return <div>Error: {billsError.message}</div>;

  console.log(bills);

  return (
    <div>
      <h1>Oireachtas Bills Viewer</h1>
    </div>
  );
}

export default App;
