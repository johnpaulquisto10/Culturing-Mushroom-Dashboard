<template>
  <v-app>
    <AppBar @toggle-drawer="drawer = !drawer" />
    <Sidebar v-model="drawer" />
    <v-main>
      <router-view />
    </v-main>
    <MobileBottomNav />
  </v-app>
  
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppBar from '@/components/layout/AppBar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'

const route = useRoute()
const drawer = ref(null)

// Open sidebar by default on desktop
watch(() => route.meta.requiresAuth, (requiresAuth) => {
  drawer.value = requiresAuth && window.innerWidth >= 960
}, { immediate: true })
</script>
