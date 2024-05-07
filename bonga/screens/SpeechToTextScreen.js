import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import Voice from '@react-native-community/voice';

export default function SpeechToTextScreen({ navigation }) {
  const [transcription, setTranscription] = useState('');

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startSpeechToText = async () => {
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error('Speech recognition error', error);
    }
  };

  const onSpeechResults = (event) => {
    setTranscription(event.value[0]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.transcription}>Transcription: {transcription}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Start Speech to Text" onPress={startSpeechToText} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  transcription: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});
