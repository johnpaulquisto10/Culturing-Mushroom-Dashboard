<template>
  <div class="login-container">
    <v-container class="fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="10" md="8" lg="6" xl="4">
          <v-card class="pa-8" elevation="0" rounded="xl" border>
            <div class="text-center mb-8">
              <v-icon color="primary" size="72">mdi-mushroom</v-icon>
              <h1 class="text-h3 mt-4 font-weight-bold">Mushroom Culturing</h1>
              <p class="text-subtitle-1 mt-2 text-medium-emphasis">
                {{ isSignUp ? 'Create an account to begin' : 'Sign in to access the control panel' }}
              </p>
            </div>

            <template v-if="!user">
              <v-btn
                block
                size="x-large"
                color="primary"
                variant="tonal"
                @click="login"
                :loading="loading"
                class="mb-4"
              >
                <v-icon left>mdi-google</v-icon>
                Continue with Google
              </v-btn>

              <v-divider class="my-4">OR</v-divider>

              <v-text-field
                v-model="email"
                label="Email"
                variant="outlined"
                type="email"
                prepend-inner-icon="mdi-email-outline"
                class="mb-4"
              />

              <v-text-field
                v-model="password"
                label="Password"
                variant="outlined"
                :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock-outline"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
                class="mb-4"
              />

              <v-btn
                block
                size="x-large"
                color="primary"
                @click="isSignUp ? signUp() : emailLogin()"
                :loading="loading"
                class="mb-2"
              >
                {{ isSignUp ? 'Sign Up' : 'Sign In' }}
              </v-btn>

              <v-btn
                block
                variant="text"
                color="grey"
                @click="isSignUp = !isSignUp"
              >
                {{ isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up" }}
              </v-btn>
            </template>

            <template v-if="user">
              <div class="text-center my-6">
                <v-avatar size="72" class="mb-4">
                  <v-img v-if="user.photoURL" :src="user.photoURL" />
                  <v-icon v-else size="72" color="primary">mdi-account-circle</v-icon>
                </v-avatar>
                <h2 class="text-h5">Welcome, {{ user.displayName || user.email }}</h2>
                <p class="text-caption text-medium-emphasis">{{ user.email }}</p>
              </div>

              <v-btn
                block
                size="x-large"
                color="primary"
                @click="goToDashboard"
                class="mt-2"
              >
                Go to Dashboard
                <v-icon right>mdi-chevron-right</v-icon>
              </v-btn>

              <v-btn
                block
                size="large"
                variant="text"
                color="grey"
                @click="logout"
                class="mt-2"
              >
                Sign out
              </v-btn>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  auth,
  provider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '../firebase'

const router = useRouter()
const user = ref(null)
const loading = ref(false)
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isSignUp = ref(false)

const login = async () => {
  try {
    loading.value = true
    const result = await signInWithPopup(auth, provider)
    user.value = result.user
    router.push('/home')
  } catch (error) {
    console.error('Login error:', error)
    alert('Google login failed. Please try again.')
  } finally {
    loading.value = false
  }
}

const emailLogin = async () => {
  try {
    loading.value = true
    const result = await signInWithEmailAndPassword(auth, email.value, password.value)
    user.value = result.user
    router.push('/home')
  } catch (error) {
    console.error('Email login error:', error)
    if (error.code === 'auth/user-not-found') {
      alert('No account found with this email. Please sign up.')
    } else if (error.code === 'auth/wrong-password') {
      alert('Incorrect password. Please try again.')
    } else {
      alert('Login failed. Please check your credentials.')
    }
  } finally {
    loading.value = false
  }
}


const signUp = async () => {
  try {
    loading.value = true
    const result = await createUserWithEmailAndPassword(auth, email.value, password.value)
    user.value = result.user
    router.push('/home')
  } catch (error) {
    console.error('Sign-up error:', error)
    if (error.code === 'auth/email-already-in-use') {
      alert('This email is already registered. Please sign in instead.')
    } else if (error.code === 'auth/weak-password') {
      alert('Password should be at least 6 characters.')
    } else {
      alert('Sign-up failed. Please try again.')
    }
  } finally {
    loading.value = false
  }
}


const logout = async () => {
  try {
    await signOut(auth)
    user.value = null
  } catch (error) {
    console.error('Logout error:', error)
  }
}

const goToDashboard = () => {
  router.push('/home')
}

onAuthStateChanged(auth, (firebaseUser) => {
  user.value = firebaseUser
  if (firebaseUser && router.currentRoute.value.path === '/') {
    router.push('/home')
  }
})
</script>
