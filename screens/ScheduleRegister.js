import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { useNavigation } from '@react-navigation/native';
const ScheduleRegister = () => {
    const navigation = useNavigation();
    return (
        <View style={[styles.container]}>
            <View style={styles.table}>
                <View style={[styles.row3, styles.promiseboardcontent, { position: 'absolute', top: 10, height: 190 }]}>
                    <Text style={[styles.title, { position: 'relative', top: 20 }]}>user님,</Text>
                </View>
                <View style={[styles.row3, { position: 'absolute', top: 95, height: 30 }]}>
                    <Text style={[styles.title, {}]}>공강아밥줘에</Text>
                </View>
                <View style={[styles.row3, { position: 'absolute', top: 130, height: 30 }]}>
                    <Text style={styles.title}>오신 것을 환영합니다</Text>
                </View>
                <View style={[styles.row3, { position: 'absolute', top: 180, height: 30 }]}>
                    <Text style={[styles.title, { fontSize: 16 }]}>아래의 절차를 따라 시간표를 등록해주세요</Text>
                </View>
                <View style={{ position: 'absolute', top: 270 }}>
                    <View style={[styles.row3, { flex: 1, justifyContent: 'center' }]}>
                        <Text style={{ textAlign: 'center', fontSize: 15 }}>에브리타임을 사용하신다면</Text>
                    </View>
                    <View style={[styles.row3]}>
                        <Text style={{ fontSize: 15 }}>아래 버튼을 눌러 에브리타임 시간표를 등록할 수 있어요</Text>
                    </View>
                </View>
                <View style={[styles.row3, { width: '95%', position: 'relative', left: 10 }]}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ViewTimetable')}
                        style={{
                            backgroundColor: '#C3B87A',
                            flex: 1,
                            width: '95%',
                            position: 'absolute',
                            top: 350,
                            height: 50,
                            borderRadius: 24,
                        }}
                    >                    <View>
                            <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', position: 'relative', top: 15, color: '#FFFFFF' }}>시간표 자동등록</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ position: 'absolute', top: 440 }}>
                    <View style={[styles.row3, { justifyContent: 'center' }]}>
                        <Text>에브리타임을 사용하지 않는다면</Text>
                    </View>
                    <View style={[styles.row3]}>
                        <Text>아래 버튼을 눌러 수동으로 등록할 수 있어요</Text>
                    </View>
                </View>
                <View style={[styles.row3, { width: '95%', position: 'relative', left: 10, top: 150 }]}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ManualSchedule')}
                        style={{
                            backgroundColor: '#C3B87A',
                            flex: 1,
                            width: '95%',
                            position: 'absolute',
                            top: 350,
                            height: 50,
                            borderRadius: 24,
                        }}
                    >                    <View>
                            <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', position: 'relative', top: 15, color: '#FFFFFF' }}>시간표 수동 등록</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

export default ScheduleRegister;