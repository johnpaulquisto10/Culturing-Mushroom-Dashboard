<template>
  <v-container fluid class="pa-4 pa-md-6">
    <v-row class="mb-6 align-center">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold d-flex align-center">
          <v-icon color="primary" size="40" class="mr-3">mdi-mushroom</v-icon>
          Dashboard
        </h1>
      </v-col>
    </v-row>

    <v-row dense class="mb-6">
      <v-col cols="12" sm="6" md="4">
        <FanControl />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <LightControl />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <HeaterControl />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" lg="6" class="mb-4 mb-lg-0">
        <v-card class="dashboard-card pa-4">
          <v-card-title class="text-subtitle-1 font-weight-medium primary--text">
            Environment Status
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6" sm="3" class="text-center">
                <v-icon size="28" color="red darken-1">mdi-thermometer</v-icon>
                <div class="metric-label">Temperature</div>
                <div class="metric-value">{{ temperature }}°C</div>
              </v-col>
              <v-col cols="6" sm="3" class="text-center">
                <v-icon size="28" color="blue darken-2">mdi-water-percent</v-icon>
                <div class="metric-label">Humidity</div>
                <div class="metric-value">{{ humidity }}%</div>
              </v-col>
              <v-col cols="6" sm="3" class="text-center">
                <v-icon size="28" color="green darken-2">mdi-molecule-co2</v-icon>
                <div class="metric-label">CO₂ Level</div>
                <div class="metric-value">{{ co2 }} ppm</div>
              </v-col>
              <v-col cols="6" sm="3" class="text-center">
                <v-icon size="28" color="amber darken-2">mdi-weather-sunny</v-icon>
                <div class="metric-label">Light</div>
                <div class="metric-value">{{ lightIntensity }} lx</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="6">
        <v-card class="dashboard-card pa-4">
          <v-card-title class="text-subtitle-1 font-weight-medium primary--text">
            Environmental Trends
          </v-card-title>
          <v-card-text>
            <LineChart :chart-data="chartData" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FanControl from '@/components/FanControl.vue';
import LightControl from '@/components/LightControl.vue';
import HeaterControl from '@/components/HeaterControl.vue';
import LineChart from '@/components/LineChart.vue';

const temperature = ref(24.5);
const humidity = ref(75);
const co2 = ref(850);
const lightIntensity = ref(520);

const chartData = ref({
  labels: ['6am', '9am', '12pm', '3pm', '6pm', '9pm', '12am'],
  datasets: [
    {
      label: 'Temperature (°C)',
      data: [22, 23, 24.5, 25, 24, 23, 22],
      borderColor: '#e53935',
      backgroundColor: 'rgba(229, 57, 53, 0.1)',
      tension: 0.4
    },
    {
      label: 'Humidity (%)',
      data: [70, 72, 75, 74, 73, 75, 76],
      borderColor: '#1976d2',
      backgroundColor: 'rgba(25, 118, 210, 0.1)',
      tension: 0.4
    }
  ]
});

onMounted(() => {
  setInterval(() => {
    temperature.value = (24 + Math.random() * 2).toFixed(1);
    humidity.value = Math.round(70 + Math.random() * 10);
    co2.value = Math.round(800 + Math.random() * 200);
    lightIntensity.value = Math.round(500 + Math.random() * 100);
  }, 5000);
});
</script>

<style scoped>
.dashboard-card {
  border-radius: 12px;
  background: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dashboard-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
}

.metric-label {
  font-size: 0.85rem;
  color: #6b7280;
  margin-top: 4px;
}

.metric-value {
  font-size: 1.3rem;
  font-weight: 600;
  color: #111827;
}

@media (max-width: 600px) {
  .metric-value {
    font-size: 1.1rem;
  }
}
</style>