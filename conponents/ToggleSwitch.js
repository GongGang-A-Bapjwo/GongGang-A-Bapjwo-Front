import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { styles } from '../styles';

const PromiseBoard = ({ istoggle }) => {
    const [appointmentData, setAppointmentData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const formatTo12Hour = (time) => {
        const [hour, minute] = time.split(':').map(Number);
        const period = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        return `${formattedHour}:${minute.toString().padStart(2, '0')} ${period}`;
    };

    const mapCategory = (category) => {
        const categoryMap = {
            EAT: '밥약',
            STUDY: '스터디',
            COUNSEL: '상담',
            ETC: '기타',
        };
        return categoryMap[category] || '기타';
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = "eyJhbGciOiJIUzM4NCJ9.eyJtZW1iZXJJZCI6OSwiZXhwIjoxNzM0ODc1OTIyLCJyb2xlIjoiUk9MRV9NRU1CRVIifQ.o_XkvMmqSY4kbTHI4x0VdgaGI8t8NZM3JXTdZO5rQ6uAQHQ27NuzJW7P2-GBuZgt";

            const url = istoggle
                ? 'http://129.154.55.198:80/api/appointment/all-board'
                : 'http://129.154.55.198:80/api/appointment/all';

            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const rawResponse = response.request._response;
                const parsedData = JSON.parse(rawResponse);

                console.log('Parsed Data:', parsedData);

                // 데이터 유효성 검사 및 처리
                const appointments = [];
                if (parsedData?.appointmentBoards?.length) {
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
                }

                setAppointmentData(appointments);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [istoggle]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000000" />
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        Alert.alert('Error', error);
        return (
            <View>
                <Text style={{ color: 'red', textAlign: 'center' }}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={{ position: 'relative', top: -90 }}>
            {appointmentData.length > 0 ? (
                appointmentData.map((appointment, index) => (
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
                ))
            ) : (
                <Text style={{ textAlign: 'center', marginTop: 20 }}>약속이 없습니다.</Text>
            )}
        </View>
    );
};

export default PromiseBoard;
