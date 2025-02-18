import { useQuery } from "@tanstack/react-query";
import { fetchOverview } from "./overview";
export const useOverviewQuery = () => {  
    return useQuery(  
        {  
            queryKey: ['overview'], // Include currentPage in the queryKey  
            queryFn: () => fetchOverview(),  
        }  
    );  
}; 