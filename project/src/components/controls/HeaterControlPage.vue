<!-- FanControlPage.vue -->
<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs :items="breadcrumbs" class="px-0">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
        
        <v-card rounded="lg" elevation="2">
          <v-card-title class="d-flex align-center">
            <v-icon color="blue" class="mr-2">mdi-fan</v-icon>
            Heater Control
          </v-card-title>
          
          <v-card-text>
            <HeaterControl />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>

import HeaterControl from '@/views/HeaterControl.vue';

const breadcrumbs = ref([
  { title: 'Dashboard', disabled: false, to: '/home' },
  { title: 'Heater Control', disabled: true }
])
</script>