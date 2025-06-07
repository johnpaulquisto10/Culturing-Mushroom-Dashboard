<!-- src/views/DataAnalytics.vue -->
<template>
  <div class="analytics-container">
    <v-row class="mb-4" align="center">
      <v-col cols="12" md="6">
        <h2 class="text-h5">Data Analytics</h2>
        <p class="text-caption text-medium-emphasis">Historical sensor data analysis</p>
      </v-col>
      <v-col cols="12" md="6">
        <v-row dense>
          <v-col cols="6">
            <v-select
              v-model="selectedMetric"
              :items="metrics"
              label="Select Metric"
              variant="outlined"
              dense
            />
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="timeRange"
              :items="timeRanges"
              label="Time Range"
              variant="outlined"
              dense
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-card rounded="lg" elevation="2" class="mb-4">
      <v-card-text>
        <div v-if="loading">Loading data...</div>
        <div v-else-if="error" class="error-text">{{ error }}</div>
        <div v-else-if="chartData.length === 0">No data available for selected range</div>
        <div v-else>
          <div class="chart-container">
            <LineChart :chart-data="chartData" :options="chartOptions" />
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- Data Table -->
    <v-card rounded="lg" elevation="2">
      <v-card-title>
        Data Log
        <v-spacer />
        <v-text-field
          v-model="search"
          append-inner-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          variant="outlined"
          class="search-field"
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="tableData"
        :search="search"
        :items-per-page="10"
        class="elevation-0"
      >
        <template v-slot:item.timestamp="{ item }">
          {{ formatTimestamp(item.timestamp) }}
        </template>
        <template v-slot:item.value="{ item }">
          {{ item.value }} {{ getUnit(selectedMetric) }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAnalytics } from '@/composables/useAnalytics'
import { LineChart } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, LinearScale, TimeScale, Filler } from 'chart.js'

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, TimeScale, Filler)

const { historicalData, loading, error, timeRange } = useAnalytics()

const selectedMetric = ref('temperature')
const search = ref('')

const metrics = [
  { text: 'Temperature', value: 'temperature' },
  { text: 'Humidity', value: 'humidity' },
  { text: 'CO₂ Level', value: 'co2' },
  { text: 'Light Intensity', value: 'lightIntensity' },
  { text: 'Pressure', value: 'pressure' }
]

const timeRanges = [
  { text: 'Last 24 hours', value: '24h' },
  { text: 'Last 7 days', value: '7d' },
  { text: 'Last 30 days', value: '30d' }
]

const headers = [
  { title: 'Timestamp', key: 'timestamp' },
  { title: 'Value', key: 'value' }
]

const chartData = computed(() => ({
  datasets: [{
    label: selectedMetric.value.charAt(0).toUpperCase() + selectedMetric.value.slice(1),
    data: historicalData.value.map(item => ({
      x: new Date(item.timestamp),
      y: item[selectedMetric.value]
    })),
    borderColor: '#1976d2',
    backgroundColor: 'rgba(25, 118, 210, 0.1)',
    fill: true,
    tension: 0.4
  }]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'time',
      time: {
        unit: timeRange.value === '24h' ? 'hour' : 'day'
      },
      title: { display: true, text: 'Time' }
    },
    y: {
      title: { 
        display: true, 
        text: `${selectedMetric.value.charAt(0).toUpperCase() + selectedMetric.value.slice(1)} (${getUnit(selectedMetric.value)})`
      }
    }
  },
  plugins: {
    legend: { display: true }
  }
}))

const tableData = computed(() => historicalData.value.map(item => ({
  timestamp: item.timestamp,
  value: item[selectedMetric.value]?.toFixed(1)
})))

const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString()
}

const getUnit = (metric) => {
  const units = {
    temperature: '°C',
    humidity: '%',
    co2: 'ppm',
    lightIntensity: 'lx',
    pressure: 'hPa'
  }
  return units[metric] || ''
}
</script>

<style scoped>
.analytics-container {
  padding: 24px;
}

.chart-container {
  height: 400px;
}

.search-field {
  max-width: 300px;
}

.error-text {
  color: red;
  text-align: center;
  padding: 20px;
}
</style>