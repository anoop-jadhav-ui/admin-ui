import { createContext, useEffect, useMemo, useState } from "react";
import { MemberDetails } from "../models/MemberDetails";

interface MemberDetailsContextType {
  members: MemberDetails[];
  filteredMembers: MemberDetails[];
  searchText: string;

  setSearchText: (searchText: string) => void;
  setMembers: (members: MemberDetails[]) => void;

  onDeleteMember: (id: string) => void;
  onUpdateMember: (updatedMember: MemberDetails) => void;
  onDeleteSelectedMembers: () => void;
}

const defaultValues: Partial<MemberDetailsContextType> = {
  members: [],
  filteredMembers: [],
  searchText: "",
};

export const MemberDetailsContext = createContext<MemberDetailsContextType>(
  defaultValues as MemberDetailsContextType
);

export const MemberDetailsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchText, setSearchText] = useState("");
  const [members, setMembers] = useState<MemberDetails[]>([]);

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setMembers(data);
      });
  }, []);

  const filteredMembers = useMemo(() => {
    if (!searchText) {
      return members;
    }
    return members.filter(
      (member) =>
        member.name.toLowerCase().includes(searchText.toLowerCase()) ||
        member.email.toLowerCase().includes(searchText.toLowerCase()) ||
        member.role.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [members, searchText]);

  const onDeleteMember = (id: string) => {
    const updatedMembers = members.filter((memberItem) => memberItem.id !== id);
    setMembers(updatedMembers);
  };

  const onDeleteSelectedMembers = () => {
    const updatedMembers = members.filter((member) => !member.isSelected);
    setMembers(updatedMembers);
  };

  const onUpdateMember = (updatedMember: MemberDetails) => {
    const updatedMembers = members.map((memberItem) => {
      if (memberItem.id === updatedMember.id) {
        return updatedMember;
      }
      return memberItem;
    });
    setMembers(updatedMembers);
  };

  return (
    <MemberDetailsContext.Provider
      value={{
        members,
        filteredMembers,
        searchText,
        setSearchText,
        setMembers,
        onDeleteMember,
        onUpdateMember,
        onDeleteSelectedMembers,
      }}
    >
      {children}
    </MemberDetailsContext.Provider>
  );
};
