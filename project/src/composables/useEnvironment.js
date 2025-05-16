import { ref, onMounted } from 'vue'


import { getDatabase, ref as dbRef, onValue } from 'firebase/database'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDGMvQyALWUSR6LFjuWDJ0oVi2pjlKMu0A",
  authDomain: "vue3-88ae6.firebaseapp.com",
  projectId: "vue3-88ae6",
  databaseURL: "https://vue3-88ae6-default-rtdb.firebaseio.com",
  storageBucket: "vue3-88ae6.appspot.com",
  messagingSenderId: "305835778414",
  appId: "1:305835778414:web:384a53cc239a846fc4217f",
  measurementId: "G-BCM64D0B26"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export function useEnvironment() {
  const environmentData = ref({
    temperature: 0,
    humidity: 0,
    co2: 0,
    lightIntensity: 0
  })

  const chartData = ref({
    labels: ['6am', '9am', '12pm', '3pm', '6pm', '9pm', '12am'],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [22, 23, 24.5, 25, 24, 23, 22],
        borderColor: '#d32f2f',
        backgroundColor: 'rgba(211, 47, 47, 0.1)',
        tension: 0.4
      },
      {
        label: 'Humidity (%)',
        data: [70, 72, 75, 74, 73, 75, 76],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        tension: 0.4
      }
    ]
  })

 onMounted(() => {
    const envRef = dbRef(database, 'environment')
    onValue(envRef, (snapshot) => {
      if (snapshot.exists()) {
        environmentData.value = snapshot.val()
      }
    })
  })

  return { environmentData, chartData }
}