<!-- About.vue -->
<template>
  <div class="about-page">
    <v-breadcrumbs :items="breadcrumbs" class="px-0">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    
    <v-card border flat rounded="lg">
      <v-card-title class="text-center py-8">
        <v-icon color="primary" size="64" class="mr-3">mdi-mushroom</v-icon>
        <h1 class="text-h3 font-weight-bold">Mushroom Culturing Control</h1>
      </v-card-title>
      
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <div class="text-body-1 mb-6">
              This application provides comprehensive monitoring and control for mushroom cultivation environments,
              ensuring optimal growing conditions for various mushroom species.
            </div>
            
            <v-list lines="two" class="transparent">
              <v-list-subheader class="text-uppercase text-caption font-weight-bold text-medium-emphasis">
                Key Features
              </v-list-subheader>
              
              <v-list-item>
                <template v-slot:prepend>
                  <v-avatar color="green-lighten-5" size="40">
                    <v-icon color="green">mdi-thermometer</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="font-weight-medium">Precise Temperature Control</v-list-item-title>
                <v-list-item-subtitle>Maintain ideal temperature ranges for different growth stages</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-avatar color="blue-lighten-5" size="40">
                    <v-icon color="blue">mdi-water-percent</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="font-weight-medium">Humidity Management</v-list-item-title>
                <v-list-item-subtitle>Automated humidity control with real-time monitoring</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-avatar color="amber-lighten-5" size="40">
                    <v-icon color="amber">mdi-lightbulb</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="font-weight-medium">Light Scheduling</v-list-item-title>
                <v-list-item-subtitle>Customizable lighting schedules for optimal growth</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-col>
          
          <v-col cols="12" md="6">
            <v-img
              src="https://cdn.shopify.com/s/files/1/0063/5972/files/mushy_large.jpg?v=1490670018"
              aspect-ratio="1.5"
              cover
              class="rounded-lg"
            />
          </v-col>
        </v-row>
        
        <v-divider class="my-6" />
        
        <v-row>
          <v-col cols="12" md="4">
            <v-card variant="flat" border rounded="lg" class="h-100">
              <v-card-title class="d-flex align-center">
                <v-icon color="primary" class="mr-2">mdi-cellphone-information</v-icon>
                Version
              </v-card-title>
              <v-card-text>
                <div class="text-h5 mb-2">1.2.0</div>
                <div class="text-caption text-medium-emphasis">Latest version</div>
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="4">
            <v-card variant="flat" border rounded="lg" class="h-100">
              <v-card-title class="d-flex align-center">
                <v-icon color="primary" class="mr-2">mdi-calendar-clock</v-icon>
                Last Updated
              </v-card-title>
              <v-card-text>
                <div class="text-h5 mb-2">{{ new Date().toLocaleDateString() }}</div>
                <div class="text-caption text-medium-emphasis">Current date</div>
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="4">
            <v-card variant="flat" border rounded="lg" class="h-100">
              
              <v-card-text>
                <v-btn
                  color="primary"
                  variant="tonal"
                  block
                  
                >
                  
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const breadcrumbs = ref([
  { title: 'Dashboard', disabled: false, to: '/home' },
  { title: 'About', disabled: true }
])
</script>

<style scoped>
.about-page {
  max-width: 1400px;
  margin: 0 auto;
}
</style>