<!-- components/pages/DashboardChart.vue -->
<template>
  <v-card border flat rounded="lg" class="mt-4">
    <v-card-title class="d-flex align-center">
      <v-icon color="primary" class="mr-2">mdi-chart-line</v-icon>
      Environment Trends
      <v-spacer />
      <v-btn-toggle v-model="timeRange" mandatory density="compact">
        <v-btn value="24h">24h</v-btn>
        <v-btn value="7d">7d</v-btn>
        <v-btn value="30d">30d</v-btn>
      </v-btn-toggle>
    </v-card-title>
    <v-card-text>
      <div class="chart-container">
        <v-chart class="chart" :option="chartOptions" autoresize />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  DataZoomComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

// Initialize ECharts
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  DataZoomComponent
])

const props = defineProps({
  environmentData: {
    type: Object,
    required: true
  }
})

const timeRange = ref('24h')

// Generate chart data based on time range
const generateChartData = () => {
  const now = new Date()
  const data = {
    timestamps: [],
    temperature: [],
    humidity: [],
    co2: [],
    light: []
  }

  // Generate data points based on selected time range
  const points = timeRange.value === '24h' ? 24 : timeRange.value === '7d' ? 7 : 30
  
  for (let i = points; i >= 0; i--) {
    const time = new Date(now)
    if (timeRange.value === '24h') {
      time.setHours(now.getHours() - i)
      data.timestamps.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    } else {
      time.setDate(now.getDate() - i)
      data.timestamps.push(time.toLocaleDateString([], { month: 'short', day: 'numeric' }))
    }
    
    // Use real data when available, otherwise simulate
    data.temperature.push(props.environmentData.temperature || (25 + Math.sin(i / 2) * 3))
  data.humidity.push(props.environmentData.humidity || (70 + Math.cos(i) * 15))
data.co2.push(props.environmentData.co2 || (800 + Math.sin(i / 3) * 300))
data.light.push(props.environmentData.lightIntensity || (500 + Math.sin(i / 4) * 300))

  }

  return data
}

const chartData = ref(generateChartData())

// Watch for changes in time range or environment data
watch([timeRange, () => props.environmentData], () => {
  chartData.value = generateChartData()
}, { deep: true })

const chartOptions = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['Temperature', 'Humidity', 'CO₂', 'Light'],
    bottom: 10
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
    data: chartData.value.timestamps,
    axisLine: {
      lineStyle: {
        color: '#ccc'
      }
    }
  },
  yAxis: [
    {
      type: 'value',
      name: 'Temperature (°C)',
      position: 'left',
      axisLine: {
        lineStyle: {
          color: '#ff5252'
        }
      }
    },
    {
      type: 'value',
      name: 'Humidity (%)',
      position: 'right',
      axisLine: {
        lineStyle: {
          color: '#2196f3'
        }
      }
    },
    {
      type: 'value',
      name: 'CO₂ (ppm)',
      position: 'right',
      offset: 80,
      axisLine: {
        lineStyle: {
          color: '#4caf50'
        }
      }
    },
    {
      type: 'value',
      name: 'Light (lx)',
      position: 'right',
      offset: 160,
      axisLine: {
        lineStyle: {
          color: '#ffc107'
        }
      }
    }
  ],
  series: [
    {
      name: 'Temperature',
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 3,
        color: '#ff5252'
      },
      areaStyle: {
        color: 'rgba(255, 82, 82, 0.1)'
      },
      emphasis: {
        focus: 'series'
      },
      data: chartData.value.temperature
    },
    {
      name: 'Humidity',
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 3,
        color: '#2196f3'
      },
      areaStyle: {
        color: 'rgba(33, 150, 243, 0.1)'
      },
      emphasis: {
        focus: 'series'
      },
      yAxisIndex: 1,
      data: chartData.value.humidity
    },
    {
      name: 'CO₂',
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 3,
        color: '#4caf50'
      },
      areaStyle: {
        color: 'rgba(76, 175, 80, 0.1)'
      },
      emphasis: {
        focus: 'series'
      },
      yAxisIndex: 2,
      data: chartData.value.co2
    },
    {
      name: 'Light',
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 3,
        color: '#ffc107'
      },
      areaStyle: {
        color: 'rgba(255, 193, 7, 0.1)'
      },
      emphasis: {
        focus: 'series'
      },
      yAxisIndex: 3,
      data: chartData.value.light
    }
  ],
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 100
    },
    {
      start: 0,
      end: 100
    }
  ]
}))
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>