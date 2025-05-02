<template>
  <div class="login-container">
    <div class="mushroom-login-card">
      <div class="mushroom-cap">
        <div class="mushroom-spots">
          <span v-for="i in 5" :key="i" class="spot"></span>
        </div>
      </div>
      <div class="mushroom-stem"></div>
      
      <div v-if="authError" class="error-message">{{ authError }}</div>
      
      <div v-if="!user" class="login-content">
        <h1 class="login-title">Mushroom Cultivation Portal</h1>
        <p class="login-subtitle">Admin Access Required</p>
        <button @click="login" class="login-btn">
          <svg class="gmail-icon" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#EA4335"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#4285F4"/>
          </svg>
          Login with Gmail
        </button>
      </div>
      <div v-if="user && !isAdmin" class="access-denied">
        <v-icon color="red" size="60">mdi-alert-circle</v-icon>
        <h2>Access Denied</h2>
        <p>Only authorized administrators can access this system.</p>
        <button @click="logout" class="logout-btn">
          Logout
          <v-icon>mdi-logout</v-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, provider, signInWithPopup, signOut, onAuthStateChanged } from '../firebase';
import { useRouter } from 'vue-router';

// List of authorized admin emails
const ADMIN_EMAILS = [
  'admin@example.com',
  'johnpaulquisto6@gmail.com'
];

export default {
  name: 'Login',
  data() {
    return {
      user: null,
      isAdmin: false,
      authError: null
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async login() {
      try {
        const result = await signInWithPopup(auth, provider);
        this.user = result.user;
        this.checkAdminStatus();
      } catch (error) {
        console.error('Login error:', error);
        this.authError = 'Login failed. Please try again.';
      }
    },
    async logout() {
      try {
        await signOut(auth);
        this.user = null;
        this.isAdmin = false;
      } catch (error) {
        console.error('Logout error:', error);
      }
    },
    checkAdminStatus() {
      this.isAdmin = ADMIN_EMAILS.includes(this.user.email);
      if (this.isAdmin) {
        this.router.push('/home');
      }
    }
  },
  created() {
    onAuthStateChanged(auth, (firebaseUser) => {
      this.user = firebaseUser;
      if (firebaseUser) {
        this.checkAdminStatus();
      }
    });
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  background-image: radial-gradient(circle, #e0e0e0 1px, transparent 1px);
  background-size: 20px 20px;
}

.mushroom-login-card {
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 350px;
  text-align: center;
  position: relative;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

.mushroom-cap {
  width: 120px;
  height: 80px;
  background-color: #d32f2f;
  border-radius: 60px 60px 0 0;
  margin: -70px auto 0;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.mushroom-spots {
  position: absolute;
  width: 100%;
  height: 100%;
}

.spot {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  width: 12px;
  height: 12px;
}

.spot:nth-child(1) { top: 20px; left: 25px; }
.spot:nth-child(2) { top: 15px; right: 30px; }
.spot:nth-child(3) { top: 40px; left: 40px; }
.spot:nth-child(4) { top: 35px; right: 20px; }
.spot:nth-child(5) { top: 50px; right: 45px; }

.mushroom-stem {
  width: 40px;
  height: 60px;
  background-color: #424242;
  margin: 0 auto;
  border-radius: 0 0 10px 10px;
}

.login-content {
  margin-top: 30px;
}

.login-title {
  color: #212121;
  font-size: 24px;
  margin-bottom: 5px;
  font-weight: 600;
}

.login-subtitle {
  color: #757575;
  font-size: 14px;
  margin-bottom: 25px;
}

.login-btn {
  background-color: #d32f2f;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.login-btn:hover {
  background-color: #b71c1c;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.gmail-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.logout-btn {
  background-color: #424242;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto 0;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background-color: #212121;
}

.error-message {
  color: #d32f2f;
  margin: 15px 0;
  font-weight: 500;
}

.access-denied {
  margin-top: 30px;
}

.access-denied h2 {
  color: #d32f2f;
  margin: 15px 0;
}

.access-denied p {
  color: #757575;
  margin-bottom: 20px;
}
</style>