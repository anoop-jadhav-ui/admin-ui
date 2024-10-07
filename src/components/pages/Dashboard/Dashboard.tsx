import { useMemberDetails } from "../../../hooks/useMemberDetails";
import SearchInput from "../../molecules/SearchInput/SearchInput";
import MembersTable from "../../organisms/MembersTable/MembersTable";
import Pagination from "../../molecules/Pagination/Pagination";
import "./Dashboard.css";

const Dashboard = () => {
  const { members, setMembers } = useMemberDetails();

  const deleteSelectedMembers = () => {
    const updatedMembers = members.filter((member) => !member.isSelected);
    setMembers(updatedMembers);
  };

  return (
    <div className="container">
      <SearchInput />
      <MembersTable />
      <footer>
        <button className="delete-button" onClick={deleteSelectedMembers}>
          Delete Selected
        </button>
        <Pagination />
      </footer>
    </div>
  );
};

export default Dashboard;
