import { createContext, useMemo, useState } from "react";
import { useMemberDetails } from "../hooks/useMemberDetails";
import { MemberDetails } from "../models/MemberDetails";

interface PaginationContextType {
  paginatedResponse: MemberDetails[];
  pageSize: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;

  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
}

const defaultValues: Partial<PaginationContextType> = {
  paginatedResponse: [],
  pageSize: 10,
  currentPage: 1,
  totalItems: 0,
};

export const PaginationContext = createContext<PaginationContextType>(
  defaultValues as PaginationContextType
);

export const PaginationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { filteredMembers } = useMemberDetails();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const paginatedResponse = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredMembers.slice(start, end);
  }, [filteredMembers, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredMembers.length / pageSize);

  return (
    <PaginationContext.Provider
      value={{
        paginatedResponse: paginatedResponse,
        pageSize,
        currentPage,
        totalItems: filteredMembers.length,
        totalPages,
        setCurrentPage,
        setPageSize,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
