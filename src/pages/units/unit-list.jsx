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
    const [fetchPositions, setFetchPositions] = useAtom(fetchedPositionsAtom);

    useEffect(() => {
        if (isPositionSuccess) {
            setFetchPositions(positions?.positions ?? [])
        }
    }, [isPositionSuccess, positions, setFetchPositions])

    console.log('isSuccess', isSuccess)
    // if (isError) {
    //     return <div>Error: {error.message}</div>
    // }

    if (isPending) <Loading />
    return (
        <div className="">
            {isError && <div>Error: {error.message}</div>}
            {/* {isSuccess && units.length <= 0 && <h1>No Data!</h1>} */}
            {/* {isSuccess && <UnitTable units={units} pagination={units?.pagination} isSuccess={isSuccess} isPending={isPending} isPositionSuccess={isPositionSuccess} />} */}
        </div>
    )
}

export default UnitList