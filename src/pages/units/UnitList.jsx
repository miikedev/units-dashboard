import { usePositionQuery } from "@/apis/positionsQuery"
import { useUnitsQuery } from "@/apis/unitsQuery"
import Loading from "@/components/Loading"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { fetchedPositionsAtom, pageAtom } from "./atoms"
import UnitTable from "./UnitTable"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useDisclosure } from "@heroui/react"
const UnitList = () => {
    const [page] = useAtom(pageAtom);
    const { data: units, isPending, isSuccess, isError, error } = useUnitsQuery(page);
    const { 
      data: positionResponse, 
      isSuccess: isPositionSuccess,
      isError: isPositionError,
      error: positionError
    } = usePositionQuery({ token: localStorage.getItem('token') });
    
    const [fetchedPositions, setFetchedPositions] = useAtom(fetchedPositionsAtom);
  
    useEffect(() => {
      if (isPositionSuccess && positionResponse?.data) {
        console.log('Fetched positions:', positionResponse.data);
        setFetchedPositions({
          positions: positionResponse.data,
          timestamp: new Date().toISOString()
        });
      }
    }, [isPositionSuccess, positionResponse, setFetchedPositions]);
  
    // Error handling for positions
    if (isPositionError) {
      console.error('Position fetch error:', positionError);
      return <div>Error loading positions: {positionError.message}</div>;
    }
  
    return (
      <div className="">
        <UnitTable 
          units={units} 
          pagination={units?.pagination} 
          isSuccess={isSuccess} 
          isPending={isPending} 
        />
        {isError && <div>Error loading units: {error?.message}</div>}
        <ReactQueryDevtools initialIsOpen={true} />
      </div>
    );
  };

export default UnitList