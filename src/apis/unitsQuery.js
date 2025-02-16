import {
  useMutation,
  useQuery,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createUnit,
  fetchUnits,
  deleteUnit,
  fetchUnitById,
  updateUnit,
} from "./units";
const queryClient = new QueryClient();

export const useUnitsQuery = ({page: currentPage, search, status}) => {
  console.log('search in unit query', search);
  return useQuery({
    queryKey: ["units", currentPage, search, status],
    queryFn: () => fetchUnits(currentPage, search, status),
    // enabled: Boolean(search)
  });
};

export const useUnitsSearchQuery = ({page: currentPage, search}) => {
  return useQuery({
    queryKey: ["units", currentPage, search],
    queryFn: () => fetchUnits(currentPage, search),
    enabled: Boolean(search)
  });
};
export const useUnitFetchByIdQuery = (id) => {
  console.log("fetch id " + id);
  return useQuery({
    queryKey: ["units", id],
    queryFn: () => fetchUnitById(id),
  });
};
export const useUnitCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }) => {
      console.log("unit create payload", payload);
      return createUnit(payload);
    },
    onSuccess: (newUnit, variables) => {
      // // Update the cache for the first page
      // queryClient.setQueryData(["units", 1], (oldData) => {
      //   if (oldData && oldData.data) {
      //     // Add the new unit to the beginning of the array
      //     return {
      //       ...oldData,
      //       data: [newUnit, ...oldData.data],
      //     }
      //   }
      //   return oldData
      // })

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["units", 1] });
    },
    onError: (error) => {
      console.error("Error creating unit:", error);
    },
  });
};

export const useUnitDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, page }) => {
      console.log("Deleting unit with ID:", id);
      return deleteUnit(id);
    },
    onMutate: async ({ id, page }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(["units", page]);

      // Snapshot the previous value
      const previousUnits = queryClient.getQueryData(["units", page]);

      // Optimistically update to the new value
      if (previousUnits) {
        queryClient.setQueryData(["units", page], (oldData) => ({
          ...oldData,
          data: oldData.data.filter((unit) => unit._id !== id),
        }));
      }

      // Return a context object with the snapshotted value
      return { previousUnits };
    },
    onError: (error, { id, page }, context) => {
      console.error(`Error deleting unit with id ${id}:`, error);
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousUnits) {
        queryClient.setQueryData(["units", page], context.previousUnits);
      }
    },
    onSuccess: (data, { id, page }) => {
      console.log("Unit deleted successfully");
      // Update the cache to remove the deleted item
      queryClient.setQueryData(["units", page], (oldData) => ({
        ...oldData,
        data: oldData.data.filter((unit) => unit._id !== id),
      }));
    },
    onSettled: (data, error, { page }) => {
      // Always refetch after error or success to ensure cache is up to date
      queryClient.invalidateQueries(["units", page]);
      queryClient.invalidateQueries(["units", "counts"]);
    },
  });
};
export const useUnitUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => {
      console.log("Updating unit:", id, payload);
      return updateUnit(id, payload);
    },
    onSuccess: (data, variables) => {
      console.log("Unit updated successfully:", variables.id);
      queryClient.invalidateQueries({ queryKey: ["units"] });
      queryClient.setQueryData(["unit", variables.id], data);
    },
    onError: (error) => {
      console.error("Error updating unit:", error);
    },
  });
};
