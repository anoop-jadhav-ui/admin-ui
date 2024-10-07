import { useState } from "react";
import { useMemberDetails } from "../../../hooks/useMemberDetails";
import { MemberDetails } from "../../../models/MemberDetails";
import Checkbox from "../../atoms/Checkbox/Checkbox";
import "./MemberRow.css";

interface MemberRowProps {
  member: MemberDetails;
  isSelected: boolean;
  onSelect: (id: MemberDetails) => void;
}

enum FormMode {
  EDIT = "edit",
  VIEW = "VIEW",
}
const MemberRow = ({ member, isSelected, onSelect }: MemberRowProps) => {
  const { onDeleteMember, onUpdateMember } = useMemberDetails();

  const [mode, setMode] = useState(FormMode.VIEW);
  const isEditMode = mode === FormMode.EDIT;

  const [editedName, setEditedName] = useState(member.name);
  const [editedEmail, setEditedEmail] = useState(member.email);
  const [editedRole, setEditedRole] = useState(member.role);

  const onSave = () => {
    onUpdateMember({
      ...member,
      name: editedName,
      email: editedEmail,
      role: editedRole,
    });
    setMode(FormMode.VIEW);
  };

  return (
    <tr key={member.id} className={isSelected ? "selected" : ""}>
      <td>
        <Checkbox
          checked={member.isSelected}
          ariaLabel={`Select ${member.name}`}
          onClick={() => onSelect(member)}
        />
      </td>
      <td className="name-row">
        {isEditMode ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          member.name
        )}
      </td>
      <td>
        {isEditMode ? (
          <input
            type="text"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
        ) : (
          member.email
        )}
      </td>
      <td>
        {isEditMode ? (
          <input
            type="text"
            value={editedRole}
            onChange={(e) => setEditedRole(e.target.value)}
          />
        ) : (
          member.role
        )}
      </td>
      <td>
        {!isEditMode && (
          <>
            <button
              className="text edit"
              onClick={() => setMode(FormMode.EDIT)}
            >
              Edit
            </button>
            <button
              className="text delete"
              onClick={() => onDeleteMember(member.id)}
            >
              Delete
            </button>
          </>
        )}
        {isEditMode && (
          <button className="text save" onClick={onSave}>
            Save
          </button>
        )}
      </td>
    </tr>
  );
};

export default MemberRow;
