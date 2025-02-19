import { useQuery } from "@tanstack/react-query";
import { fetchPositionStatuses } from "./position-status";
export const usePositionStatusQuery = ({ type, page, limit, search, status }) => {
    console.log("type in position-status", type);
    return useQuery({
        queryKey: ["position-statuses", type, page, search, status], // Include currentPage in the queryKey
        queryFn: () => fetchPositionStatuses(type, page, limit, search, status),
    });
};
