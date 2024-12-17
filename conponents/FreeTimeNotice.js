import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { styles } from '../styles';
import FreeTimeNoticeTitle from './FreeTimeNoticeTitle';

const FreeTimeNotice = () => {
    const [timeSlots, setTimeSlots] = useState([]);
    const [error, setError] = useState(null);

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
                const token = "eyJhbGciOiJIUzM4NCJ9.eyJtZW1iZXJJZCI6MTMsImV4cCI6MTczNTAyMDczMiwicm9sZSI6IlJPTEVfTUVNQkVSIn0.DM8Tk01sjLF1gDZkOZa_2fegCSHlzdxWaJPIt_bxJqlFPywhrL_MiofFdLrD96h5";

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

    return (
        <ScrollView>
            <FreeTimeNoticeTitle />
            <ScrollView horizontal>
                <View style={{ flexDirection: 'row', marginTop: 0, height: 300, position: 'relative', left: 15, top: -20 }}>
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
