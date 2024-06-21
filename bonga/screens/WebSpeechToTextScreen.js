// WebSpeechToTextScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WebSpeechToTextScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://rayben109.github.io/cytalk/listen.html' }}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: '#fff', // Adjust as per your app's theme
  },
});

export default WebSpeechToTextScreen;
