<template>
    <v-dialog v-model="dialog" width="auto">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          color="red-darken-2"
          variant="tonal"
          class="logout-btn"
          rounded="lg"
        >
          <v-icon start>mdi-logout</v-icon>
          Logout
        </v-btn>
      </template>
  
      <v-card>
        <v-card-text class="text-center pa-6">
          <v-icon color="red-darken-2" size="64" class="mb-4">mdi-logout</v-icon>
          <h3 class="text-h5 mb-2">Ready to leave?</h3>
          <p class="text-body-1">Are you sure you want to logout?</p>
        </v-card-text>
        <v-card-actions class="justify-center pb-6">
          <v-btn variant="text" @click="dialog = false">Cancel</v-btn>
          <v-btn color="red-darken-2" @click="confirmLogout">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { auth } from '@/firebase'
  import { signOut } from 'firebase/auth'
  
  const router = useRouter()
  const dialog = ref(false)
  
  const confirmLogout = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      dialog.value = false
    }
  }
  </script>