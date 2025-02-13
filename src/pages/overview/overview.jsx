
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Button } from "@heroui/button";
import { useAtom } from "jotai";
import { useEffect } from "react";

import PieChart from "./pie-chart";

import { overviewAtom, showStatusAtom } from "@/atoms/overviewAtom";
import Loading from "@/components/Loading";
import InactivePositionTable from "./inactive-position-table";
import { useOverviewQuery } from "@/apis/overviewQuery";
import Error from "@/components/Error";
import { LoaderIcon } from "lucide-react";

const Overview = () => {
  const { data, isSuccess, isPending, isError, error } = useOverviewQuery();
  const [overview, setOverview] = useAtom(overviewAtom);
  const [showStatus, setShowStatus] = useAtom(showStatusAtom);

  useEffect(() => {
    if (data && data !== overview) {
      setOverview(data);
    }
  }, [data, overview, setOverview]);

  const {
    totalUnits = 0,
    activeUnits = 0,
    inactiveUnits = 0,
    statusZeroPositionsCount = 0,
    statusZeroPositions = [],
    dateRange = "",
    unitsByLevel = [],
    activeUnitsByLevel = [],
    inactiveUnitsByLevel = [],
  } = overview || {};

  if (isPending) return <div className="flex justify-center items-center w-full h-3/4"><LoaderIcon /></div>;
  if (isError) return <div className="flex justify-center items-center w-full h-3/4"><Error /></div>

  if (!isSuccess || !overview) return null;

  const pieChartData = [
    { data: unitsByLevel, label: "Total Units" },
    { data: activeUnitsByLevel, label: "Active Units" },
    { data: inactiveUnitsByLevel, label: "Inactive Units" },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-5">
        <Card>
          <CardHeader>ခန့်ထားပြီးသူ နှင့် လျာထားပြီးသူ စုစုပေါင်း</CardHeader>
          <CardContent>{totalUnits}</CardContent>
        </Card>
        <Card>
          <CardHeader>ခန့်ထားပြီးသူ စုစုပေါင်း</CardHeader>
          <CardContent>{activeUnits}</CardContent>
        </Card>
        <Card>
          <CardHeader>လျာထားပြီးသူ စုစုပေါင်း</CardHeader>
          <CardContent>{inactiveUnits}</CardContent>
        </Card>
        <Card>
          <CardHeader>လစ်လပ်ရာထူးများ</CardHeader>
          <CardContent className="flex justify-between items-end">
            <span>{statusZeroPositionsCount}</span>
            <Button
              variant={showStatus ? "outline" : "primary"}
              className="font-thin relative top-[.5rem]"
              onPress={() => setShowStatus(!showStatus)}
            >
              {showStatus ? "Hide Details" : "Show Details"}
            </Button>
          </CardContent>
        </Card>
      </div>
      {showStatus && (
        <div className="mb-5">
          <InactivePositionTable data={statusZeroPositions} />
        </div>
      )}
      <Card>
        <div className="flex w-full justify-between">
          {pieChartData.map(({ data, label }, index) => (
            <PieChart key={index} data={data} dateRange={dateRange} label={label} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Overview;
