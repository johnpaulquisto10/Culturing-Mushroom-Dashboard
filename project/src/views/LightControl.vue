<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbs" class="px-0">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <v-card border flat rounded="lg">
      <v-card-title class="d-flex align-center">
        <v-icon color="amber" class="mr-2">mdi-lightbulb</v-icon>
        Light Control
      </v-card-title>

      <v-card-text>
        <v-switch
          v-model="lightEnabled"
          label="Light Status"
          color="amber"
          hide-details
          class="mb-4"
        ></v-switch>

        <div class="text-subtitle-1 mb-2">Brightness Level</div>
        <v-btn-toggle
          v-model="brightnessLevel"
          mandatory
          class="mb-4"
          :disabled="!lightEnabled"
        >
          <v-btn value="low" color="grey">
            <v-icon left>mdi-brightness-4</v-icon>
            Low
          </v-btn>
          <v-btn value="medium" color="yellow">
            <v-icon left>mdi-brightness-5</v-icon>
            Medium
          </v-btn>
          <v-btn value="high" color="amber">
            <v-icon left>mdi-brightness-7</v-icon>
            High
          </v-btn>
        </v-btn-toggle>

        <v-slider
          v-model="brightness"
          label="Precise Brightness Control"
          min="0"
          max="100"
          step="1"
          thumb-label
          :disabled="!lightEnabled"
          :color="levelColor"
        ></v-slider>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'

const lightEnabled = ref(false)
watch(lightEnabled, async (val) => {
  await setDoc(doc(db, 'controls', 'light'), {
    value: val
  })
})
</script>


