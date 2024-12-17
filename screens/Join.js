import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import axios from 'axios';
import { styles } from '../styles';

const Join = ({ onSelectManage, onSelectMakeParty }) => {
    const [group, setGroup] = useState([]);
    const [membersCount, setMembersCount] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [text, setText] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isToastVisible, setIsToastVisible] = useState(false);
    const [realroomId, setRealroomId] = useState(0);
    const [date, setDate] = useState({ weekday: '', startTime: '', endTime: '' });

    const token = "eyJhbGciOiJIUzM4NCJ9.eyJtZW1iZXJJZCI6MSwiZXhwIjoxNzM1MDMyNzQ5LCJyb2xlIjoiUk9MRV9NRU1CRVIifQ.31c9kDajutIKXfs9JDS7AKpVSkZu0Yo6S9tUL5ibkgvFu2mzYpGvizD094Yyuqdw";
    // const token = "eyJhbGciOiJIUzM4NCJ9.eyJtZW1iZXJJZCI6MTQsImV4cCI6MTczNTAyMTU0Mywicm9sZSI6IlJPTEVfTUVNQkVSIn0.6zBS-LJLspGeeI02asfO9tDrv_fN65EMSvOtofTL3trRm2u5MjH-AT2Ok5Vhtob4";
    const url1 = "http://129.154.55.198:80/api/appointment";
    const url2Base = "http://129.154.55.198:80/api/appointment/remaining-count/";

    const inputRef = useRef(null);
    const scrollViewRef = useRef(null);

    const categoryMapping = {
        STUDY: '스터디',
        EAT: '밥약',
        COUNCELING: '상담',
        ETC: '기타',
    };

    const weekdayMapping = {
        "MONDAY": '월',
        "TUESDAY": '화',
        "WEDNESDAY": '수',
        "THURSDAY": '목',
        "FRIDAY": '금',
    };

    const convertTo12HourFormat = (timeString) => {
        // 시간만 추출
        const hour = parseInt(timeString.split(':')[0], 10);

        // AM/PM 결정
        const period = hour >= 12 ? 'PM' : 'AM';

        // 12시간제 변환
        const formattedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;

        // 결과 반환
        return `${formattedHour} : 00 ${period}`;
    };

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        setIsInputFocused(true);
        // console.log('Current scrollY:', scrollY);

        setTimeout(() => {
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({
                    y: scrollViewRef.current + 60,
                    animated: true,
                });
            }
        }, 50); // 레이아웃 완료를 기다리기 위해 50ms 지연
    };

    const handleBlur = () => {
        setIsInputFocused(false);
    };

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setLoading(true);

                const response = await axios.get(url1, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const appointments = response.data;
                console.log('Appointments:', appointments);

                const membersPromises = appointments.map(async (appt) => {
                    const roomId = appt.id;
                    console.log('Fetching members for roomId:', roomId);
                    console.log("Type of roomId:", typeof roomId);
                    var weekday = appt.decidedWeekday; // 요일                         
                    var startTime = appt.decidedStartTime;
                    var endTime = appt.decidedEndTime;
                    const koreanWeekday = weekdayMapping[weekday] || weekday; // 매핑 적용
                    const startmapping = convertTo12HourFormat(startTime);
                    const endmapping = convertTo12HourFormat(endTime);

                    setDate({
                        weekday: koreanWeekday,
                        startTime: startmapping,
                        endTime: endmapping,
                    })
                    console.log('Date:', date);

                    try {
                        const membersResponse = await axios.get(`${url2Base}${roomId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        return { roomId, count: membersResponse.data };
                    } catch (err) {
                        console.error(`Failed to fetch members for roomId: ${roomId}`, err);
                        return { roomId, count: { remaining: 0, total: 0 } };
                    }
                });

                const membersData = await Promise.all(membersPromises);

                const membersCountMap = {};
                membersData.forEach(({ roomId, count }) => {
                    membersCountMap[roomId] = count;
                });

                setGroup(appointments);
                setMembersCount(membersCountMap);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const handleSubmit = () => {
        if (!text || !text.trim()) {
            Alert.alert('경고', '입장코드를 입력해주세요.', [
                { text: '확인', onPress: () => inputRef.current?.focus() },
            ]);
        } else {
            Toast.show({
                type: 'custom',
                text1: '이 공강팟에 참여하시겠습니까?',
                text2: `참여 코드가 ${text}인 공강팟에 참여합니다`,
                autoHide: false,
                props: {
                    onConfirm: async () => {
                        try {
                            // 서버로 데이터 전송
                            const response = await axios.post(
                                `${url1}/entrance`,
                                { entranceCode: String(text) }, // 요청 본문을 문자열로 강제 변환
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                        'Content-Type': 'application/json',
                                    },
                                }
                            );
                            // console.log('Server response:', response.data);

                            // 성공 알림
                            Alert.alert('성공', '공강팟에 성공적으로 참여했습니다!');
                            Toast.hide();
                        } catch (error) {
                            console.error('Error during POST request:', error.response?.data || error.message);
                            Alert.alert('오류', '공강팟 참여 중 오류가 발생했습니다.');
                        }
                    },
                    onCancel: () => {
                        Toast.hide(); // Toast 닫기
                    },
                },
            });
        }
    };


    const ExitToast = (roomId) => {
        console.log("roomid type :", typeof roomId);
        Toast.show({
            type: 'custom',
            text1: '이 공강팟을 떠나실 건가요?',
            text2: '아래에서 선택해주세요',
            autoHide: false,
            props: {
                onConfirm: async () => {
                    try {
                        // roomId가 숫자 형태인지 확인
                        if (!/^\d+$/.test(roomId)) {
                            console.error("Invalid roomId format:", roomId);
                            Alert.alert("오류", "유효하지 않은 roomId입니다.");
                            return;
                        }

                        const bigIntRoomId = BigInt(roomId);
                        const url = `${url1}/${bigIntRoomId}`;
                        // console.log("Final DELETE URL:", url);

                        // DELETE 요청
                        const response = await axios.delete(url, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });

                        // console.log("Delete Response:", response.data);

                        Toast.hide();
                        setGroup((prevGroup) => prevGroup.filter((group) => group.id !== roomId));
                    } catch (error) {
                        console.error("Error during DELETE request:", error.response?.data || error.message);
                        if (error.response?.status === 500) {
                            Alert.alert("오류", "서버에서 요청을 처리하는 중 문제가 발생했습니다.");
                        } else if (error.response?.status === 404) {
                            Alert.alert("오류", "삭제하려는 공강팟을 찾을 수 없습니다.");
                        } else {
                            Alert.alert("오류", "공강팟을 떠나는 데 실패했습니다.");
                        }
                    }
                },
                onCancel: () => Toast.hide(),
            },
        });
    };



    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error fetching data</Text>;

    return (
        <View style={[styles.container, { height: isInputFocused ? 550 + (group.length * 100) : 500 + (group.length * 100), positon: 'relative' }]}>
            <View style={styles.table}>
                <View>
                    <View style={[styles.row3, { height: 30, justifyContent: 'center', marginTop: 20 }]}>
                        <Text style={styles.title}>유저 님이 참여 중인</Text>
                    </View>
                    <View style={[styles.row3, { height: 40, marginTop: 0 }]}>
                        <Text style={styles.title}>공강팟 목록은 아래와 같아요</Text>
                    </View>
                </View>
                {group.length > 0 ? (
                    group.map((content, index) => (
                        <View key={index} style={[styles.promiseboardcontent, { height: 100, marginTop: 10 }]}>
                            <View style={[styles.row3, { marginBottom: 5, marginLeft: 16 }]}>
                                <Text>{content.category || '전체'}</Text>
                                {content.isOwner && (
                                    <View style={[styles.circleIcon, { marginLeft: 118, marginTop: 30, position: 'relative', left: 70 }]}>
                                        <TouchableOpacity onPress={() => onSelectManage(content.id)}>
                                            <Image
                                                source={require('../assets/images/manager.png')}
                                                style={{ width: 24, height: 24, marginLeft: 10 }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                <View style={[styles.circleIcon, { marginLeft: 8, marginTop: 30, position: 'relative', left: 70 }]}>
                                    <TouchableOpacity onPress={() => ExitToast(content.id)}>
                                        <Image
                                            source={require('../assets/images/exit.png')}
                                            style={{ width: 24, height: 24, marginLeft: 10 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[styles.row3, { marginLeft: 16, marginBottom: 3 }]}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{content.title || '제목 없음'}</Text>
                            </View>
                            <View style={[styles.row3, { marginLeft: 16 }]}>
                                <Text style={{ color: '#9C8F4A' }}>({date.weekday}) {date.startTime} - {date.endTime}</Text>
                                <Text style={[styles.membernumIcon, { marginLeft: 140, position: 'relative', left: 115 }]}>
                                    {membersCount[content.id]?.currentUserCount} / {membersCount[content.id]?.currentUserCount + membersCount[content.id]?.remainingCount}
                                </Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <View style={[styles.promiseboardcontent, { height: 100, marginTop: 10 }]}>
                        <View style={[styles.row3, { marginBottom: 5, marginLeft: 16 }]}>
                            <Text>참여하고 있는 공강팟이 없습니다</Text>
                        </View>
                    </View>
                )}

            </View>
            <Toast
                style={{ backgroundColor: "FCFAF7", borderwidth: 1, borderColor: '#000000', borderRadius: 12 }}
                config={{
                    custom: ({ text1, text2, props }) => (
                        <View style={[styles.customToast, { height: 150, zIndex: 1000 }]}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>{text1}</Text>
                            <Text style={{ fontSize: 14, marginTop: 10 }}>{text2}</Text>
                            <View style={styles.row3}>
                                <TouchableOpacity onPress={props.onConfirm}>
                                    <Text style={{ fontSize: 20, height: 30, backgroundColor: '#E3DBCF', width: 70, marginTop: 60, textAlign: 'center', marginLeft: 2 }}>확인</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={props.onCancel}>
                                    <Text style={{ fontSize: 20, height: 30, backgroundColor: '#E3DBCF', marginTop: 60, marginLeft: 40, width: 70, textAlign: 'center' }}>취소</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ),
                }}
            />
            <View style={[styles.row3]}>
                <TouchableOpacity onPress={() => onSelectMakeParty()}>
                    <View style={[styles.makeparty, { marginTop: 50, position: 'relative', left: 20, width: 370, }]}>
                        <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'medium' }}>+</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={[styles.row, { marginTop: 120 }]}>
                <View style={[styles.promiseboardcontent, { height: 250 }]}>
                    <View style={[styles.row3, { height: 50, width: '100%', marginLeft: 16 }]}>
                        <Text style={[styles.title, { height: 35 }]}>공강팟에 참여하기</Text>
                    </View>
                    <View style={[styles.row3, { marginLeft: 16 }]}>
                        <Text style={{ fontSize: 16, height: 22 }}>입장 코드를 입력해주세요</Text>
                    </View>
                    <View style={[styles.row3, { marginLeft: 16, marginTop: 20, marginBottom: 10 }]}>
                        <TextInput style={[styles.codeinput, { width: '95%' }]} ref={inputRef} placeholder="ex. 1F3W3C" value={text} onChangeText={setText} onFocus={handleFocus}
                            onBlur={handleBlur} />
                    </View>
                    <View style={[styles.row3, { marginTop: 60 }]}>
                        <TouchableOpacity onPress={handleSubmit}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 145, height: 25 }}>입장하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Join;
