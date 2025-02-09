import { useUnitsQuery } from "@/apis/unitsQuery";
import UnitTableAlphabetical from "./table-components/unit-table-alpha";
import { pageAtom, unitsAtom, unitsPaginationAtom } from "./atoms/index";
import { useAtom } from "jotai";
import { useEffect } from "react";
const UnitListAlpha = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [fetchedUnits, setFetchedUnits] = useAtom(unitsAtom);
  const [fetchedPagination, setFetchedPagination] =
    useAtom(unitsPaginationAtom);
  const {
    data: units,
    isLoading: unitsLoading,
    isSuccess: unitsSuccess,
    isError: unitsError,
  } = useUnitsQuery(page);
  useEffect(() => {
    setFetchedUnits(units?.data);
    setFetchedPagination(units?.pagination);
  }, [units, unitsSuccess, page]);
  return (
    <>
      <div className="mx-5">
        <h1>Unit List Alpha</h1>
        <UnitTableAlphabetical
          isLoading={unitsLoading}
          isSuccess={unitsSuccess}
          units={fetchedUnits}
          pagination={fetchedPagination}
        />
      </div>
    </>
  );
};

export default UnitListAlpha;
