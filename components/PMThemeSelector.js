// @ts-check
import React from 'react'
import { useColorScheme } from 'react-native'
import { PMButton } from './PMButton'
import { useDispatch, useSelector } from 'react-redux'
import { currentThemeSelector, updateSetting } from '../store/settings'

const PMThemeSelector = () => {
  const colorScheme = useColorScheme()
  const currentTheme = useSelector(currentThemeSelector)?.value
  const dispatch = useDispatch()

  return (
    <PMButton
      onPressCallback={() => {
        if (currentTheme) {
          if (currentTheme === 'light') {
            dispatch(updateSetting({ key: 'currentTheme', value: 'dark' }))
          } else {
            dispatch(updateSetting({ key: 'currentTheme', value: 'light' }))
          }
        } else if (colorScheme && ['dark', 'light'].includes(colorScheme)) {
          if (colorScheme === 'light') {
            dispatch(updateSetting({ key: 'currentTheme', value: 'dark' }))
          } else {
            dispatch(updateSetting({ key: 'currentTheme', value: 'light' }))
          }
        }
      }}
      iconName={currentTheme === 'light' ? 'moon-outline' : 'sunny-outline'}
      selected={true}
    />
  )
}

export { PMThemeSelector }
