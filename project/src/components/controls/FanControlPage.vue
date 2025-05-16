<!-- FanControlPage.vue -->
<template>
  <div class="control-page">
    <v-breadcrumbs :items="breadcrumbs" class="px-0">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    
    <v-card border flat rounded="lg">
      <v-card-title class="d-flex align-center">
        <v-avatar color="blue" variant="tonal" size="40" class="mr-3">
          <v-icon>mdi-fan</v-icon>
        </v-avatar>
        <span class="text-h5">Fan Control</span>
        <v-spacer />
        <v-btn variant="tonal" color="primary" prepend-icon="mdi-cog">Settings</v-btn>
      </v-card-title>
      
      <v-divider />
      
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <FanControl />
          </v-col>
          <v-col cols="12" md="6">
            <v-card border flat rounded="lg" class="h-100">
              <v-card-title>Fan Schedule</v-card-title>
              <v-card-text>
                <!-- Schedule visualization would go here -->
                <div class="text-center py-8 text-medium-emphasis">
                  <v-icon size="64" color="grey-lighten-1">mdi-timetable</v-icon>
                  <div class="text-h6 mt-2">Schedule Visualization</div>
                  <div class="text-caption">Fan operation schedule would be displayed here</div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    
    <v-card border flat rounded="lg" class="mt-4">
      <v-card-title>Fan Performance</v-card-title>
      <v-card-text>
        <AnalyticsChart :chart-data="fanPerformanceData" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import FanControl from '@/views/FanControl.vue'
import AnalyticsChart from '@/components/dashboard/AnalyticsChart.vue'
import { ref } from 'vue'

const breadcrumbs = ref([
  { title: 'Dashboard', disabled: false, to: '/home' },
  { title: 'Fan Control', disabled: true }
])

// Mock data for fan performance
const fanPerformanceData = ref({
  labels: ['12AM', '3AM', '6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
  datasets: [
    {
      label: 'Fan Speed',
      data: [30, 25, 40, 60, 75, 80, 65, 50],
      borderColor: '#2196F3',
      backgroundColor: 'rgba(33, 150, 243, 0.1)'
    }
  ]
})
</script>

<style scoped>
.control-page {
  max-width: 1400px;
  margin: 0 auto;
}
</style>