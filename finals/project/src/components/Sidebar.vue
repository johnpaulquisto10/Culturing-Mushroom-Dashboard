<template>
    <v-navigation-drawer
      app
      permanent
      color="rgba(245, 245, 245, 0.9)"
      width="240"
      class="sidebar"
    >
      <v-list nav dense>
        <!-- Mushroom Icon Header -->
        <v-list-item class="sidebar-header">
          <v-list-item-icon>
            <v-icon color="red-darken-2" size="32">mdi-mushroom</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-h6 font-weight-bold">Mushroom Control</v-list-item-title>
        </v-list-item>
  
        <!-- Navigation Items -->
        <v-list-item 
          to="/home" 
          class="sidebar-item"
          active-class="active-item"
        >
          <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        
        <v-list-item 
          to="/fan" 
          class="sidebar-item"
          active-class="active-item"
        >
          <v-list-item-icon><v-icon>mdi-fan</v-icon></v-list-item-icon>
          <v-list-item-title>Fan Control</v-list-item-title>
        </v-list-item>
        
        <v-list-item 
          to="/heater" 
          class="sidebar-item"
          active-class="active-item"
        >
          <v-list-item-icon><v-icon>mdi-fire</v-icon></v-list-item-icon>
          <v-list-item-title>Heater Control</v-list-item-title>
        </v-list-item>
        
        <v-list-item 
          to="/light" 
          class="sidebar-item"
          active-class="active-item"
        >
          <v-list-item-icon><v-icon>mdi-lightbulb</v-icon></v-list-item-icon>
          <v-list-item-title>Light Control</v-list-item-title>
        </v-list-item>
      </v-list>
  
      <!-- Logout Button at Bottom -->
      <div class="logout-container">
        <v-divider></v-divider>
        <LogoutButton />
      </div>
    </v-navigation-drawer>
  </template>
  
  <script setup>
  import LogoutButton from '@/components/LogoutButton.vue'
  </script>
  
  <style scoped>
  .sidebar {
    backdrop-filter: blur(5px);
    border-right: 1px solid rgba(0, 0, 0, 0.1) !important;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .sidebar-header {
    margin-bottom: 16px;
    pointer-events: none;
  }
  
  .sidebar-item {
    margin: 4px 8px;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  .sidebar-item:hover {
    background-color: rgba(211, 47, 47, 0.1);
  }
  
  .sidebar-item .v-icon {
    color: #424242;
  }
  
  .active-item {
    background-color: rgba(211, 47, 47, 0.15) !important;
  }
  
  .active-item .v-icon {
    color: #d32f2f !important;
  }
  
  .logout-container {
    margin-top: auto;
    padding: 16px;
  }
  
  @media (max-width: 960px) {
    .sidebar {
      width: 200px !important;
    }
  }
  
  @media (max-width: 600px) {
    .sidebar {
      width: 72px !important;
    }
    
    .v-list-item__title {
      display: none;
    }
    
    .sidebar-header {
      justify-content: center;
    }
    
    .sidebar-header .v-list-item__title {
      display: none;
    }
    
    .logout-container {
      padding: 8px !important;
    }
  }
  </style>