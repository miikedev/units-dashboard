import { useUnitsQuery } from '@/apis/unitsQuery'
import { Outlet } from 'react-router'
const UnitLayout = () => {

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default UnitLayout