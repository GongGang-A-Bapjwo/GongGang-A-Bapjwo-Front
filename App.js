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
import { Provider } from 'react-redux';
import store from './redux/store';
import KakaoLogin from './screens/KakaoLogin';
import ScheduleRegister from './screens/ScheduleRegister';
import UploadPhoto from './screens/UploadPhoto';
import ChangeTimetable from './screens/ChangeTimetable';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="KakaoLogin" component={KakaoLogin} options={{ headerShown: false }} />
          <Stack.Screen name="ScheduleRegister" component={ScheduleRegister} />
          <Stack.Screen name="UploadPhoto" component={UploadPhoto} options={{ headerTitle: '시간표를 등록해주세요' }} />
          <Stack.Screen name="ChangeTimetable" component={ChangeTimetable} options={{ headerTitle: '이 시간표가 맞나요?' }} />
          <Stack.Screen name="MainFrame" component={MainFrame} options={{ header: () => <Topsection /> }} />
          <Stack.Screen
            name="Timetable"
            component={Timetable}
            options={{
              title: '시간표'
            }}
          />
          <Stack.Screen name="Settings" component={Settings} />
          {/* <Stack.Screen name="Manage" component={Manage} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

