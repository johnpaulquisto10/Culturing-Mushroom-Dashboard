<template>
  <div>
    <v-btn
      color="error"
      variant="text"
      @click="logout"
      block
    >
      <v-icon left>mdi-logout</v-icon>
      Logout
    </v-btn>

    <!-- Snackbar Notification -->
    <v-snackbar v-model="showSnackbar" color="success" timeout="3000">
      Successfully logged out!
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { signOut } from '../firebase'
import { useRouter } from 'vue-router'

const router = useRouter()
const showSnackbar = ref(false)

const logout = async () => {
  try {
    await signOut()
    showSnackbar.value = true
    setTimeout(() => {
      router.push('/')
    }, 1000) // delay to allow the user to see the message
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>
