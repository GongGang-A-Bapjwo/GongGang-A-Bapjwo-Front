import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { styles } from '../styles';
import FreeTimeNoticeTitle from './FreeTimeNoticeTitle';

const FreeTimeNotice = () => {
    const [timeSlots, setTimeSlots] = useState([]);
    const [error, setError] = useState(null);

    const defaultTimeSlots = ['없음', '없음', '없음', '없음'];

    // 시간을 12시간제로 변환
    const formatTo12Hour = (time) => {
        const [hour, minute] = time.split(':').map(Number);
        const period = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        return `${formattedHour}:${minute.toString().padStart(2, '0')} ${period}`;
    };

    // 겹치는 시간대를 합치거나 더 큰 범위만 유지
    const mergeOverlappingTimes = (times) => {
        // `startTime` 기준으로 정렬
        const sortedTimes = times.sort((a, b) => a.startTime.localeCompare(b.startTime));
        const mergedTimes = [];

        sortedTimes.forEach((current) => {
            if (mergedTimes.length === 0) {
                mergedTimes.push(current);
            } else {
                const last = mergedTimes[mergedTimes.length - 1];
                if (last.endTime >= current.startTime) {
                    // 시간이 겹치는 경우, 더 큰 범위로 병합
                    last.endTime = last.endTime > current.endTime ? last.endTime : current.endTime;
                } else {
                    mergedTimes.push(current);
                }
            }
        });

        return mergedTimes;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = "eyJhbGciOiJIUzM4NCJ9.eyJtZW1iZXJJZCI6OSwiZXhwIjoxNzM0ODc1OTIyLCJyb2xlIjoiUk9MRV9NRU1CRVIifQ.o_XkvMmqSY4kbTHI4x0VdgaGI8t8NZM3JXTdZO5rQ6uAQHQ27NuzJW7P2-GBuZgt";

                const response = await axios.get(
                    'http://129.154.55.198:80/api/appointment/all',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );

                const rawResponse = response.request._response;
                const parsedData = JSON.parse(rawResponse);

                console.log('Parsed Data:', JSON.stringify(parsedData, null, 2));

                // 겹치는 시간대를 병합
                const uniqueTimeSlots = mergeOverlappingTimes(parsedData.freeTimes || []);

                // 시간을 12시간제로 포맷팅
                const formattedTimeSlots = uniqueTimeSlots.map(({ startTime, endTime }) => {
                    const startFormatted = formatTo12Hour(startTime);
                    const endFormatted = formatTo12Hour(endTime);
                    return `${startFormatted} - ${endFormatted}`;
                });

                setTimeSlots(formattedTimeSlots);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message);
                Alert.alert('Error', err.message);
            }
        };

        fetchData();
    }, []);

    // Ensure there are at least 4 slots
    const displayTimeSlots = [...timeSlots, ...defaultTimeSlots.slice(timeSlots.length)].slice(0, 4);

    // Split into groups of 2
    const groupedTimeSlots = [];
    for (let i = 0; i < displayTimeSlots.length; i += 2) {
        groupedTimeSlots.push(displayTimeSlots.slice(i, i + 2));
    }

    return (
        <ScrollView>
            <FreeTimeNoticeTitle />
            <ScrollView horizontal>
                <View style={{ flexDirection: 'row', marginTop: 0, height: 300, position: 'relative', left: 15, top: 0 }}>
                    {groupedTimeSlots.map((group, idx) => (
                        <View key={idx} style={{ marginHorizontal: 5 }}>
                            {group.map((time, subIdx) => (
                                <View
                                    key={subIdx}
                                    style={[
                                        styles.freebox,
                                        { width: 180, height: 130, marginVertical: -8, justifyContent: 'center', alignItems: 'center' },
                                    ]}
                                >
                                    <Image
                                        source={require('../assets/images/calendarcheck.png')}
                                        style={{ width: 24, height: 24, marginBottom: 10, position: 'relative', left: -60 }}
                                    />
                                    <Text style={styles.freeboxtitle}>공강</Text>
                                    <Text style={styles.freeboxtime}>{time}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </ScrollView>
    );
};

export default FreeTimeNotice;
