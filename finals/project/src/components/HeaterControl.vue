<template>
    <v-card class="custom-card pa-4">
      <div class="d-flex align-center mb-4">
        <v-icon color="red-darken-2" size="32" class="mr-3">mdi-heat-wave</v-icon>
        <h3 class="text-h6 font-weight-bold text-black">Heater Control</h3>
      </div>
      
      <v-radio-group v-model="heaterLevel" hide-details>
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
              <v-icon class="mr-2">mdi-fire</v-icon>
              <span>Low</span>
            </div>
          </template>
        </v-radio>
        <v-radio value="medium" color="red-darken-2">
          <template v-slot:label>
            <div class="d-flex align-center">
              <v-icon class="mr-2">mdi-fire</v-icon>
              <span>Medium</span>
            </div>
          </template>
        </v-radio>
        <v-radio value="high" color="red-darken-2">
          <template v-slot:label>
            <div class="d-flex align-center">
              <v-icon class="mr-2">mdi-fire</v-icon>
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
  
  const heaterLevel = ref('off');
  const autoMode = ref(false);
  </script>