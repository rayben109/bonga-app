// SpeechToTextScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native';
import { Audio } from 'expo-av';
import { Picker } from '@react-native-picker/picker';
import theme from '../constants/theme';

export default function SpeechToTextScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [recognizedText, setRecognizedText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioRecording, setAudioRecording] = useState(null);

  useEffect(() => {
    // Request audio recording permissions and set audio mode when component mounts
    prepareAudioRecording();
  }, []);

  const prepareAudioRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      const { granted } = await Audio.getPermissionsAsync();
      if (!granted) {
        alert('Permission to access microphone is required!');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS, // Corrected value
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      });
    } catch (error) {
      console.error('Failed to prepare audio recording:', error);
    }
  };

  const startRecording = async () => {
    try {
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setAudioRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      await audioRecording.stopAndUnloadAsync();
      const uri = audioRecording.getURI();
      console.log('Recording URI:', uri);

      // Here you would send the audio file to a speech recognition service
      // For demonstration purposes, let's assume we get recognized text directly
      const recognizedText = await mockSpeechToText(uri);
      setRecognizedText(recognizedText);

      setIsRecording(false);
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  // Mock function for demonstration (replace with actual speech recognition service)
  const mockSpeechToText = async (audioUri) => {
    // In a real app, you would send the audio file to a speech recognition service
    // and receive the recognized text back
    return 'Hello, this is recognized text from the speech!';
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
        style={[styles.picker, { color: theme.colors.secondary }]}>
        {['en-US', 'en-GB', 'fr-FR', 'sw-KE'].map((language) => (
          <Picker.Item key={language} label={language} value={language} />
        ))}
      </Picker>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isRecording ? theme.colors.error : theme.colors.secondary }]}
        onPress={isRecording ? stopRecording : startRecording}>
        <Text style={styles.buttonText}>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
      </TouchableOpacity>
      <Text style={styles.recognizedText}>Recognized Text: {recognizedText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surfacemixed100,
    padding: 20,
  },
  picker: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    color: theme.colors.surfacemixed200,
    textAlign: 'center',
    fontSize: 24,
  },
  recognizedText: {
    color: theme.colors.secondary,
    fontSize: 20,
    marginTop: 10,
  },
});
