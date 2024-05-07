import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import * as Speech from 'expo-speech'
import { Picker } from '@react-native-picker/picker'
import theme from '../constants/theme'

export default function TextToSpeechScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const [voices, setVoices] = useState([])
  const [textToSpeak, setTextToSpeak] = useState('')
  const [availableVoices, setAvailableVoices] = useState([])

  useEffect(() => {
    async function fetchVoices() {
      try {
        const allVoices = await Speech.getAvailableVoicesAsync()
        const available = {}
        allVoices.forEach((voice) => {
          if (!available[voice.language]) {
            available[voice.language] = []
          }
          available[voice.language].push(voice)
        })
        setVoices(available)
        setAvailableVoices(available['en-US']) // Select the first available voice for English initially
        setSelectedLanguage('en-US') // Select English initially
      } catch (error) {
        console.error("Error fetching voices:", error)
      }
    }
    fetchVoices()
  }, [])

  useEffect(() => {
    if (voices[selectedLanguage]) {
      setAvailableVoices(voices[selectedLanguage])
    }
  }, [selectedLanguage, voices])

  const speak = () => {
    if (!textToSpeak || !selectedLanguage) {
      alert('Please select a language and enter text to speak.')
      return
    }

    Speech.speak(textToSpeak, { language: selectedLanguage })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
          style={[styles.picker, { color: theme.colors.primary600 }]}
          itemStyle={{ 
            backgroundColor: theme.colors.surfacemixed100, 
            color: theme.colors.primary600, 
            fontSize:24
          }}
          >
            
          {Object.keys(voices).map(language => (
            <Picker.Item key={language} label={language} value={language}/>
          ))}
        </Picker>
        <TextInput
          style={[styles.textInput, { color: theme.colors.primary600 }]}
          multiline
          placeholder="Enter text here"
          placeholderTextColor={theme.colors.primary600}
          value={textToSpeak}
          onChangeText={setTextToSpeak}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={speak}>
          <Text style={styles.buttonText}>Press to hear the text</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.colors.surfacemixed100,
    padding: 20,

  },
  picker: {
    width: '100%',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: theme.colors.surfacemixed200,
    width: '100%',
    minHeight: 200,
    padding: 20,
    fontSize: 24,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: theme.colors.primary600,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '100%'
  },
  buttonText: {
    color: theme.colors.surfacemixed100,
    textAlign: 'center',
    fontSize: 24
  },
})
