import { TrendingUp } from "lucide-react"  
import { Pie, PieChart } from "recharts"  
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"  
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../components/ui/chart"  

const chartData = [  
  { level: "ပြည်နယ် နှင့် တိုင်းဒေသကြီး", count: 275, fill: "#ff0302" },  
  { level: "ခရိုင်", count: 200, fill: "#aa0302" },  
  { level: "မြို့နယ်", count: 187, fill: "#dd7302" },  
];  

const chartConfig = {  
  count: {  
    label: "count",  
  },  
  level: {  
    label: "ပြည်နယ် နှင့် တိုင်းဒေသကြီး",  
    color: "hsl(var(--chart-1))",  
  },  
  safari: {  
    label: "ခရိုင်",  
    color: "hsl(var(--chart-2))",  
  },  
  firefox: {  
    label: "မြို့နယ်",  
    color: "hsl(var(--chart-3))",  
  },  
};  

export default function Component({data, dateRange, label}) {  
    
    // Ensure that the data is correctly mapped to chartData  
    const result = chartData.map((chartItem, index) => {  
        const correspondingData = data[index] || {};  
        return {  
            ...chartItem,  
            count: correspondingData.count || 0, // Ensure count is pulled from data if available  
        };  
    });  

    return (  
        <div className="flex flex-col shadow-none">  
            <CardHeader className="items-center pb-0">  
                <CardTitle>ခန့်အပ်ခြင်းဆိုင်ရာ အချက်အလက် - Pie Chart</CardTitle>  
                <CardDescription>{dateRange}</CardDescription>  
            </CardHeader>  
            <CardContent className="flex-1 pb-0">  
                <ChartContainer  
                    config={chartConfig}  
                    className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"  
                >  
                    <PieChart>  
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />  
                        <Pie data={result} dataKey="count" label nameKey="level" />  
                    </PieChart>  
                </ChartContainer>  
            </CardContent>  
            <CardFooter className="flex-col gap-2 text-sm">  
                <div className="flex items-center gap-2 font-medium leading-none">  
                    {/* Trending up by 5.2% this month <TrendingUp className="h-4 w-4" /> */}  
                </div>  
                <div className="leading-none text-muted-foreground">  
                    {   label === 'Active Units' ? 
                        'လက်ရှိအချိန်အထိ ဒေသအလိုက် ခန့်အပ်ထားပြီးမှု စုစုပေါင်း' :
                        label === 'Inactive Units' ?
                        'လက်ရှိအချိန်အထိ ဒေသအလိုက် လျာထားပြီးမှု စုစုပေါင်း' :
                        'လက်ရှိအချိန်အထိ ဒေသအလိုက် ခန့်အပ် + လျာထားပြီးမှု စုစုပေါင်း'
                    }
                </div>  
            </CardFooter>  
        </div>  
    );  
}