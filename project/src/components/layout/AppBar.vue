<!-- AppBar.vue -->
<template>
  <v-app-bar app elevation="0" border>
    <v-app-bar-nav-icon 
      v-if="$route.meta.requiresAuth"
      @click="$emit('toggle-drawer')"
    />
    
    <v-toolbar-title class="d-flex align-center">
      <v-icon color="primary" class="mr-2">mdi-mushroom</v-icon>
      <span class="font-weight-bold">Mushroom Culturing</span>
    </v-toolbar-title>
    
    <v-spacer />
    
    <v-btn 
      v-if="$route.meta.requiresAuth"
      icon 
      variant="text"
      size="small"
      class="mr-2"
    >
      <v-icon>mdi-bell-outline</v-icon>
      <v-badge color="error" dot floating />
    </v-btn>
    
    <v-btn 
      v-if="$route.meta.requiresAuth"
      icon 
      variant="text"
      size="small"
      to="/settings"
    >
      <v-icon>mdi-cog-outline</v-icon>
    </v-btn>
    
    <v-menu v-if="$route.meta.requiresAuth">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          icon
          variant="text"
          size="small"
          class="ml-2"
        >
          <v-avatar size="32">
            <v-img src="https://images.app.goo.gl/NzE6jMGyivGUo53v8" />
          </v-avatar>
        </v-btn>
      </template>
      
      <v-list>
        <v-list-item
          v-for="(item, index) in profileMenu"
          :key="index"
          :value="index"
          :to="item.to"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
defineEmits(['toggle-drawer'])

const profileMenu = [
  { title: 'Profile', icon: 'mdi-account-outline', to: '/profile' },
  { title: 'Settings', icon: 'mdi-cog-outline', to: '/settings' },
  { title: 'Logout', icon: 'mdi-logout', to: '/logout' }
]
</script>