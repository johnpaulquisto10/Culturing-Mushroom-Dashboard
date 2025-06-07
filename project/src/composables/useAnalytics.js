// src/composables/useAnalytics.js
import { ref, watch } from 'vue'
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore'
import { db } from '@/firebase'

export function useAnalytics() {
  const historicalData = ref([])
  const loading = ref(true)
  const error = ref(null)
  const timeRange = ref('24h')

  let unsubscribe = null

  const fetchHistoricalData = () => {
    if (!db) {
      error.value = 'Firestore not initialized'
      loading.value = false
      return
    }

    if (unsubscribe) unsubscribe()

    const colRef = collection(db, 'sensorData')
    let timeFilter

    const now = new Date()
    if (timeRange.value === '24h') {
      timeFilter = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    } else if (timeRange.value === '7d') {
      timeFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    } else {
      timeFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    }

    const q = query(
      colRef,
      where('timestamp', '>=', timeFilter),
      orderBy('timestamp', 'desc')
    )

    unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        historicalData.value = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate?.() ?? new Date()
        }))
        loading.value = false
      },
      (err) => {
        error.value = err.message
        loading.value = false
      }
    )
  }

  watch(timeRange, () => {
    loading.value = true
    fetchHistoricalData()
  }, { immediate: true })

  return { historicalData, loading, error, timeRange }
}