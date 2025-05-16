<!-- Settings.vue -->
<template>
  <div class="settings-page">
    <v-breadcrumbs :items="breadcrumbs" class="px-0">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    
    <v-card border flat rounded="lg">
      <v-tabs v-model="tab" color="primary">
        <v-tab value="general">
          <v-icon start>mdi-cog-outline</v-icon>
          General
        </v-tab>
        <v-tab value="notifications">
          <v-icon start>mdi-bell-outline</v-icon>
          Notifications
        </v-tab>
        <v-tab value="account">
          <v-icon start>mdi-account-outline</v-icon>
          Account
        </v-tab>
      </v-tabs>
      
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="general">
            <v-card variant="flat">
              <v-card-title>General Settings</v-card-title>
              <v-card-text>
                <v-select
                  label="Theme"
                  :items="['System', 'Light', 'Dark']"
                  variant="outlined"
                />
                
                <v-select
                  label="Language"
                  :items="['English', 'Spanish', 'French']"
                  variant="outlined"
                />
                
                <v-switch
                  v-model="autoUpdate"
                  label="Automatic updates"
                  color="primary"
                />
              </v-card-text>
            </v-card>
          </v-window-item>
          
          <v-window-item value="notifications">
            <v-card variant="flat">
              <v-card-title>Notification Settings</v-card-title>
              <v-card-text>
                <v-switch
                  v-model="emailNotifications"
                  label="Email notifications"
                  color="primary"
                />
                
                <v-switch
                  v-model="pushNotifications"
                  label="Push notifications"
                  color="primary"
                />
                
                <v-switch
                  v-model="alerts"
                  label="Critical alerts"
                  color="primary"
                />
              </v-card-text>
            </v-card>
          </v-window-item>
          
          <v-window-item value="account">
            <v-card variant="flat">
              <v-card-title>Account Settings</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="name"
                  label="Name"
                  variant="outlined"
                />
                
                <v-text-field
                  v-model="email"
                  label="Email"
                  variant="outlined"
                  type="email"
                />
                
                <v-btn
                  color="primary"
                  variant="tonal"
                  class="mt-4"
                >
                  Save Changes
                </v-btn>
                
                <v-divider class="my-6" />
                
                
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const breadcrumbs = ref([
  { title: 'Dashboard', disabled: false, to: '/home' },
  { title: 'Settings', disabled: true }
])

const tab = ref('general')
const autoUpdate = ref(true)
const emailNotifications = ref(true)
const pushNotifications = ref(false)
const alerts = ref(true)
const name = ref('')
const email = ref('')
</script>

<style scoped>
.settings-page {
  max-width: 1200px;
  margin: 0 auto;
}
</style>