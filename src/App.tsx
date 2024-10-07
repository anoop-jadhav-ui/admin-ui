import "./App.css";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import { MemberDetailsProvider } from "./context/MemberDetailsContext";
import { PaginationProvider } from "./context/PaginationContext";

function App() {
  return (
    <div className="container">
      <MemberDetailsProvider>
        <PaginationProvider>
          <Dashboard />
        </PaginationProvider>
      </MemberDetailsProvider>
    </div>
  );
}

export default App;
