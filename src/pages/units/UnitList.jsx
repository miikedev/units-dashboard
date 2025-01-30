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
    const [page,] = useAtom(pageAtom)
    const { data: units, isPending, isSuccess, isError, error } = useUnitsQuery(page)
    const { data: positions, isSuccess: isPositionSuccess } = usePositionQuery()
    const [fetchedPositions, setFetchPositions] = useAtom(fetchedPositionsAtom);

    useEffect(() => {
        console.log('positions', positions)
        if (isPositionSuccess) {
            setFetchPositions(positions)
        }
    }, [isPositionSuccess, positions, setFetchPositions])

    // if (isError) {
    //     return <div>Error: {error.message}</div>
    // }

    return (
        <div className="">
            <UnitTable units={units} pagination={units?.pagination} isSuccess={isSuccess} isPending={isPending} />
            {isError && <div>Error: {error.message}</div>}
            <ReactQueryDevtools initialIsOpen="true" />
        </div>
    )
}

export default UnitList