<!-- src/views/Home.vue -->
<template>
  <div class="home-container">
    <!-- Alert Notifications -->
    <v-snackbar
      v-for="(alert, index) in activeAlerts"
      :key="index"
      v-model="alert.show"
      :color="alert.color"
      :timeout="alert.timeout"
      location="top right"
      multi-line
      elevation="24"
      class="alert-notification"
    >
      <div class="d-flex align-center">
        <v-icon class="mr-3">{{ alert.icon }}</v-icon>
        <div>
          <div class="text-subtitle-2">{{ alert.title }}</div>
          <div>{{ alert.message }}</div>
        </div>
      </div>
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="alert.show = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <!-- Dashboard View -->
    <v-row class="mb-4">
      <v-col cols="12">
        <div class="d-flex align-center">
          <v-avatar color="primary" size="48" class="mr-3">
            <v-icon color="white">mdi-mushroom</v-icon> <!-- Replaced 'dark' with 'color="white"' -->
          </v-avatar>
          <div>
            <h1 class="text-h5 font-weight-bold">Good {{ timeOfDay }}, User</h1>
            <p class="text-caption text-medium-emphasis">Monitor and control your mushroom cultivation</p>
            <p v-if="environmentData.timestamp" class="text-caption text-medium-emphasis">
              Last updated: {{ formatTimestamp(environmentData.timestamp) }}
            </p>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Quick Stats Cards - Now with alert indicators -->
    <v-row dense class="mb-4">
      <v-col v-for="(metric, index) in quickMetrics" :key="index" cols="6" sm="3">
        <v-card rounded="lg" elevation="2" :color="metric.color" dark>
          <v-card-text class="pa-3">
            <div class="d-flex align-center">
              <v-icon class="mr-2">{{ metric.icon }}</v-icon>
              <span class="text-subtitle-2">{{ metric.label }}</span>
              <v-icon v-if="metric.isAlert" color="white" class="ml-auto">mdi-alert-circle</v-icon>
            </div>
            <div class="text-h5 mt-2">
              {{ metric.value || '--' }}{{ metric.unit }}
              <v-chip v-if="metric.isAlert" color="white" size="small" class="ml-2" text-color="red">
                Alert
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dashboard Chart -->
    <DashboardChart :environment-data="environmentData" :loading="loading" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useEnvironment } from '@/composables/useEnvironment'
import DashboardChart from '@/views/DashboardChart.vue'

// Normal ranges for mushroom cultivation
const NORMAL_RANGES = {
  temperature: { min: 18, max: 24 }, // °C
  humidity: { min: 80, max: 95 }, // %
  co2: { min: 800, max: 1500 }, // ppm
  lightIntensity: { min: 1000, max: 5000 }, // lux
  pressure: { min: 950, max: 1050 } // hPa
}

const { environmentData, loading, error } = useEnvironment()
const activeAlerts = ref([])
const previousAlerts = ref({})

const timeOfDay = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'morning'
  if (hour < 18) return 'afternoon'
  return 'evening'
})

const quickMetrics = computed(() => [
  {
    label: 'Temperature',
    value: environmentData.value.temperature?.toFixed(1),
    unit: '°C',
    icon: 'mdi-thermometer',
    color: checkNormal('temperature') ? 'red-darken-1' : 'red-darken-4',
    isAlert: !checkNormal('temperature')
  },
  {
    label: 'Humidity',
    value: environmentData.value.humidity?.toFixed(1),
    unit: '%',
    icon: 'mdi-water-percent',
    color: checkNormal('humidity') ? 'blue-darken-2' : 'blue-darken-4',
    isAlert: !checkNormal('humidity')
  },
  {
    label: 'CO₂ Level',
    value: environmentData.value.co2?.toFixed(0),
    unit: 'ppm',
    icon: 'mdi-molecule-co2',
    color: checkNormal('co2') ? 'green-darken-2' : 'green-darken-4',
    isAlert: !checkNormal('co2')
  },
  {
    label: 'Light',
    value: environmentData.value.lightIntensity?.toFixed(0),
    unit: 'lx',
    icon: 'mdi-weather-sunny',
    color: checkNormal('lightIntensity') ? 'amber-darken-2' : 'amber-darken-4',
    isAlert: !checkNormal('lightIntensity')
  },
  {
    label: 'Pressure',
    value: environmentData.value.pressure?.toFixed(1),
    unit: 'hPa',
    icon: 'mdi-gauge',
    color: checkNormal('pressure') ? 'deep-purple-darken-2' : 'deep-purple-darken-4',
    isAlert: !checkNormal('pressure')
  }
])

const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'No data yet'
  if (typeof timestamp.toDate === 'function') {
    return timestamp.toDate().toLocaleString()
  }
  return new Date(timestamp).toLocaleString()
}

const checkNormal = (metric) => {
  const value = environmentData.value[metric]
  if (value === undefined || value === null) return true
  
  const range = NORMAL_RANGES[metric]
  return value >= range.min && value <= range.max
}

const getAlertMessage = (metric, value) => {
  const range = NORMAL_RANGES[metric]
  if (value < range.min) {
    return `${metric} is too low (${value} ${quickMetrics.value.find(m => m.label.toLowerCase().includes(metric))?.unit || ''})`
  } else {
    return `${metric} is too high (${value} ${quickMetrics.value.find(m => m.label.toLowerCase().includes(metric))?.unit || ''})`
  }
}

const getAlertIcon = (metric) => {
  const icons = {
    temperature: 'mdi-thermometer-alert',
    humidity: 'mdi-water-alert',
    co2: 'mdi-alert-decagram',
    lightIntensity: 'mdi-lightbulb-alert',
    pressure: 'mdi-alert-box'
  }
  return icons[metric] || 'mdi-alert'
}

watch(environmentData, (newData) => {
  if (!newData) return

  const currentAlerts = {}
  
  Object.keys(NORMAL_RANGES).forEach(metric => {
    const value = newData[metric]
    if (value === undefined || value === null) return
    
    const isNormal = checkNormal(metric)
    const alertKey = `${metric}_alert`
    
    if (!isNormal) {
      currentAlerts[alertKey] = true
      
      if (!previousAlerts.value[alertKey]) {
        activeAlerts.value.push({
          show: true,
          color: 'error',
          title: `${metric.charAt(0).toUpperCase() + metric.slice(1)} Alert`,
          message: getAlertMessage(metric, value),
          icon: getAlertIcon(metric),
          timeout: 10000,
          key: alertKey
        })
      }
    }
    
    previousAlerts.value[alertKey] = !isNormal
  })
  
  activeAlerts.value = activeAlerts.value.filter(alert => 
    currentAlerts[alert.key] || alert.show
  )
}, { deep: true })
</script>

<style scoped>
.home-container {
  padding: 24px;
  max-width: 1600px;
  margin: 0 auto;
}

.v-col-sm-3 {
  flex: 0 0 20%;
  max-width: 20%;
}

@media (max-width: 960px) {
  .v-col-sm-3 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

@media (max-width: 600px) {
  .v-col-sm-3 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

.alert-notification {
  margin-top: 60px;
  margin-right: 20px;
}

.alert-notification .v-icon {
  font-size: 28px;
}
</style>