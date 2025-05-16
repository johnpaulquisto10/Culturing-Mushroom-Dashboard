<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbs" class="px-0">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <v-card border flat rounded="lg">
      <v-card-title class="d-flex align-center">
        <v-icon color="red" class="mr-2">mdi-fire</v-icon>
        Heater Control
      </v-card-title>

      <v-card-text>
        <v-switch
          v-model="heaterEnabled"
          label="Heater Status"
          color="red"
          hide-details
          class="mb-4"
        ></v-switch>

        <div class="text-subtitle-1 mb-2">Heating Level</div>
        <v-btn-toggle
          v-model="heatLevel"
          mandatory
          class="mb-4"
          :disabled="!heaterEnabled"
        >
          <v-btn value="low" color="blue">
            <v-icon left>mdi-thermometer-low</v-icon>
            Low
          </v-btn>
          <v-btn value="medium" color="orange">
            <v-icon left>mdi-thermometer</v-icon>
            Medium
          </v-btn>
          <v-btn value="high" color="red">
            <v-icon left>mdi-thermometer-high</v-icon>
            High
          </v-btn>
        </v-btn-toggle>

        <v-slider
          v-model="temperature"
          label="Precise Temperature Control"
          min="15"
          max="35"
          step="0.5"
          thumb-label
          :disabled="!heaterEnabled"
          :color="levelColor"
        ></v-slider>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

const breadcrumbs = ref([
  { title: 'Dashboard', to: { name: 'Home' } },
  { title: 'Heater Control', disabled: true }
])

const heaterEnabled = ref(false)
const heatLevel = ref('medium')
const temperature = ref(24)

const levelColor = computed(() => {
  return {
    low: 'blue',
    medium: 'orange',
    high: 'red'
  }[heatLevel.value]
})
</script>