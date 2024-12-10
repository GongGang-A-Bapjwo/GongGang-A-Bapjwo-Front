import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { GestureHandlerRootView, ScrollView, Switch } from 'react-native-gesture-handler';
import { styles } from './styles';
import MainFrame from './screens/MainFrame';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Timetable from './screens/Timetable';
import Topsection from './conponents/Topsection';
import Settings from './screens/Settings';
import Join from './screens/Join';
import Manage from './screens/Manage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainFrame" component={MainFrame} options={{ header: () => <Topsection /> }} />
        <Stack.Screen
          name="Timetable"
          component={Timetable}
          options={{
            title: '시간표'
          }}
        />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Manage" component={Manage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

