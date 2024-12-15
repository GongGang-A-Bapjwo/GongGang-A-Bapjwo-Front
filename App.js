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
// import { Provider } from 'react-redux';
// import store from './redux/store';
import KakaoLogin from './screens/KakaoLogin';
import ScheduleRegister from './screens/ScheduleRegister';
import UploadPhoto from './screens/UploadPhoto';
import ChangeTimetable from './screens/ChangeTimetable';
import ViewTimetable from './screens/ViewTimetable';
import ManualSchedule from './screens/ManualSchdule';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="KakaoLogin" component={KakaoLogin} options={{ headerShown: false }} />
        <Stack.Screen name="ScheduleRegister" component={ScheduleRegister} />
        <Stack.Screen name="UploadPhoto" component={UploadPhoto} options={{ headerTitle: '시간표를 등록해주세요' }} />
        <Stack.Screen name="ViewTimetable" component={ViewTimetable} options={{ headerTitle: '이 시간표가 맞나요?' }} />
        <Stack.Screen name="ChangeTimetable" component={ChangeTimetable} options={{ headerTitle: '일정을 직접 수정해주세요' }} />
        <Stack.Screen name="ManualSchedule" component={ManualSchedule} options={{
          headerTitle: () => (
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
                아래 시간표를 터치하여
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: "center" }}>
                일정을 직접 등록해주세요!
              </Text>
            </View>
          ),
          headerTitleAlign: "center", // 헤더 타이틀 가운데 정렬
          headerStyle: {
            backgroundColor: "#FCFAF7",
          },
        }
        } />
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
  );
}

