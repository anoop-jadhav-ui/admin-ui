import "./App.css";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import { MemberDetailsProvider } from "./context/MemberDetailsContext";

function App() {
  return (
    <div className="container">
      <MemberDetailsProvider>
        <Dashboard />
      </MemberDetailsProvider>
    </div>
  );
}

export default App;
