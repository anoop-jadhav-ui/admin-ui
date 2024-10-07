import { useContext } from "react";
import { PaginationContext } from "../context/PaginationContext";

export const usePagination = () => useContext(PaginationContext);
