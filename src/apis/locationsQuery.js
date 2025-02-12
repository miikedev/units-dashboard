import { useQuery } from "@tanstack/react-query";
import { fetchLocations } from "./locations";

export const useLocationsQuery = (currentPage) => {
  return useQuery({
    queryKey: ["locations", currentPage],
    queryFn: () => fetchLocations(currentPage),
  });
};

