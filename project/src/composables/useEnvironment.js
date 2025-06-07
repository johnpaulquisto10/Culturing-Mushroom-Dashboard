// src/composables/useEnvironment.js
import { ref, onMounted, onUnmounted } from 'vue'
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore'
import { db } from '@/firebase'

export function useEnvironment() {
  const environmentData = ref({
    temperature: null,
    humidity: null,
    co2: null,
    lightIntensity: null,
    pressure: null,
    timestamp: null
  })

  const loading = ref(true)
  const error = ref(null)

  let unsubscribe = null

  onMounted(() => {
    if (!db) {
      error.value = 'Firestore not initialized'
      loading.value = false
      return
    }

    const colRef = collection(db, 'sensorData')
    const q = query(colRef, orderBy('timestamp', 'desc'), limit(1))

    unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0]
          const data = doc.data()

          environmentData.value = {
            temperature: data.temperature ?? 0,
            humidity: data.humidity ?? 0,
            co2: data.co2 ?? 0,
            lightIntensity: data.lightIntensity ?? 0,
            pressure: data.pressure ?? 0,
            timestamp: data.timestamp?.toDate?.() ?? new Date()
          }
        } else {
          error.value = 'No sensor data available'
        }
        loading.value = false
      },
      (err) => {
        error.value = err.message
        loading.value = false
      }
    )
  })

  onUnmounted(() => {
    if (unsubscribe) unsubscribe()
  })

  return { environmentData, loading, error }
}