<template>
    <v-card class="custom-card pa-4">
      <div class="d-flex align-center mb-4">
        <v-icon color="red-darken-2" size="32" class="mr-3">mdi-fan</v-icon>
        <h3 class="text-h6 font-weight-bold text-black">Fan Control</h3>
      </div>
      
      <v-radio-group v-model="fanSpeed" hide-details>
        <v-radio value="off" color="grey">
          <template v-slot:label>
            <div class="d-flex align-center">
              <v-icon class="mr-2">mdi-power</v-icon>
              <span>Off</span>
            </div>
          </template>
        </v-radio>
        <v-radio value="low" color="red-darken-2">
          <template v-slot:label>
            <div class="d-flex align-center">
              <v-icon class="mr-2">mdi-speedometer-slow</v-icon>
              <span>Low</span>
            </div>
          </template>
        </v-radio>
        <v-radio value="medium" color="red-darken-2">
          <template v-slot:label>
            <div class="d-flex align-center">
              <v-icon class="mr-2">mdi-speedometer-medium</v-icon>
              <span>Medium</span>
            </div>
          </template>
        </v-radio>
        <v-radio value="high" color="red-darken-2">
          <template v-slot:label>
            <div class="d-flex align-center">
              <v-icon class="mr-2">mdi-speedometer</v-icon>
              <span>High</span>
            </div>
          </template>
        </v-radio>
      </v-radio-group>
      
      <v-switch
        v-model="autoMode"
        label="Auto Mode"
        color="red-darken-2"
        class="mt-4"
      />
    </v-card>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const fanSpeed = ref('off');
  const autoMode = ref(false);
  </script>