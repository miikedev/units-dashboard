import { usePositionQuery } from "@/apis/positionsQuery"
import { useUnitsQuery } from "@/apis/unitsQuery"
import Loading from "@/components/Loading"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { fetchedPositionsAtom, pageAtom } from "./atoms"
import UnitTable from "./unit-table"
import { useDisclosure } from "@heroui/react"
const UnitList = () => {
    const [page,] = useAtom(pageAtom)
    const { data: units, isPending, isSuccess, isError, error } = useUnitsQuery(page)
    const { data: positions, isSuccess: isPositionSuccess } = usePositionQuery({token: localStorage.getItem('token')})
    const [fetchedPositions, setFetchPositions] = useAtom(fetchedPositionsAtom);

    useEffect(() => {
        console.log('positions', positions)
        if (isPositionSuccess) {
            setFetchPositions(positions?.positions)
        }
    }, [isPositionSuccess, positions, setFetchPositions])

    // console.log(fetchedPositions)
    // if (isError) {
    //     return <div>Error: {error.message}</div>
    // }

    return (
        <div className="">
            <UnitTable units={units} pagination={units?.pagination} isSuccess={isSuccess} isPending={isPending} isPositionSuccess={isPositionSuccess} />
            {isError && <div>Error: {error.message}</div>}
        </div>
    )
}

export default UnitList