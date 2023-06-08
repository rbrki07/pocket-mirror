// @ts-check
import React, { useCallback, useState } from 'react'
import { Button, Modal, Platform, StyleSheet, Text, View } from 'react-native'
import { useTheme } from './../hooks/useTheme'
import { PMSetting } from './PMSetting'
import { PMWhiteBalanceSelector } from './PMWhiteBalanceSelector'
// eslint-disable-next-line no-unused-vars
import typedefs from './../typedefs'

/**
 * @param {Object} params
 * @param {Boolean} params.show
 * @param {() => void} params.onClose
 *
 * @returns {Object} PMSettingModal
 */
const PMSettingModal = ({ show, onClose }) => {
  const theme = useTheme()
  const styles = themedStyles(theme)
  const [modalVisible, setModalVisible] = useState(show)

  const closeButtonOnPress = useCallback(() => {
    setModalVisible(!modalVisible)
    onClose()
  }, [setModalVisible, modalVisible, onClose])

  return (
    <Modal
      animationType={'slide'}
      presentationStyle={'pageSheet'}
      visible={show}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeadline}>
          <View style={styles.modalHeadlineLeft}>
            <Button onPress={closeButtonOnPress} title={'Schließen'} />
          </View>
          <View style={styles.modalHeadlineCenter}>
            <Text style={styles.modalHeadlineText}>{'Einstellungen'}</Text>
          </View>
          <View style={styles.modalHeadlineRight} />
        </View>
        <View style={styles.modalContent}>
          <PMSetting title={'Weißabgleich'}>
            <PMWhiteBalanceSelector />
          </PMSetting>
        </View>
      </View>
    </Modal>
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
    modalContainer: {
      backgroundColor: currentTheme.backgroundColor,
      flex: 1,
    },
    // eslint-disable-next-line react-native/no-unused-styles
    modalContent: {
      flex: 1,
      margin: 10,
    },
    // eslint-disable-next-line react-native/no-unused-styles
    modalHeadline: {
      alignItems: 'center',
      flexDirection: 'row',
      height: 55,
    },
    // eslint-disable-next-line react-native/no-unused-styles
    modalHeadlineCenter: {
      alignItems: 'center',
      flex: Platform.OS === 'ios' ? 2 : 1.5,
      justifyContent: 'center',
    },
    // eslint-disable-next-line react-native/no-unused-styles
    modalHeadlineLeft: {
      flex: 1,
      marginLeft: Platform.OS === 'ios' ? 0 : 10,
    },
    // eslint-disable-next-line react-native/no-unused-styles
    modalHeadlineRight: {
      flex: 1,
    },
    // eslint-disable-next-line react-native/no-unused-styles
    modalHeadlineText: {
      color: currentTheme.textColor,
      fontSize: 18,
    },
  })

export { PMSettingModal }
