'use client';

import Link from 'next/link';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

export const description = 'A mixed bar chart';

const chartData = [
  { browser: 'chrome', pontos: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', pontos: 200, fill: 'var(--color-safari)' },
];

const chartConfig = {
  pontos: {
    label: 'Pontuação(0 a 100): ',
  },
  chrome: {
    label: 'Entrega no prazo?',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Qualidade do serviço',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function SellerRatingChart() {
  return (
    <div>
      <div className="">
        <span className="text-xs text-muted-foreground">
          Conheça o desempenho da{' '}
          <Link href={'/'} className="font-bold uppercase underline">
            SAMSUNGA
          </Link>
        </span>
        <ChartContainer config={chartConfig} className="max-h-20 w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              width={80}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="pontos" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="pontos" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
