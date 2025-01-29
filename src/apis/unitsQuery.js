import { useQuery } from '@tanstack/react-query'
import { fetchUnits } from './units'
export const useUnitsQuery = () => {
  return useQuery({
    queryKey: ['units'],
    queryFn: fetchUnits,
  })
}