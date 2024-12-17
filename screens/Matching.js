import React, { useState, useEffect } from 'react';
import { View, Text, Touchable, TouchableOpacity, Alert, Image } from 'react-native';
import { styles } from '../styles';
import axios from 'axios';

const Matching = ({ onBack, roomId }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [entranceCode, setEntranceCode] = useState('');
    const [rawData, setRawData] = useState([]); // 추가: 서버에서 받은 데이터
    const [meetingData, setMeetingData] = useState(null);
    const [processedData, setProcessedData] = useState([]); // 상태로 관리
    const [pressedIndex, setPressedIndex] = useState(null); // 선택된 시간대의 인덱스


    const token = "eyJhbGciOiJIUzM4NCJ9.eyJtZW1iZXJJZCI6MSwiZXhwIjoxNzM1MDMyNzQ5LCJyb2xlIjoiUk9MRV9NRU1CRVIifQ.31c9kDajutIKXfs9JDS7AKpVSkZu0Yo6S9tUL5ibkgvFu2mzYpGvizD094Yyuqdw";
    const url = `http://129.154.55.198:80/api/appointment/remaining-count/${String(roomId)}`;
    const url2 = `http://129.154.55.198:80/api/appointment/meeting`;
    const url3 = `http://129.154.55.198:80/api/appointment/decision`

    // 시간 변환 함수: 12시간제 + AM/PM 추가
    const convertTo12HourFormat = (time) => {
        const hour = parseInt(time, 10);
        const period = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour > 12 ? hour - 12 : hour;
        return `${formattedHour}:00 ${period}`;
    };

    // 첫 번째 요청: entranceCode 가져오기
    useEffect(() => {
        const fetchEntranceCode = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data.entranceCode) {
                    console.log('First API response:', response.data);
                    setEntranceCode(response.data.entranceCode); // 입장 코드 설정
                    console.log('Entrance Code:', entranceCode);
                }
            } catch (error) {
                console.error('Error fetching entranceCode:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchEntranceCode();
    }, [roomId]);

    // 두 번째 요청: entranceCode와 roomId 사용해서 meeting 데이터 가져오기
    // 두 번째 요청: meeting 데이터 가져오기
    useEffect(() => {
        if (entranceCode) {
            const fetchMeetingData = async () => {
                try {
                    const response = await axios.post(
                        url2,
                        { entranceCode, roomId: String(roomId) },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    setRawData(response.data.timeSlots);
                    const processed = response.data.timeSlots.map((slot) => {
                        const weekdayMapping = {
                            MONDAY: '월',
                            TUESDAY: '화',
                            WEDNESDAY: '수',
                            THURSDAY: '목',
                            FRIDAY: '금',
                        };

                        const startTime = convertTo12HourFormat(slot.startTime.split(':')[0]);
                        const endTime = convertTo12HourFormat(slot.endTime.split(':')[0]);

                        return [
                            weekdayMapping[slot.weekday],
                            `${startTime} ~ ${endTime}`,
                        ];
                    });
                    setProcessedData(processed);
                } catch (err) {
                    console.error('Error fetching meeting data:', err);
                    setError(true);
                } finally {
                    setLoading(false);
                }
            };
            fetchMeetingData();
        }
    }, [entranceCode]);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error fetching data</Text>;
    const handleSubmit = async () => {
        if (pressedIndex === null) {
            Alert.alert('경고', '시간을 선택해주세요.');
            return;
        }

        const selectedSlot = rawData[pressedIndex];
        const requestData = {
            roomId: roomId,
            weekday: selectedSlot.weekday,
            startTime: selectedSlot.startTime,
            endTime: selectedSlot.endTime,
        };

        console.log('Selected Slot:', requestData);

        try {
            const response = await axios.patch(url3, requestData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            Alert.alert('성공', '선택한 시간대가 제출되었습니다!');
            console.log('Response:', response.data);
            onBack();
        } catch (err) {
            console.error('Error submitting selected slot:', err);
            Alert.alert('오류', '시간대 제출에 실패했습니다.');
        }
    };

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error fetching data</Text>;

    return (
        <View style={styles.container}>
            <View style={styles.table}>
                <View style={[styles.row3, { marginTop: 30, height: 30 }]}>
                    <Text style={styles.title}>시간 잡기</Text>
                </View>
                <View style={styles.row3}>
                    <View style={[styles.promiseboardcontent, { marginTop: 300, height: 300 }]}>
                        <View style={[styles.row3]}>
                            <Text style={[styles.match, { marginTop: 30, marginLeft: 10 }]}>이 공강팟의</Text>
                        </View>
                        <View style={[styles.row3, { marginTop: 10 }]}>
                            <Text style={[styles.match, { height: 30, marginLeft: 10 }]}>시간대를 아래에서 선택해주세요</Text>
                        </View>
                        {processedData.length === 0 ?
                            <View style={{ marginTop: 20 }}>
                                <Image source={require('../assets/images/box.png')} style={{ width: 80, height: 80, marginLeft: 140 }} />
                                <Text style={{ marginTop: 20, fontSize: 15, width: 330, textAlign: 'center', marginLeft: 12 }}>가능한 시간이 없어요</Text>
                            </View>
                            :
                            <View style={{ marginTop: 20, width: '100%' }}>
                                {processedData.map((content, index) => (
                                    <TouchableOpacity onPress={() => setPressedIndex(index)} style={{ backgroundColor: pressedIndex === index ? '#C3C3C3' : '#FCFAF7', opacity: 0.7, borderRadius: 12 }}>
                                        <View style={[styles.row3, { marginTop: 15 }]}>
                                            <Text style={[styles.match, { fontWeight: 'middle' }]} key={index}>  {`${String(index + 1).padStart(2, '0')}. (${content[0]}) ${content[1]}`}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        }
                    </View>
                </View>
                {processedData.length === 0 ?
                    <TouchableOpacity onPress={() => onBack()}>
                        <View style={[styles.row3, { marginTop: 300, backgroundColor: '#D8D3B9', width: 120, height: 35, justifyContent: 'center' }]}>
                            <Text style={{ fontSize: 18 }}>돌아가기</Text>
                        </View>
                    </TouchableOpacity>
                    : <TouchableOpacity onPress={() => handleSubmit()}>
                        <View style={[styles.row3, { marginTop: 320, backgroundColor: '#D8D3B9', width: 120, height: 35, justifyContent: 'center' }]}>
                            <Text style={{ fontSize: 18 }}>선택하기</Text>
                        </View>
                    </TouchableOpacity>}
            </View>
        </View >
    )
}

export default Matching;