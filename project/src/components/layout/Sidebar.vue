<!-- src/components/layout/Sidebar.vue -->
<template>
  <v-navigation-drawer
    v-model="drawer"
    :permanent="$vuetify.display.mdAndUp"
    :temporary="$vuetify.display.smAndDown"
    location="left"
    color="surface"
    width="280"
    border
    elevation="0"
    class="sidebar"
  >
    <div class="sidebar-header pa-4">
      <v-icon color="primary" size="32" class="mr-2">mdi-mushroom</v-icon>
      <span class="text-h6 font-weight-bold">Mushroom Culturing</span>
    </div>

    <v-divider />

    <v-list density="comfortable" nav class="py-2">
      <v-list-subheader class="text-uppercase text-caption font-weight-bold text-medium-emphasis">
        Main
      </v-list-subheader>

      <v-list-item
        value="dashboard"
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        :to="{ name: 'Home' }"
        rounded="xl"
        active-class="active-nav-item"
      />
    </v-list>

    <v-divider class="my-2" />

    <v-list density="comfortable" nav class="py-2">
      <v-list-subheader class="text-uppercase text-caption font-weight-bold text-medium-emphasis">
        Controls
      </v-list-subheader>

      <v-list-item
        v-for="(item, i) in controlItems"
        :key="i"
        :value="item.value"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="{ name: item.routeName }"
        rounded="xl"
        active-class="active-nav-item"
      />
    </v-list>

    <v-divider class="my-2" />

    <v-list density="comfortable" nav class="py-2">
      <v-list-subheader class="text-uppercase text-caption font-weight-bold text-medium-emphasis">
        System
      </v-list-subheader>

      <v-list-item
        v-for="(item, i) in systemItems"
        :key="i"
        :value="item.value"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="{ name: item.routeName }"
        rounded="xl"
        active-class="active-nav-item"
      />
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn 
          variant="tonal" 
          color="error" 
          block 
          prepend-icon="mdi-logout"
          @click="logout"
        >
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from '@/firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const drawer = ref(null)

const controlItems = ref([
  { 
    title: 'Fan Control', 
    icon: 'mdi-fan', 
    value: 'fan',
    routeName: 'FanControl'
  },
  { 
    title: 'Water Control', 
    icon: 'mdi-water', 
    value: 'water',
    routeName: 'WaterControl'
  },
  { 
    title: 'Light Control', 
    icon: 'mdi-lightbulb-outline', 
    value: 'light',
    routeName: 'LightControl'
  },
])

const systemItems = ref([
  { 
    title: 'Data Analytics', 
    icon: 'mdi-chart-line', 
    value: 'analytics',
    routeName: 'DataAnalytics' // Matches route name in index.js
  },
  { 
    title: 'Settings', 
    icon: 'mdi-cog-outline', 
    value: 'settings',
    routeName: 'Settings'
  },
  { 
    title: 'About', 
    icon: 'mdi-information-outline', 
    value: 'about',
    routeName: 'About'
  },
])

const logout = async () => {
  try {
    await signOut(auth)
    router.push('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>

<style scoped>
.sidebar {
  border-right: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.sidebar-header {
  display: flex;
  align-items: center;
  height: 64px;
}

.active-nav-item {
  background: rgba(var(--v-theme-primary), 0.08);
  color: rgb(var(--v-theme-primary)) !important;
  border-left: 3px solid rgb(var(--v-theme-primary));
}

.active-nav-item :deep(.v-list-item__prepend .v-icon) {
  color: rgb(var(--v-theme-primary)) !important;
}
</style>