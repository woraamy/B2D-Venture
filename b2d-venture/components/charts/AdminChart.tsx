"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
    for (let i=5;i>0;i=i-1){
        const date = new Date(now.getFullYear(), now.getMonth()-i);
        const month = date.toLocaleString('en', { month: 'long' });
        months.push(month)
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

export function AdminChart({className}) {
    // dummy data have to change later
    const month = getLastSixMonth();
    console.log(month)
    const chartData = [
        { month: "January", raised: 186, profit: 80 },
        { month: "February", raised: 305, profit: 200 },
        { month: "March", raised: 237, profit: 120 },
        { month: "April", raised: 73, profit: 190 },
        { month: "May", raised: 209, profit: 130 },
        { month: "June", raised: 214, profit: 140 },
  ]
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
