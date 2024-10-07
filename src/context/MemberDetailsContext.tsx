import { createContext, useEffect, useMemo, useState } from "react";
import { MemberDetails } from "../models/MemberDetails";

interface MemberDetailsContextType {
  members: MemberDetails[];

  paginatedResponse: MemberDetails[];
  pageSize: number;
  currentPage: number;
  totalItems: number;
  searchText: string;

  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
  setSearchText: (searchText: string) => void;
  setMembers: (members: MemberDetails[]) => void;

  onDeleteMember: (id: string) => void;
  onUpdateMember: (updatedMember: MemberDetails) => void;
}

const defaultValues: Partial<MemberDetailsContextType> = {
  members: [],

  paginatedResponse: [],
  pageSize: 10,
  currentPage: 1,
  totalItems: 0,
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [members, setMembers] = useState<MemberDetails[]>([]);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setMembers(data);
      });
  }, []);

  const filteredResponse = useMemo(() => {
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

  const paginatedResponse = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredResponse.slice(start, end);
  }, [filteredResponse, currentPage, pageSize]);

  const onDeleteMember = (id: string) => {
    const updatedMembers = members.filter((memberItem) => memberItem.id !== id);
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
        paginatedResponse: paginatedResponse,
        pageSize,
        currentPage,
        totalItems: filteredResponse.length,
        searchText,
        setCurrentPage,
        setPageSize,
        setSearchText,
        setMembers,
        onDeleteMember,
        onUpdateMember,
      }}
    >
      {children}
    </MemberDetailsContext.Provider>
  );
};
