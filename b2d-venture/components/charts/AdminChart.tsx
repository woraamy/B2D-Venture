"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

function getLastSixMonth(){
    const months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i);
        const monthName = date.toLocaleString('en', { month: 'long' });
        const monthNum = date.getMonth() + 1;
        months.push({ month: monthName, monthNum });
      }
    return months
}


const chartConfig = {
    raised: {
    label: "raised",
    color: "hsl(var(--chart-1))",
  },
  profit: {
    label: "profit",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function AdminChart({className, data}) {
    // dummy data have to change later

    const months = getLastSixMonth();
    months.forEach((month, i) => {
        if (!data.some(item => item._id.month === month.monthNum)) {
          data.splice(i, 0, { _id: { year: 2024, month: month.monthNum }, raised: 0, profit: 0 });
        }
      });
    console.log(data)
    const chartData =  data.map((data,index)=>({
        month: months[index].month, 
        raised: data.raised,

        profit: data.profit,
  }));
  console.log(chartData)
  return (
    <Card className={className} >
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>
          Showing total Transaction for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent >
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
             <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              domain={[0, 'auto']}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="raised"
              type="natural"
              fill="var(--color-profit)"
              fillOpacity={0.4}
              stroke="var(--color-profit)"
              stackId="a"
            />
            <Area
              dataKey="profit"
              type="natural"
              fill="var(--color-raised)"
              fillOpacity={0.4}
              stroke="var(--color-raised)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
