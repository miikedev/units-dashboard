import { useUnitsQuery } from "@/apis/unitsQuery"
import UnitTable from "./UnitTable"
import { usePositionQuery } from "@/apis/positionsQuery"
import { useEffect } from "react"
import { fetchedPositionsAtom } from "./atoms"
import { useAtom } from "jotai"

const UnitList = () => {
    const { data: units, isLoading, isError, error } = useUnitsQuery()
    const { data: positions, isSuccess: isPositionSuccess } = usePositionQuery()
    const [fetchedPositions, setFetchPositions] = useAtom(fetchedPositionsAtom);

    useEffect(() => {
        console.log('positions', positions)
        if (isPositionSuccess) {
            setFetchPositions(positions)
        }
    },[isPositionSuccess])

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error: {error.message}</div>
    }

  return (
    <div>
        <UnitTable units={units} />
    </div>
  )
}

export default UnitList