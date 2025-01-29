import { useQuery } from "@tanstack/react-query";
import { fetchOverview } from "./overview";
export const useOverviewQuery = () => {  
    return useQuery(  
        {  
            queryKey: ['units', 'counts'], // Include currentPage in the queryKey  
            queryFn: () => fetchOverview(),  
        }  
    );  
}; 