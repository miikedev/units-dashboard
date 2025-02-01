import { useQuery } from "@tanstack/react-query";
import { fetchPositions, fetchPositionsByLevel, fetchAllPositionsByAllLevels } from "./positions";
export const usePositionQuery = ({token}) => {  
    return useQuery(  
        {  
            queryKey: ['positions'], // Include currentPage in the queryKey  
            queryFn: () => fetchPositions(token),  
        }  
    );  
}; 
export const usePositionsByLevel = ({level, token}) => {
    return useQuery(  
        {  
            queryKey: ['positions', level], // Include currentPage in the queryKey  
            queryFn: () => fetchPositionsByLevel(level, token),  
        }  
    );
}

export const usePositionsByAllLevels = ({token}) => {
    return useQuery(  
        {  
            queryKey: ['positions', 'all'], // Include currentPage in the queryKey  
            queryFn: () => fetchAllPositionsByAllLevels(token),  
        }  
    );
}