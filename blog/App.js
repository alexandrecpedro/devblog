import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#232630" barStyle="light-content" />
      <Routes/>
    </NavigationContainer>
  )
}