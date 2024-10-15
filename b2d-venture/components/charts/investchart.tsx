"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Button } from "@/components/ui/button"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

function getLastTwelthMonth(){
  const months = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i);
      const monthName = date.toLocaleString('en', { month: 'long' });
      const monthNum = date.getMonth() + 1;
      months.push({ month: monthName, monthNum });
    }
  return months
}

const chartConfig = {
    invest: {
      label: "invest",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

export function InvestChart({data}) {
  const months = getLastTwelthMonth();
  
  months.forEach((month, i) => {
      if (!data.some(item => item._id.month === month.monthNum)) {
        data.splice(i, 0, { _id: { year: 2024, month: month.monthNum }, raised: 0});
      }
    });
  console.log(data)
  const chartData =  data.map((data,index)=>({
      month: months[index].month, 
      invest: data.raised,
  }));
  return (
    <Card className="h-[100%] w-[100%] border-0">
        <CardHeader>
            <div className="flex">
                <div>
                    <span className="font-regular text-[14px]">Past 12 month investment.</span>
                    {/* <h1 className="font-medium text-[20px]">$ {data[data.length - 1]} This month</h1> */}
                </div>
                
                <Button className="relative ml-[50%] drop-shadow hover:text-white left-10">
                            View Report
                </Button>
            </div>
            <CardDescription>Invest from last 12 month Jan-Dec, 2024</CardDescription>
            
        </CardHeader>
        <CardContent>
            <ChartContainer  className="shadow-none h-[20vh] w-[45vw]" config={chartConfig}>
            <BarChart accessibilityLayer data={chartData} 
                barSize={10}
                >
                    
                <CartesianGrid vertical={false} />\
                <ChartTooltip
                  cursor={false}
                  
                  content={<ChartTooltipContent indicator="dot" />}
                  />
                <ChartTooltip
                content={
                    <ChartTooltipContent
                    className="w-[150px] bg-white"
                    hideLabel={false}
                    
                    />
                }
                />
                <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                />
                <Bar dataKey="invest" fill="var(--color-invest)" radius={2} />
            </BarChart>
            </ChartContainer>
        </CardContent>
    </Card>
  )
}
