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


// dummy data have to change later
const chartData = [
  { month: "January", raised: 186, profit: 80 },
  { month: "February", raised: 305, profit: 200 },
  { month: "March", raised: 237, profit: 120 },
  { month: "April", raised: 73, profit: 190 },
  { month: "May", raised: 209, profit: 130 },
  { month: "June", raised: 214, profit: 140 },
]

const chartConfig = {
  desktop: {
    label: "raised",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "profit",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function AdminChart({className}) {
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
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="profit"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
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
