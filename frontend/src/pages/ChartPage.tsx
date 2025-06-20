// import React from 'react'

import Sidebar from "@/components/Sidebar"
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
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useUserStore } from "@/store/user"


interface DataEntry {
  date: Date;
  revenue: boolean;
  value: number;
}

const buildCumulativeTotals = (entries: DataEntry[]) => {
  const grouped: Record<string, number> = {};

  // Group values by date
  for (const entry of entries) {
    const date = new Date(entry.date).toISOString().split("T")[0]; // YYYY-MM-DD
    grouped[date] = (grouped[date] || 0) + (entry.revenue ? entry.value : - entry.value);
  }

  // Sort by date and calculate running total
  const sortedDates = Object.keys(grouped).sort();
  const result: { date: string; total: number }[] = [];

  let runningTotal = 0;
  for (const date of sortedDates) {
    runningTotal += grouped[date];
    result.push({ date, total: runningTotal });
  }
  console.log(result)
  return result;
};

const ChartPage = () => {
  const { mainUser } = useUserStore();
  
  const totals = buildCumulativeTotals(mainUser.data);
  const firstTotal = totals[0]?.total ?? 0;
  const lastTotal = totals[totals.length - 1]?.total ?? 0;
  const date1 = totals[0]?.date ?? "";
  const date2 = totals[totals.length - 1]?.date ?? "";
  const percentageChange2 = ((lastTotal - firstTotal) / Math.abs(firstTotal)) * 100;
  const percentageChange = Math.round(percentageChange2 * 100) / 100; // Round to 2 decimal places
  const isTrendingUp = percentageChange > 0;



  const chartConfig = {
    desktop: {
      label: "Total",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig
  
  return (
    <div className="flex flex-row items-start justify-start w-full h-full">
        <Sidebar />
        <div className="flex flex-row items-start justify-start w-full h-full">
          <Card className="w-4xl mx-auto my-4">
            <CardHeader>
                <CardTitle>Area Chart</CardTitle>
                <CardDescription>
                Showing total visitors for the last 6 months
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                <AreaChart
                    accessibilityLayer
                    data={totals}
                    margin={{
                    left: 12,
                    right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                    interval={0}
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(5)}
                    />
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                    />
                    <Area
                    dataKey="total"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    />
                </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                  <div className="grid gap-2">
                      <div className={`flex items-center gap-2 leading-none font-medium ${isTrendingUp ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                      Trending {isTrendingUp ? "up" : "down"} by {isTrendingUp ? percentageChange : -percentageChange}% this interval
                      </div>
                      <div className="text-muted-foreground flex items-center gap-2 leading-none">
                      {date1} to {date2}
                      </div>
                  </div>
                </div>
            </CardFooter>
            </Card>
        </div>
    </div>
  )
}

export default ChartPage


// "use client"

// export const description = "A simple area chart"

// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ]

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "var(--chart-1)",
//   },
// } satisfies ChartConfig

// export function ChartAreaDefault() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Area Chart</CardTitle>
//         <CardDescription>
//           Showing total visitors for the last 6 months
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <AreaChart
//             accessibilityLayer
//             data={chartData}
//             margin={{
//               left: 12,
//               right: 12,
//             }}
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent indicator="line" />}
//             />
//             <Area
//               dataKey="desktop"
//               type="natural"
//               fill="var(--color-desktop)"
//               fillOpacity={0.4}
//               stroke="var(--color-desktop)"
//             />
//           </AreaChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter>
//         <div className="flex w-full items-start gap-2 text-sm">
//           <div className="grid gap-2">
//             <div className="flex items-center gap-2 leading-none font-medium">
//               Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//             </div>
//             <div className="text-muted-foreground flex items-center gap-2 leading-none">
//               January - June 2024
//             </div>
//           </div>
//         </div>
//       </CardFooter>
//     </Card>
//   )
// }
