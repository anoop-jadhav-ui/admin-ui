import { useState } from "react";
import { useMemberDetails } from "../../../hooks/useMemberDetails";
import { usePagination } from "../../../hooks/usePagination";
import { MemberDetails } from "../../../models/MemberDetails";
import Checkbox from "../../atoms/Checkbox/Checkbox";
import MemberRow from "../../molecules/MemberRow/MemberRow";
import "./MembersTable.css";

const MembersTable = () => {
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const { members, setMembers, onUpdateMember } = useMemberDetails();
  const { paginatedResponse } = usePagination();

  const onMemberSelect = (member: MemberDetails) => {
    onUpdateMember({
      ...member,
      isSelected: !member.isSelected,
    });
  };

  const toggleSelectAll = () => {
    const memberIdsOnCurrentPage = paginatedResponse.map((member) => member.id);
    const updatedMembers = members.map((member) => {
      if (memberIdsOnCurrentPage.includes(member.id)) {
        return { ...member, isSelected: !isSelectAllChecked };
      }
      return member;
    });
    setMembers(updatedMembers);
    setIsSelectAllChecked((value) => !value);
  };

  return (
    <section className="content">
      <table>
        <thead>
          <tr>
            <th>
              <Checkbox
                ariaLabel="select all"
                checked={isSelectAllChecked}
                onClick={toggleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedResponse.length === 0 && (
            <tr className="empty-state">
              <td colSpan={5}>
                <b>No members found</b>
                <div>Please check your search keywords</div>
              </td>
            </tr>
          )}
          {paginatedResponse.map((member) => (
            <MemberRow
              member={member}
              key={member.id}
              isSelected={member.isSelected}
              onSelect={onMemberSelect}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default MembersTable;
