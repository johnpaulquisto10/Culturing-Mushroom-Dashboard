<template>
  <div class="water-control">
    <v-card-title class="d-flex align-center">
      <v-icon color="primary" class="mr-2">mdi-water</v-icon>
      Water Control System
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-card border flat rounded="lg" class="pa-4">
            <v-card-title class="text-h6">Water Pump</v-card-title>
            <v-card-text>
              <v-switch
                v-model="waterPumpEnabled"
                color="primary"
                label="Enable Water Pump"
                hide-details
              ></v-switch>
              
              <v-slider
                v-if="waterPumpEnabled"
                v-model="waterFlowRate"
                label="Water Flow Rate"
                min="0"
                max="100"
                step="1"
                thumb-label="always"
                class="mt-4"
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="waterFlowRate"
                    type="number"
                    style="width: 70px"
                    density="compact"
                    hide-details
                    suffix="%"
                  ></v-text-field>
                </template>
              </v-slider>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card border flat rounded="lg" class="pa-4">
            <v-card-title class="text-h6">Schedule</v-card-title>
            <v-card-text>
              <v-switch
                v-model="scheduleEnabled"
                color="primary"
                label="Enable Scheduled Watering"
                hide-details
              ></v-switch>
              
              <div v-if="scheduleEnabled" class="mt-4">
                <v-select
                  v-model="selectedDays"
                  :items="days"
                  label="Watering Days"
                  multiple
                  chips
                  density="compact"
                ></v-select>
                
                <v-text-field
                  v-model="startTime"
                  label="Start Time"
                  type="time"
                  density="compact"
                  class="mt-2"
                ></v-text-field>
                
                <v-text-field
                  v-model="duration"
                  label="Duration (minutes)"
                  type="number"
                  density="compact"
                  class="mt-2"
                ></v-text-field>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'

const waterPumpEnabled = ref(false)
const waterFlowRate = ref(50)
const scheduleEnabled = ref(false)
const selectedDays = ref([])
const startTime = ref('08:00')
const duration = ref(30)

const days = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
]

// Sync switch state with Firestore
watch(waterPumpEnabled, async (val) => {
  await setDoc(doc(db, 'controls', 'water'), {
    value: val
  })
})
</script>
