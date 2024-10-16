"use client"
import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
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
const chartConfig = {
  // raise: {
  //   label: "Raised",
  // },
  radai: {
    label: "RAD AI",
    color: "hsl(var(--chart-1))",
  },
  pressmanfilm: {
    label: "Pressman Film",
    color: "hsl(var(--chart-2))",
  },
  wolfpack: {
    label: "WolfPack",
    color: "hsl(var(--chart-3))",
  },
  zephyraerospace: {
    label: "Zephyr Aerospace",
    color: "hsl(var(--chart-4))",
  },
  thenewshop: {
    label: "The New Shop",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig
export  function OverviewChart({chartData}) {
  console.log(chartData)
    chartData.forEach((item,index)=>{
        const key = item.business.toLowerCase().replace(/\s+/g, '-');
        chartConfig[key] = {
            item:{
                label: item.business,
                color: `hsl(var(--chart-${index%5}))`
            }, 
        };
    }
    );
  const validChartData = Array.isArray(chartData) ? chartData : [];
  const totalRaise = React.useMemo(() => {
    return validChartData.reduce((acc, curr) => acc + curr.raised, 0);
  }, [validChartData]);
    return (
    <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
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
                            {totalRaise.toLocaleString()}
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
        <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
            Showing Portfolio's Overview
        </div>
        </CardFooter>
    </Card>
    );
};