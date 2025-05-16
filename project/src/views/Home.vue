<!-- Home.vue (updated) -->
<template>
  <div class="home-container">
    <!-- Dashboard View -->
     <DashboardChart :environmentData="environmentData" />
    <div v-if="activeView === 'dashboard'">
      <v-row class="mb-4">
        <v-col cols="12">
          <div class="d-flex align-center">
            <v-avatar color="primary" size="48" class="mr-3">
              <v-icon dark>mdi-mushroom</v-icon>
            </v-avatar>
            <div>
              <h1 class="text-h5 font-weight-bold">Good {{ timeOfDay }}, User</h1>
              <p class="text-caption text-medium-emphasis">Monitor and control your mushroom cultivation</p>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Quick Stats Cards -->
      <v-row dense class="mb-4">
        <v-col v-for="(metric, index) in quickMetrics" :key="index" cols="6" sm="3">
          <v-card rounded="lg" elevation="2" :color="metric.color" dark>
            <v-card-text class="pa-3">
              <div class="d-flex align-center">
                <v-icon class="mr-2">{{ metric.icon }}</v-icon>
                <span class="text-subtitle-2">{{ metric.label }}</span>
              </div>
              <div class="text-h5 mt-2">{{ metric.value }}{{ metric.unit }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Component View -->
    <div v-else>
      <div class="content-header">
        <v-btn icon variant="text" @click="returnToDashboard" class="mr-2">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <h2 class="text-h5">{{ currentComponent?.title }}</h2>
      </div>
      
      <v-card border flat rounded="lg" class="mt-4 pa-4">
        <component :is="currentComponent.component" />
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, shallowRef, onMounted, defineExpose } from 'vue'

import { useEnvironment } from '@/composables/useEnvironment'
import FanControl from '@/views/FanControl.vue'
import HeaterControl from '@/views/HeaterControl.vue'
import LightControl from '@/views/LightControl.vue'
import Settings from '@/views/Settings.vue'
import About from '@/views/About.vue'
import DashboardChart from '@/views/DashboardChart.vue'

const { environmentData } = useEnvironment()
const activeView = ref('dashboard')
const currentComponent = ref({
  title: '',
  component: shallowRef({ template: '<div></div>' })
})

const components = {
  fan: {
    title: 'Fan Control',
    component: shallowRef(FanControl)
  },
  heater: {
    title: 'Heater Control',
    component: shallowRef(HeaterControl)
  },
  light: {
    title: 'Light Control',
    component: shallowRef(LightControl)
  },
  settings: {
    title: 'Settings',
    component: shallowRef(Settings)
  },
  about: {
    title: 'About',
    component: shallowRef(About)
  }
}

const timeOfDay = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'morning'
  if (hour < 18) return 'afternoon'
  return 'evening'
})

const quickMetrics = computed(() => [
  { 
    label: 'Temperature', 
    value: environmentData.value.temperature, 
    unit: '°C', 
    icon: 'mdi-thermometer', 
    color: 'red-darken-1' 
  },
  { 
    label: 'Humidity', 
    value: environmentData.value.humidity, 
    unit: '%', 
    icon: 'mdi-water-percent', 
    color: 'blue-darken-2' 
  },
  { 
    label: 'CO₂ Level', 
    value: environmentData.value.co2, 
    unit: 'ppm', 
    icon: 'mdi-molecule-co2', 
    color: 'green-darken-2' 
  },
  { 
    label: 'Light', 
    value: environmentData.value.lightIntensity, 
    unit: 'lx', 
    icon: 'mdi-weather-sunny', 
    color: 'amber-darken-2' 
  }
])

const selectComponent = (componentName) => {
  if (!componentName) {
    returnToDashboard()
    return
  }
  
  activeView.value = 'component'
  currentComponent.value = components[componentName]
}

const returnToDashboard = () => {
  activeView.value = 'dashboard'
  currentComponent.value = {
    title: '',
    component: shallowRef({ template: '<div></div>' })
  }
}

// Ensure components are exposed to parent
defineExpose({ selectComponent })

// Initialize with dashboard view
onMounted(() => {
  returnToDashboard()
})
</script>

<style scoped>
.home-container {
  padding: 24px;
  max-width: 1600px;
  margin: 0 auto;
}

.content-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}
</style>