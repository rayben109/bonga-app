import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons' 
import TextToSpeechScreen from './screens/TextToSpeechScreen'
import SpeechToTextScreen from './screens/SpeechToTextScreen'
import theme from './constants/theme' 
import WebSpeechToTextScreen from './screens/WebSpeechToTextScreen'
import WebTextToSpeechScreen from './screens/WebTextToSpeechScreen'
import HomeScreen from './screens/HomeScreen'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === "Speak") {
              iconName = focused ? "volume-high" : "volume-high-outline"
            } else if (route.name === "Listen") {
              iconName = focused ? "mic" : "mic-outline"
            } else if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline"
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: theme.colors.secondary, // Active tab color
          tabBarInactiveTintColor: theme.colors.secondary, // Inactive tab color
          tabBarStyle: {
            backgroundColor: theme.colors.surfacemixed200, // Tab bar background color
            borderTopWidth: 0,
          },
          headerStyle: {
            backgroundColor: theme.colors.surfacemixed200, // Header background color
            borderBottomWidth: 0, // No bottom border
            shadowColor: "transparent", // No shadow on iOS
            elevation: 0, // No elevation (shadow) on Android
          },
          headerTintColor: theme.colors.secondary, // Header text color
          headerTitleStyle: {
            fontWeight: "bold", // Header text font weight
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Speak" component={WebTextToSpeechScreen} />
        <Tab.Screen name="Listen" component={WebSpeechToTextScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
