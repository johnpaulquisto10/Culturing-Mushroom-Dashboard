<template>
  <v-card rounded="lg" elevation="2">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2">mdi-chart-areaspline</v-icon>
      Environment Metrics
    </v-card-title>
    
    <v-card-text>
      <v-row dense>
        <v-col v-for="(metric, index) in metrics" :key="index" cols="6" sm="3">
          <div class="metric-card pa-3" :class="metric.class">
            <div class="d-flex align-center mb-2">
              <v-icon :color="metric.color" class="mr-2">{{ metric.icon }}</v-icon>
              <span class="text-subtitle-2">{{ metric.label }}</span>
            </div>
            <div class="d-flex align-end">
              <span class="text-h5 mr-1">{{ metric.value }}</span>
              <span class="text-body-2 text-medium-emphasis">{{ metric.unit }}</span>
            </div>
            <div class="d-flex align-center mt-2">
              <v-icon :color="metric.trendColor" size="small" class="mr-1">
                {{ metric.trendIcon }}
              </v-icon>
              <span class="text-caption" :class="`text-${metric.trendColor}`">
                {{ metric.trendValue }}{{ metric.unit }}
              </span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  metrics: {
    type: Object,
    required: true
  }
})

const metrics = computed(() => [
  {
    label: 'Temperature',
    value: props.metrics.temperature?.toFixed(1) || '--',
    unit: '°C',
    icon: 'mdi-thermometer',
    color: 'red-darken-1',
    trendValue: '+0.5',
    trendIcon: 'mdi-arrow-up',
    trendColor: 'red-darken-1',
    class: 'bg-red-lighten-5'
  },
  {
    label: 'Humidity',
    value: props.metrics.humidity?.toFixed(1) || '--',
    unit: '%',
    icon: 'mdi-water-percent',
    color: 'blue-darken-2',
    trendValue: '-2',
    trendIcon: 'mdi-arrow-down',
    trendColor: 'blue-darken-2',
    class: 'bg-blue-lighten-5'
  },
  {
    label: 'CO₂ Level',
    value: props.metrics.co2?.toFixed(0) || '--',
    unit: 'ppm',
    icon: 'mdi-molecule-co2',
    color: 'green-darken-2',
    trendValue: '+50',
    trendIcon: 'mdi-arrow-up',
    trendColor: 'green-darken-2',
    class: 'bg-green-lighten-5'
  },
  {
    label: 'Light',
    value: props.metrics.lightIntensity?.toFixed(0) || '--',
    unit: 'lx',
    icon: 'mdi-weather-sunny',
    color: 'amber-darken-2',
    trendValue: '0',
    trendIcon: 'mdi-minus',
    trendColor: 'grey-darken-1',
    class: 'bg-amber-lighten-5'
  },
  {
    label: 'Pressure',
    value: props.metrics.pressure?.toFixed(1) || '--',
    unit: 'hPa',
    icon: 'mdi-gauge',
    color: 'deep-purple-darken-2',
    trendValue: '-1.2',
    trendIcon: 'mdi-arrow-down',
    trendColor: 'deep-purple-darken-2',
    class: 'bg-deep-purple-lighten-5'
  }
])
</script>

<style scoped>
.metric-card {
  border-radius: 8px;
  height: 100%;
}
</style>