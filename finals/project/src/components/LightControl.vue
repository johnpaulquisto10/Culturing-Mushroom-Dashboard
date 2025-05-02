<template>
    <v-card class="custom-card pa-4">
      <div class="d-flex align-center mb-4">
        <v-icon color="red-darken-2" size="32" class="mr-3">mdi-lightbulb</v-icon>
        <h3 class="text-h6 font-weight-bold text-black">Light Control</h3>
      </div>
      
      <v-radio-group v-model="lightIntensity" hide-details>
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
              <v-icon class="mr-2">mdi-brightness-4</v-icon>
              <span>Low</span>
            </div>
          </template>
        </v-radio>
        <v-radio value="medium" color="red-darken-2">
          <template v-slot:label>
            <div class="d-flex align-center">
              <v-icon class="mr-2">mdi-brightness-5</v-icon>
              <span>Medium</span>
            </div>
          </template>
        </v-radio>
        <v-radio value="high" color="red-darken-2">
          <template v-slot:label>
            <div class="d-flex align-center">
              <v-icon class="mr-2">mdi-brightness-7</v-icon>
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
  
  const lightIntensity = ref('off');
  const autoMode = ref(false);
  </script>