import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
const ScreenLoadingComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={'dodgerblue'} size={35} />
    </View>
  )
}

export default ScreenLoadingComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})