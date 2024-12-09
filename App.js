import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { GestureHandlerRootView, ScrollView, Switch } from 'react-native-gesture-handler';
import { styles } from './styles';
import MainFrame from './screens/MainFrame';

export default function App() {
  return (
    <MainFrame />
  );
}

