"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Button } from "../ui/button"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

const chartConfig = {
    invest: {
      label: "invest",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

export function InvestChart({chartData}) {
  return (
    <Card className="h-[100%] w-[100%] border-0">
        <CardHeader>
            <div className="flex">
                <div>
                    <span className="font-regular text-[14px]">Past 12 month investment.</span>
                    <h1 className="font-medium text-[20px]">$ 10,000 This month</h1>
                </div>
                
                <Button className="relative ml-[50%] bg-white drop-shadow hover:text-white left-10">
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
                    
                <CartesianGrid vertical={false} />
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
