import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { styles } from '../styles';
import FreeTimeNoticeTitle from './FreeTimeNoticeTitle';

const FreeTimeNotice = () => {
    const [timeSlots, setTimeSlots] = useState([]);
    const [error, setError] = useState(null);
    const columnCount = 2;

    const defaultTimeSlots = ['없음', '없음', '없음', '없음'];

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

    // Ensure there are at least 4 slots
    const displayTimeSlots = [...timeSlots, ...defaultTimeSlots.slice(timeSlots.length)].slice(0, 4);

    // Split into groups of 2
    const groupedTimeSlots = [];

    for (let i = 0; i < displayTimeSlots.length; i += 2) {
        groupedTimeSlots.push(displayTimeSlots.slice(i, i + 2));
    }

    const flattenedData = groupedTimeSlots.flat(); // 데이터를 평탄화 (1차원 배열로 만듦)

    // 데이터를 행 기준으로 재정렬
    const rowBasedData = Array.from({ length: Math.ceil(displayTimeSlots.length / columnCount) }, (_, rowIndex) =>
        displayTimeSlots.slice(rowIndex * columnCount, (rowIndex + 1) * columnCount)
    );

    return (
        <ScrollView style={{ position: 'relative', top: 10 }}>
            <FreeTimeNoticeTitle />
            <View
                style={{
                    flexDirection: 'row', // 메인 방향은 가로
                    flexWrap: 'wrap', // 넘치는 요소는 줄 바꿈
                    marginTop: 0,
                    height: 'auto',
                    position: 'relative',
                    left: 15,
                    top: -20,
                }}
            >
                {rowBasedData.flat().map((time, idx) => ( // 데이터를 평탄화
                    <View
                        key={idx}
                        style={[
                            styles.freebox,
                            {
                                width: 180,
                                height: 130,
                                margin: 4, // 간격 설정
                                marginBottom: 0,
                                marginTop: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            },
                        ]}
                    >
                        <Image
                            source={require('../assets/images/calendarcheck.png')}
                            style={{ width: 24, height: 24, marginBottom: 10, position: 'relative', left: -60 }}
                        />
                        <Text style={[styles.freeboxtitle, { textAlign: 'center', width: '90%', textAlign: 'left' }]}>공강</Text>
                        <Text style={[styles.freeboxtime, { textAlign: 'center', width: '90%', textAlign: 'left' }]}>{time}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>

    );
};

export default FreeTimeNotice;
