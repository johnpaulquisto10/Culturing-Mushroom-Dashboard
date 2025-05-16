<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbs" class="px-0">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <v-card border flat rounded="lg">
      <v-card-title class="d-flex align-center">
        <v-icon color="blue" class="mr-2">mdi-fan</v-icon>
        Fan Control
      </v-card-title>

      <v-card-text>
        <v-switch
          v-model="fanEnabled"
          label="Fan Status"
          color="blue"
          hide-details
          class="mb-4"
        ></v-switch>

        <div class="text-subtitle-1 mb-2">Fan Speed Level</div>
        <v-btn-toggle
          v-model="fanLevel"
          mandatory
          class="mb-4"
          :disabled="!fanEnabled"
        >
          <v-btn value="low" color="green">
            <v-icon left>mdi-speedometer-slow</v-icon>
            Low
          </v-btn>
          <v-btn value="medium" color="yellow">
            <v-icon left>mdi-speedometer-medium</v-icon>
            Medium
          </v-btn>
          <v-btn value="high" color="red">
            <v-icon left>mdi-speedometer</v-icon>
            High
          </v-btn>
        </v-btn-toggle>

        <v-slider
          v-model="fanSpeed"
          label="Precise Speed Control"
          min="0"
          max="100"
          step="1"
          thumb-label
          :disabled="!fanEnabled"
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
  { title: 'Fan Control', disabled: true }
])

const fanEnabled = ref(false)
const fanLevel = ref('medium')
const fanSpeed = ref(50)

const levelColor = computed(() => {
  return {
    low: 'green',
    medium: 'yellow',
    high: 'red'
  }[fanLevel.value]
})
</script>