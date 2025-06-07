<template>
  <v-card border flat rounded="lg" class="mt-4">
    <v-card-title class="d-flex align-center">
      <v-icon color="primary" class="mr-2">mdi-gauge</v-icon>
      Environment Status
      <v-spacer />
      <v-btn-toggle v-model="timeRange" mandatory density="compact">
        <v-btn value="realtime">Realtime</v-btn>
        <v-btn value="24h">24h</v-btn>
      </v-btn-toggle>
    </v-card-title>
    
    <v-card-text>
      <div v-if="loading" class="text-center py-4">
        <v-progress-circular indeterminate color="primary" />
      </div>
      
      <div v-else class="gauge-container">
        <v-row>
          <v-col v-for="(gauge, index) in gaugeOptions" :key="index" cols="12" sm="6" md="4" lg="2.4">
            <div class="gauge-wrapper">
              <v-chart class="gauge" :option="gauge" autoresize />
              <div class="gauge-title">{{ gauge.title.text }}</div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GaugeChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, GaugeChart, TitleComponent, TooltipComponent])

const props = defineProps({
  environmentData: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const timeRange = ref('realtime')

// Define normal ranges for each parameter (same as alert thresholds)
const PARAMETER_RANGES = {
  temperature: { min: 18, max: 24, unit: '°C' },
  humidity: { min: 80, max: 95, unit: '%' },
  co2: { min: 400, max: 2000, unit: 'ppm' },
  pressure: { min: 950, max: 1050, unit: 'hPa' },
  lightIntensity: { min: 500, max: 2000, unit: 'lx' }
}

const gaugeOptions = computed(() => [
  createGaugeOption(
    'Temperature',
    props.environmentData.temperature,
    PARAMETER_RANGES.temperature,
    ['#ff5252', '#ff9800', '#4caf50']
  ),
  createGaugeOption(
    'Humidity',
    props.environmentData.humidity,
    PARAMETER_RANGES.humidity,
    ['#2196f3', '#00bcd4', '#4caf50']
  ),
  createGaugeOption(
    'CO₂',
    props.environmentData.co2,
    PARAMETER_RANGES.co2,
    ['#4caf50', '#ff9800', '#ff5252'] // Reversed for CO₂ (higher is worse)
  ),
  createGaugeOption(
    'Pressure',
    props.environmentData.pressure,
    PARAMETER_RANGES.pressure,
    ['#ffc107', '#ff9800', '#4caf50']
  ),
  createGaugeOption(
    'Light',
    props.environmentData.lightIntensity,
    PARAMETER_RANGES.lightIntensity,
    ['#9c27b0', '#e91e63', '#4caf50']
  )
])

function createGaugeOption(title, value, range, colors) {
  // Calculate safe range (80% of min-max range)
  const safeRange = (range.max - range.min) * 0.8
  const safeMin = range.min + (range.max - range.min - safeRange) / 2
  const safeMax = range.max - (range.max - range.min - safeRange) / 2
  
  // Extend range slightly for visualization
  const visualMin = Math.max(0, range.min - (range.max - range.min) * 0.2)
  const visualMax = range.max + (range.max - range.min) * 0.2
  
  return {
    title: {
      text: title,
      left: 'center',
      top: '70%',
      textStyle: {
        color: '#64748b',
        fontSize: 14,
        fontWeight: 'normal'
      }
    },
    tooltip: {
      formatter: `${title}: {c}${range.unit}`
    },
    series: [{
      type: 'gauge',
      min: visualMin,
      max: visualMax,
      axisLine: {
        lineStyle: {
          width: 20,
          color: [
            // Color segments for different value ranges
            [safeMin / visualMax, colors[0]],
            [safeMax / visualMax, colors[1]],
            [1, colors[2]]
          ]
        }
      },
      pointer: {
        itemStyle: {
          color: 'auto'
        }
      },
      axisTick: {
        distance: -20,
        length: 6,
        lineStyle: {
          color: '#fff',
          width: 1
        }
      },
      splitLine: {
        distance: -20,
        length: 15,
        lineStyle: {
          color: '#fff',
          width: 2
        }
      },
      axisLabel: {
        color: 'auto',
        distance: 15,
        fontSize: 10
      },
      detail: {
        valueAnimation: true,
        formatter: `{value} ${range.unit}`,
        color: 'auto',
        fontSize: 16,
        fontWeight: 'bold'
      },
      data: [{
        value: value || 0,
        name: title
      }],
      radius: '80%',
      center: ['50%', '50%']
    }]
  }
}
</script>

<style scoped>
.gauge-container {
  width: 100%;
  min-height: 300px;
}

.gauge-wrapper {
  position: relative;
  height: 240px;
  width: 100%;
}

.gauge {
  width: 100%;
  height: 100%;
}

.v-card {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  background: linear-gradient(to bottom right, #ffffff, #f8fafc);
  border: 1px solid #e2e8f0 !important;
}

.v-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

@media (max-width: 960px) {
  .gauge-wrapper {
    height: 200px;
  }
}

@media (max-width: 600px) {
  .gauge-wrapper {
    height: 180px;
  }
}
</style>