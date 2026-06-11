<template>
  <div class="rounded-xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
    <div class="mb-6 flex items-start justify-between gap-4">
      <div>
        <h4 class="text-lg font-bold text-slate-800 dark:text-white">{{ title }}</h4>
        <p v-if="subtitle" class="mt-1 text-xs text-slate-500">{{ subtitle }}</p>
      </div>
      <div class="shrink-0 text-xs text-slate-500">Đơn vị: VNĐ</div>
    </div>

    <div class="relative" :class="heightClass">
      <Bar :data="chartData" :options="chartOptions" :plugins="[valueLabelPlugin]" />

      <div
        v-if="hasNoRevenue"
        class="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-400"
      >
        Chưa có doanh thu trong kỳ
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
  type ChartData,
  type ChartOptions,
  type Plugin,
} from 'chart.js'
import type { MonthlyRevenue } from '@/types/dashboard.types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const props = withDefaults(defineProps<{
  data: MonthlyRevenue[]
  title: string
  subtitle?: string
  monthLabelStyle?: 'short' | 'long'
  variant?: 'compact' | 'detailed'
}>(), {
  subtitle: '',
  monthLabelStyle: 'short',
  variant: 'compact',
})

const revenueValues = computed(() => props.data.map(item => item.totalAmount))
const hasNoRevenue = computed(() => revenueValues.value.every(value => value === 0))
const maxRevenue = computed(() => Math.max(...revenueValues.value, 1_000_000) * 1.2)
const heightClass = computed(() => props.variant === 'detailed' ? 'h-80' : 'h-72')

const chartData = computed<ChartData<'bar'>>(() => ({
  labels: props.data.map(item => formatMonth(item.month)),
  datasets: [
    {
      label: 'Doanh thu',
      data: revenueValues.value,
      backgroundColor: props.data.map(item => item.totalAmount > 0 ? '#963131' : 'rgba(148, 163, 184, 0.18)'),
      hoverBackgroundColor: props.data.map(item => item.totalAmount > 0 ? '#7f2727' : 'rgba(148, 163, 184, 0.24)'),
      borderRadius: 8,
      borderSkipped: false,
      maxBarThickness: props.variant === 'detailed' ? 56 : 44,
      minBarLength: 4,
    },
  ],
}))

const chartOptions = computed<ChartOptions<'bar'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 24,
      right: 8,
      left: 0,
      bottom: 0,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        color: '#94a3b8',
        font: {
          size: 12,
          weight: '700',
        },
      },
    },
    y: {
      beginAtZero: true,
      suggestedMax: maxRevenue.value,
      grid: {
        color: 'rgba(148, 163, 184, 0.2)',
        drawTicks: false,
      },
      border: {
        display: false,
      },
      ticks: {
        color: '#64748b',
        padding: 10,
        maxTicksLimit: 5,
        callback: value => formatShortCurrency(Number(value)),
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      displayColors: false,
      backgroundColor: '#1e293b',
      padding: 10,
      titleFont: {
        size: 12,
        weight: '700',
      },
      bodyFont: {
        size: 12,
      },
      callbacks: {
        label: context => `Doanh thu: ${formatFullCurrency(Number(context.parsed.y))}`,
      },
    },
  },
}))

const valueLabelPlugin: Plugin<'bar'> = {
  id: 'monthlyRevenueValueLabels',
  afterDatasetsDraw(chart) {
    const dataset = chart.data.datasets[0]
    const meta = chart.getDatasetMeta(0)
    const { ctx } = chart

    ctx.save()
    ctx.font = '700 11px Manrope, ui-sans-serif, system-ui, sans-serif'
    ctx.fillStyle = '#334155'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'

    meta.data.forEach((bar, index) => {
      const value = Number(dataset.data[index] ?? 0)
      if (value <= 0) return
      const { x, y } = bar.tooltipPosition(false)
      ctx.fillText(formatShortCurrency(value), x, Math.max(y - 6, 14))
    })

    ctx.restore()
  },
}

function formatMonth(monthStr: string) {
  const [year = '', month = monthStr] = monthStr.split('-')
  const monthNumber = Number.parseInt(month, 10)

  if (props.monthLabelStyle === 'long') {
    return `Tháng ${Number.isNaN(monthNumber) ? month : monthNumber}`
  }

  return `${month}/${year.substring(2)}`
}

function formatShortCurrency(value: number) {
  if (value >= 1_000_000_000) return `${trimNumber(value / 1_000_000_000)} tỷ`
  if (value >= 1_000_000) return `${trimNumber(value / 1_000_000)} tr`
  if (value >= 1_000) return `${trimNumber(value / 1_000)}k`
  return value.toLocaleString('vi-VN')
}

function trimNumber(value: number) {
  return Number.isInteger(value) ? value.toString() : value.toFixed(1)
}

function formatFullCurrency(value: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value)
}
</script>
