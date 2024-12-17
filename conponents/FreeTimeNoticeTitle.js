import React, { useEffect, useState } from 'react';
import { View, Text, Alert, Image } from 'react-native';
import axios from 'axios';
import { styles } from '../styles';

const FreeTimeNoticeTitle = () => {
    const [weekday, setWeekday] = useState(null); // weekday를 저장하는 상태
    const [timeSlots, setTimeSlots] = useState([]);
    const [error, setError] = useState(null);

    const formatTo12Hour = (time) => {
        const [hour, minute] = time.split(':').map(Number);
        const period = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        return `${formattedHour}:${minute.toString().padStart(2, '0')} ${period}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = "eyJhbGciOiJIUzM4NCJ9.eyJtZW1iZXJJZCI6MSwiZXhwIjoxNzM1MDMyNzQ5LCJyb2xlIjoiUk9MRV9NRU1CRVIifQ.31c9kDajutIKXfs9JDS7AKpVSkZu0Yo6S9tUL5ibkgvFu2mzYpGvizD094Yyuqdw";

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

                // weekday 값 가져오기
                setWeekday(parsedData.weekday);

                // freeTimes 데이터를 변환
                const formattedTimeSlots = [];
                if (parsedData.freeTimes) {
                    parsedData.freeTimes.forEach(({ startTime, endTime }) => {
                        const startFormatted = formatTo12Hour(startTime);
                        const endFormatted = formatTo12Hour(endTime);
                        formattedTimeSlots.push(`${startFormatted} - ${endFormatted}`);
                    });
                }

                setTimeSlots(formattedTimeSlots);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message);
                Alert.alert('Error', err.message);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return (
            <View>
                <Text style={{ color: 'red' }}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.table}>
            <View style={[styles.row, { marginBottom: 0, position: 'relative', left: -48, top: -10 }]}>
                <Image source={require('../assets/images/calendarcheck.png')} style={{ width: 30, height: 30, marginRight: 10, position: 'relative', left: -20 }} />
                <Text style={{ fontSize: 20, fontWeight: 'bold', position: 'relative', left: -20 }} >
                    오늘의 공강 ({weekday ? weekday : '로딩 중...'})
                </Text>
                <Image source={require('../assets/images/listline.png')} style={{ width: 30, height: 30, marginLeft: -10, position: 'relative', left: 115 }} />
            </View>
        </View>
    );
};

export default FreeTimeNoticeTitle;
