// @ts-check
import React from 'react'
import { WhiteBalance } from 'expo-camera'
import { PMButton } from './PMButton'
import { useDispatch, useSelector } from 'react-redux'
import { currentWhiteBalanceSelector, updateSetting } from '../store/settings'

const PMWhiteBalanceSelector = () => {
  const currentWhiteBalance = useSelector(currentWhiteBalanceSelector)?.value
  const dispatch = useDispatch()

  const whiteBalanceValues = [
    {
      value: WhiteBalance.auto,
      icon: 'ios-aperture',
    },
    {
      value: WhiteBalance.sunny,
      icon: 'sunny',
    },
    {
      value: WhiteBalance.cloudy,
      icon: 'cloudy',
    },
    {
      value: WhiteBalance.shadow,
      icon: 'ios-bulb',
    },
  ]

  return (
    <>
      {whiteBalanceValues.map((entry) => (
        <PMButton
          key={entry.value}
          onPressCallback={() => {
            dispatch(
              updateSetting({
                key: 'currentWhiteBalance',
                value: entry.value,
              })
            )
          }}
          iconName={entry.icon}
          selected={entry.value === currentWhiteBalance}
        />
      ))}
    </>
  )
}

export { PMWhiteBalanceSelector }
