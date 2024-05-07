import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons' 
import TextToSpeechScreen from './screens/TextToSpeechScreen'
import SpeechToTextScreen from './screens/SpeechToTextScreen'
import theme from './constants/theme' 

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'Speak') {
              iconName = focused ? 'volume-high' : 'volume-high-outline'
            } else if (route.name === 'Listen') {
              iconName = focused ? 'mic' : 'mic-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: theme.colors.primary600, // Active tab color
          tabBarInactiveTintColor: theme.colors.secondary, // Inactive tab color
          tabBarStyle: {
            backgroundColor: theme.colors.surfacemixed200, // Tab bar background color
            borderTopWidth: 0,
           
          },
          headerStyle: {
            backgroundColor: theme.colors.surfacemixed200, // Header background color
            borderBottomWidth: 0, // No bottom border
            shadowColor: 'transparent', // No shadow on iOS
            elevation: 0, // No elevation (shadow) on Android
          },
          headerTintColor: theme.colors.primary600, // Header text color
          headerTitleStyle: {
            fontWeight: 'bold', // Header text font weight
          },
        })}
      >
        <Tab.Screen 
          name="Speak" 
          component={TextToSpeechScreen} 
          />
        <Tab.Screen 
          name="Listen" 
          component={SpeechToTextScreen} 
        />

      </Tab.Navigator>
    </NavigationContainer>
  )
}
