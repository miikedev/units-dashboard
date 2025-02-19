
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Button } from "@heroui/button";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import PieChart from "./pie-chart";

import { overviewAtom, showStatusAtom } from "@/atoms/overviewAtom";
import Loading from "@/components/Loading";
import InactivePositionTable from "./inactive-position-table";
import { useOverviewQuery } from "@/apis/overviewQuery";
import Error from "@/components/Error";
import { LoaderIcon } from "lucide-react";
import { usePositionStatusQuery } from "@/apis/positionStatusQuery";
import { inactivePageAtom } from "../units/atoms";

const Overview = () => {
  const [ page ] = useAtom(inactivePageAtom)
  const { data, isSuccess, isPending, isError } = useOverviewQuery();
  const { data: NData, isSuccess: NSuccess, isLoading: NLoading, isError: NError } = usePositionStatusQuery({page, status: "N"})
  console.log('n data: ' , NData?.data)
  const [statusSum, setStatusSum] = useState({ A: 0, N: 0, C: 0 });
  const [showStatus, setShowStatus] = useAtom(showStatusAtom);
  useEffect(() => {
    if (isSuccess && data?.data) {
      const initialSum = { A: 0, N: 0, C: 0 };

      const calculatedSum = data.data.reduce((acc, item) => ({
        A: acc.A + (item.count?.A ?? 0),
        N: acc.N + (item.count?.N ?? 0),
        C: acc.C + (item.count?.C ?? 0)
      }), initialSum);

      setStatusSum(calculatedSum);
    }
  }, [data, isSuccess]);

  const result = data?.data.flatMap(item =>
    Object.entries(item.count).map(([status, count]) => ({
      level: item.level,
      status,
      count,
      fill: item.fill
    }))
  );

  const filterAStatus = result?.filter(i => i.status === 'A')
  const filterCStatus = result?.filter(i => i.status === 'C')
  const filterNStatus = result?.filter(i => i.status === 'N')
  const pieData = [
    {
      name: 'A',
      value: filterAStatus
    },
    {
      name: 'C',
      value: filterCStatus
    },
    {
      name: 'N',
      value: filterNStatus
    }
  ]

  console.log('pieData', pieData)
  if (isPending) return <div className="flex justify-center items-center w-full h-3/4"><Loading /></div>;
  if (isError) return <div className="flex justify-center items-center w-full h-3/4"><Error /></div>
  if (!isSuccess || !statusSum) return null;

  const pieChartData = [
    { data: statusSum?.N + statusSum?.A + statusSum?.C, label: "Total Units" },
    { data: statusSum?.A, label: "Active Units" },
    { data: statusSum?.C, label: "Inactive Units" },
  ];

  console.log('pieChartData', pieChartData)

  return (
    <div className="px-5">
      <div className="grid lg:grid-cols-4 my-5">
        <Card>
          <CardHeader>ခန့်ထားပြီးသူ နှင့် လျာထားပြီးသူ စုစုပေါင်း</CardHeader>
          <CardContent>{statusSum.A + statusSum.C}</CardContent>
        </Card>
        <Card>
          <CardHeader>ခန့်ထားပြီးသူ စုစုပေါင်း</CardHeader>
          <CardContent>{statusSum.A}</CardContent>
        </Card>
        <Card>
          <CardHeader>လျာထားပြီးသူ စုစုပေါင်း</CardHeader>
          <CardContent>{statusSum.C}</CardContent>
        </Card>
        <Card>
          <CardHeader>လစ်လပ်ရာထူးများ</CardHeader>
          <CardContent className="flex justify-between items-end">
            <span>{statusSum.N}</span>
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
      {
        showStatus && (
          <div className="mb-5">
            <InactivePositionTable loading={NLoading} data={NData?.data.results} totalPages={NData?.data.totalPages} />
          </div>
        )
      }
      <Card>
        <CardHeader className="font-bold text-center">Overview Pie Charts of Positions</CardHeader>
        <div className="flex w-full justify-between">
          {pieData.map(({value, name}, index) => {
            console.log(data)
            return (
              <PieChart key={index} data={value} label={name}/>
            )
          })}
        </div>
      </Card>
    </div>
  );
};

export default Overview;
