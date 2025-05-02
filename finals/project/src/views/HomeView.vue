<template>
  <v-app>
    <Sidebar />
    
    <v-main class="bg-gray-100 pa-6">
      <v-container>
        <v-row>
          <v-col cols="12" class="d-flex align-center mb-6">
            <v-icon color="black" class="mr-3" size="40">mdi-mushroom</v-icon>
            <h1 class="text-h4 font-weight-bold text-black">Mushroom Culturing Control</h1>
          </v-col>

          <!-- Control Cards -->
          <v-col cols="12" md="4">
            <FanControl />
          </v-col>
          
          <v-col cols="12" md="4">
            <LightControl />
          </v-col>
          
          <v-col cols="12" md="4">
            <HeaterControl />
          </v-col>

          <!-- Real-time Status -->
          <v-col cols="12" md="6">
            <v-card class="custom-card pa-4">
              <v-row>
                <v-col cols="6">
                  <v-icon color="red-darken-2">mdi-thermometer</v-icon>
                  <div class="label">Temperature</div>
                  <div class="value">{{ temperature }}°C</div>
                </v-col>
                <v-col cols="6">
                  <v-icon color="red-darken-2">mdi-water-percent</v-icon>
                  <div class="label">Humidity</div>
                  <div class="value">{{ humidity }}%</div>
                </v-col>
                <v-col cols="6">
                  <v-icon color="red-darken-2">mdi-molecule-co2</v-icon>
                  <div class="label">CO₂ Level</div>
                  <div class="value">{{ co2 }} ppm</div>
                </v-col>
                <v-col cols="6">
                  <v-icon color="red-darken-2">mdi-weather-sunny</v-icon>
                  <div class="label">Light Intensity</div>
                  <div class="value">{{ lightIntensity }} lx</div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <!-- Analytics -->
          <v-col cols="12" md="6">
            <v-card class="custom-card pa-4">
              <h3 class="text-subtitle-1 mb-4 text-black">Environmental Analytics</h3>
              <LineChart :chart-data="chartData" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import FanControl from '@/components/FanControl.vue';
import LightControl from '@/components/LightControl.vue';
import HeaterControl from '@/components/HeaterControl.vue';
import LineChart from '@/components/LineChart.vue';

// Sample data - replace with real data from Firebase
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
      borderColor: '#d32f2f',
      backgroundColor: 'rgba(211, 47, 47, 0.1)',
      tension: 0.4
    },
    {
      label: 'Humidity (%)',
      data: [70, 72, 75, 74, 73, 75, 76],
      borderColor: '#424242',
      backgroundColor: 'rgba(66, 66, 66, 0.1)',
      tension: 0.4
    }
  ]
});

// Simulate data updates
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
.bg-gray-100 {
  background-color: #f5f5f5;
}

.custom-card {
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  height: 100%;
}

.label {
  font-size: 0.9rem;
  color: #666666;
  margin-top: 4px;
}

.value {
  font-size: 1.4rem;
  font-weight: bold;
  color: #212121;
}
</style>