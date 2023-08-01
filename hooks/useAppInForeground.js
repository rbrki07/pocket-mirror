// @ts-check
import { useState, useEffect } from 'react'
import { AppState } from 'react-native'

const useAppInForeground = () => {
  const [appInForeground, setAppInForeground] = useState(true)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (appStateStatus) =>
      setAppInForeground(appStateStatus === 'active')
    )

    return () => {
      subscription.remove()
    }
  }, [])

  return appInForeground
}

export { useAppInForeground }
