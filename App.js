import { useEffect, useState } from 'react';
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
import Topsection from './conponents/Topsection';
import Settings from './screens/Settings';

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // 초기 상태를 null로 설정

  useEffect(() => {
    const hasfreetime = true;

    // isAuthenticated 상태 업데이트
    setIsAuthenticated(hasfreetime);
  }, []);

  if (isAuthenticated === null) {
    // 상태가 아직 업데이트되지 않았을 때 로딩 화면 표시
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="MainFrame"
              component={MainFrame}
              options={{ header: () => <Topsection /> }}
            />
            <Stack.Screen name="ScheduleRegister" component={ScheduleRegister} />
            <Stack.Screen name="UploadPhoto" component={UploadPhoto} options={{ headerTitle: '시간표를 등록해주세요' }} />
            <Stack.Screen name="ViewTimetable" component={ViewTimetable} options={{ headerTitle: '이 시간표가 맞나요?' }} />
            <Stack.Screen name="ChangeTimetable" component={ChangeTimetable} options={{ headerTitle: '일정을 직접 수정해주세요' }} />
            <Stack.Screen
              name="ManualSchedule"
              component={ManualSchedule}
              options={{
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
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: "#FCFAF7" },
              }}
            />
            <Stack.Screen
              name="Timetable"
              component={Timetable}
              options={{ title: '시간표' }}
            />
            <Stack.Screen name="Settings" component={Settings} />
          </>
        ) : (
          <Stack.Screen name="KakaoLogin" component={KakaoLogin} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
