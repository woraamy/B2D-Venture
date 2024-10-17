"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "An interactive pie chart"

const Data = [
  { business: "RadAi", raised: 186, fill: "var(--color-chart1)" },
  { business: "NewShop", raised: 305, fill: "var(--color-chart2)" },
  { business: "RadAi", raised: 186, fill: "var(--color-chart3)" },
  { business: "NewShop", raised: 305, fill: "var(--color-chart4)" },
  { business: "RadAi", raised: 186, fill: "var(--color-chart5)" },
  { business: "NewShop", raised: 305, fill: "var(--color-chart1)" },
]

const chartConfig = {
  business: {
    label: "business",
  },
  raised: {
    label: "raised",
  },
  chart1: {
    color: "hsl(var(--chart-1))",
  },
  chart2: {
    color: "hsl(var(--chart-2))",
  },
  chart3: {
    color: "hsl(var(--chart-3))",
  },
  chart4: {
    color: "hsl(var(--chart-4))",
  },
  chart5: {
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function OverviewChart({ chartData }) {
  const id = "pie-interactive"
  const [activeBusiness, setActiveBusiness] = React.useState(Data[0].business)

  const activeIndex = React.useMemo(
    () => chartData.findIndex((item) => item.business === activeBusiness),
    [activeBusiness]
  )
  const businesses = React.useMemo(() => chartData.map((item) => item.business), [])

  // Calculate the total raised amount
  const totalRaised = React.useMemo(
    () => chartData.reduce((sum, item) => sum + item.raised, 0),
    []
  )

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Overview Chart</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="raised"
              nameKey="business"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalRaised.toLocaleString()} {/* Display the total */}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Raised
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
