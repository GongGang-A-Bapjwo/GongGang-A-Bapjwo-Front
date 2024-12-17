import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainFrame from './screens/MainFrame';
import KakaoLogin from './screens/KakaoLogin';
import ScheduleRegister from './screens/ScheduleRegister';
import UploadPhoto from './screens/UploadPhoto';
import ViewTimetable from './screens/ViewTimetable';
import ChangeTimetable from './screens/ChangeTimetable';
import ManualSchedule from './screens/ManualSchdule';
import Timetable from './screens/Timetable';
import Settings from './screens/Settings';

// 최신 react-query 패키지에서 가져오기
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Topsection from './conponents/Topsection';

const Stack = createStackNavigator();
// const queryClient = new QueryClient();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const hasFreeTime = true;
    setIsAuthenticated(hasFreeTime);
  }, []);

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    // <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="MainFrame"
              component={MainFrame}
              options={{ header: () => <Topsection /> }}
            />
            <Stack.Screen
              name="Timetable"
              component={Timetable}
              options={{
                title: '시간표',
                headerStyle: { backgroundColor: '#FCFAF7' },
              }}
            />
            <Stack.Screen name="Settings" component={Settings} />

          </>
        ) : (
          <>
            <Stack.Screen
              name="KakaoLogin"
              component={KakaoLogin}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="ScheduleRegister" component={ScheduleRegister} optioons={{}} />
            <Stack.Screen
              name="UploadPhoto"
              component={UploadPhoto}
              options={{ headerTitle: '시간표를 등록해주세요' }}
            />
            <Stack.Screen
              name="ViewTimetable"
              component={ViewTimetable}
              options={{ headerTitle: '이 시간표가 맞나요?' }}
            />
            <Stack.Screen
              name="ChangeTimetable"
              component={ChangeTimetable}
              options={{ headerTitle: '일정을 직접 수정해주세요' }}
            />
            <Stack.Screen
              name="ManualSchedule"
              component={ManualSchedule}
              options={{
                headerTitle: () => (
                  <View style={{ alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      아래 시간표를 터치하여
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        textAlign: 'center',
                      }}
                    >
                      공강을 직접 등록해주세요!
                    </Text>
                  </View>
                ),
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#FCFAF7' },
              }}
            />
            <Stack.Screen
              name="MainFrame"
              component={MainFrame}
              options={{ header: () => <Topsection /> }}
            />
            <Stack.Screen
              name="Timetable"
              component={Timetable}
              options={{ title: '시간표' }}
            />
            <Stack.Screen name="Settings" component={Settings} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    // </QueryClientProvider>
  );
}
