import { useContext } from "react";
import { MemberDetailsContext } from "../context/MemberDetailsContext";

export const useMemberDetails = () => useContext(MemberDetailsContext);
