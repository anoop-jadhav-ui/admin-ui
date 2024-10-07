import { useMemberDetails } from "../../../hooks/useMemberDetails";
import SearchInput from "../../molecules/SearchInput/SearchInput";
import MembersTable from "../../organisms/MembersTable/MembersTable";
import Pagination from "../../molecules/Pagination/Pagination";
import "./Dashboard.css";

const Dashboard = () => {
  const { onDeleteSelectedMembers } = useMemberDetails();

  return (
    <div className="container">
      <SearchInput />
      <MembersTable />
      <footer>
        <button className="delete-button" onClick={onDeleteSelectedMembers}>
          Delete Selected
        </button>
        <Pagination />
      </footer>
    </div>
  );
};

export default Dashboard;
