import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import axios from 'axios';
import { styles } from '../styles';

const PromiseBoard = () => {
    const [appointmentData, setAppointmentData] = useState([]);
    const [error, setError] = useState(null);

    // Helper function to format time to 12-hour format
    const formatTo12Hour = (time) => {
        const [hour, minute] = time.split(':').map(Number);
        const period = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        return `${formattedHour}:${minute.toString().padStart(2, '0')} ${period}`;
    };

    // Helper function to map category
    const mapCategory = (category) => {
        const categoryMap = {
            EAT: '밥약',
            STUDY: '스터디/동아리',
            COUNSEL: '상담',
            ETC: '기타',
        };
        return categoryMap[category] || '기타'; // 기본값
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
                        },
                    }
                );

                const rawResponse = response.request._response;
                const parsedData = JSON.parse(rawResponse);

                console.log('Parsed Data:', parsedData);

                const appointments = [];
                parsedData.appointmentBoards.forEach((boardArray) => {
                    boardArray.forEach((board) => {
                        const startFormatted = formatTo12Hour(board.startTime.slice(0, 5));
                        const endFormatted = formatTo12Hour(board.endTime.slice(0, 5));
                        const category = mapCategory(board.category);

                        appointments.push({
                            category,
                            time: `${startFormatted} ~ ${endFormatted}`,
                        });
                    });
                });

                setAppointmentData(appointments);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    if (error) {
        Alert.alert('Error', error);
    }

    return (
        <View style={{ position: 'relative', top: -90 }}>
            {appointmentData.map((appointment, index) => (
                <View
                    key={index}
                    style={[
                        styles.row2,
                        index !== 0 && { marginTop: 45 },
                        index === appointmentData.length - 1 && { marginBottom: 70 },
                    ]}
                >
                    <View style={styles.promiseboardcontent}>
                        <Text style={styles.promiseboardcontenttext}>{appointment.category}</Text>
                        <Text style={styles.promiseboardcontenttime}>{appointment.time}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default PromiseBoard;
