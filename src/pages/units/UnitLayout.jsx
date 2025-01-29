import React from 'react'
import { useUnitsQuery } from '@/apis/unitsQuery'
const UnitLayout = () => {
    const { data: units, isLoading, isError, error } = useUnitsQuery()
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error: {error.message}</div>
    }
    console.log(units)
    return (
        <div>UnitLayout</div>
    )
}

export default UnitLayout