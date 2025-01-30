import { useQuery } from "@tanstack/react-query";
import { fetchPositions } from "./positions";
export const usePositionQuery = ({token}) => {  
    return useQuery(  
        {  
            queryKey: ['positions'], // Include currentPage in the queryKey  
            queryFn: () => fetchPositions(token),  
        }  
    );  
}; 