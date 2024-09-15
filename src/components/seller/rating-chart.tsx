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

const chartConfig = {
  pontos: {
    label: 'Pontuação(1 a 5): ',
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

interface SellerRatingChart {
  quality: number;
  delivery_time: number;
  quantity: number;
  company_name: string;
}
export function SellerRatingChart({
  quality,
  delivery_time,
  quantity,
  company_name,
}: SellerRatingChart) {
  const chartData = [
    { browser: 'chrome', pontos: quality, fill: 'var(--color-chrome)' },
    { browser: 'safari', pontos: delivery_time, fill: 'var(--color-safari)' },
  ];
  return (
    <div>
      <div className="">
        <span className="text-xs text-muted-foreground">
          Como é a{' '}
          <Link href={'/'} className="font-bold uppercase underline">
            {company_name}
          </Link>
          ?
        </span>
        <br />
        <span className="text-xs">Avaliações: ({quantity})</span>
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
            <XAxis dataKey="pontos" type="number" hide domain={[0, 5]} />
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
