// @ts-check
import React from 'react'
import { StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native'
import { useTheme } from '../hooks/useTheme'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

const PMLottieViewCameraPermission = () => {
  const theme = useTheme()
  const styles = themedStyles(theme)

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay={true}
        colorFilters={[
          { keypath: 'Arrow 1', color: theme.textColor },
          { keypath: 'Arrow 2', color: theme.textColor },
          { keypath: 'Body', color: theme.textColor },
          { keypath: 'Lens/Head', color: theme.textColor },
          { keypath: 'Camera 1', color: theme.textColor },
          { keypath: 'Camera 2', color: theme.textColor },
        ]}
        loop={true}
        source={require('./../assets/456-selfie-camera.json')}
        style={styles.animation}
      />
    </View>
  )
}

/**
 * @param {typedefs.Theme} currentTheme
 *
 * @returns {Object}
 */
const themedStyles = (currentTheme) =>
  StyleSheet.create({
    // eslint-disable-next-line react-native/no-unused-styles
    animation: {
      backgroundColor: currentTheme.backgroundColor,
      height: 300,
      marginTop: 4,
      width: 300,
    },
    // eslint-disable-next-line react-native/no-unused-styles
    container: {
      alignItems: 'center',
      height: 120,
      justifyContent: 'center',
      margin: 8,
      overflow: 'hidden',
      width: 200,
    },
  })

export { PMLottieViewCameraPermission }
