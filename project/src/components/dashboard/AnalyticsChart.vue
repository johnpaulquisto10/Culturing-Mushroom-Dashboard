<template>
  <div class="analytics-chart">
    <v-chart
      class="chart"
      :option="chartOptions"
      autoresize
      v-if="chartData"
    />
    <v-skeleton-loader
      v-else
      type="image"
      class="skeleton-loader"
    />
  </div>
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { computed } from 'vue'

// Initialize ECharts components
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  }
})

const chartOptions = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: props.chartData.datasets.map(d => d.label),
    bottom: 0
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.chartData.labels,
    axisLine: {
      lineStyle: {
        color: '#ccc'
      }
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#ccc'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#f0f0f0'
      }
    }
  },
  series: props.chartData.datasets.map(dataset => ({
    name: dataset.label,
    type: 'line',
    smooth: true,
    lineStyle: {
      color: dataset.borderColor,
      width: 3
    },
    areaStyle: {
      color: dataset.backgroundColor
    },
    emphasis: {
      focus: 'series'
    },
    showSymbol: false,
    data: dataset.data
  })),
  color: ['#FF5252', '#2196F3', '#4CAF50', '#FFC107']
}))
</script>

<style scoped>
.analytics-chart {
  width: 100%;
  height: 100%;
  min-height: 300px;
}

.chart {
  width: 100%;
  height: 100%;
}

.skeleton-loader {
  width: 100%;
  height: 300px;
}
</style>