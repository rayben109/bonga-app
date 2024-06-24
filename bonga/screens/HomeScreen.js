// WebSpeechToTextScreen.js
import React from "react"
import { View, StyleSheet } from "react-native"
import { WebView } from "react-native-webview"

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "https://rayben109.github.io/cytalk/" }}
        style={styles.webview}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: "#fff", 
  },
})

export default HomeScreen
