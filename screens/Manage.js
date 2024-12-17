import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Manage = ({ onSelectOption1, onSelectOption2, roomId }) => {
    const [remaining, setRemaining] = useState(null); // 남은 인원 수 상태
    const [currentusernum, setCurrentusernum] = useState(null); // 현재 사용자 상태
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const token = "eyJhbGciOiJIUzM4NCJ9.eyJtZW1iZXJJZCI6MTMsImV4cCI6MTczNTAyMDczMiwicm9sZSI6IlJPTEVfTUVNQkVSIn0.DM8Tk01sjLF1gDZkOZa_2fegCSHlzdxWaJPIt_bxJqlFPywhrL_MiofFdLrD96h5";
    const url = `http://129.154.55.198:80/api/appointment/remaining-count/${roomId}`;
    console.log('roomId:', roomId);

    // API 데이터 가져오기
    useEffect(() => {
        const fetchRemainingCount = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Response data:', response.data);
                console.log('Remaining Count:', response.data.remainingCount);
                console.log('Current UserNum:', response.data.currentUserCount);

                setRemaining(response.data.remainingCount);
                setCurrentusernum(response.data.currentUserCount);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchRemainingCount();
    }, [roomId]);

    if (loading) {
        return <Text style={{ textAlign: 'center', marginTop: 50 }}>Loading...</Text>;
    }

    if (error) {
        return <Text style={{ textAlign: 'center', marginTop: 50 }}>Error fetching data.</Text>;
    }

    return (
        <ScrollView contentContainerStyle={[styles.container]}>
            <View style={[styles.container]} >
                <View style={[styles.table, { marginTop: 30 }]}>
                    <View style={[styles.row3, { marginBottom: 30, height: 30, textAlign: 'Top' }]}>
                        <Text style={[styles.title]}>공팟장 옵션</Text>
                    </View>
                    {remaining !== 0 ? (
                        <>
                            <View style={[styles.row3]}>
                                <View style={[styles.promiseboardcontent, { height: 300, marginTop: 250 }]}>
                                    <View style={[styles.row3, { marginLeft: 20, height: 20 }]}>
                                        <Text style={[styles.partyview]}>벌써 <Text style={{ fontSize: 60 }}>{currentusernum}</Text> 명이 </Text>
                                    </View>
                                    <View style={[styles.row3, { marginTop: 20, height: 60, width: 320, marginLeft: 20 }]}>
                                        <Text style={[styles.partyview, { marginTop: 40 }]}>함께했어요!</Text>
                                    </View>
                                    <View style={[styles.row3, { height: 60, width: 320, marginLeft: 20 }]}>
                                        <Text style={[styles.partyview, { marginBottom: 30 }]}>이제 <Text style={{ fontSize: 60 }}>{remaining}</Text> 명만 더 오면 </Text>
                                    </View>
                                    <View style={[styles.row3, { height: 30, width: 320, marginLeft: 20 }]}>
                                        <Text style={[styles.partyview, { marginTop: 50 }]}>모두 모여서</Text>
                                    </View>
                                    <View style={[styles.row3, { height: 20, width: 320, marginLeft: 20 }]}>
                                        <Text style={[styles.partyview, { marginTop: 90 }]}>만날 시간을 정할 수 있어요</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.row3}>
                                <View style={[styles.promiseboardcontent, { marginTop: 630, height: 94 }]}>
                                    <TouchableOpacity>
                                        <View style={styles.row3}>
                                            <Text style={[styles.title, { fontSize: 20, height: 30, marginLeft: 16 }]}>공강팟 시간 추출하기</Text>
                                        </View>
                                        <View style={styles.row3}>
                                            <Text style={{ marginTop: 30, height: 30, marginLeft: 16 }}>모임 시간을 결정하고 싶다면 여기를 터치하세요</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>) : (
                        <>
                            <View style={[styles.promiseboardcontent, { height: 300, marginTop: 0 }]}>
                                <View style={[styles.row3, { marginLeft: 20, height: 20 }]}>
                                    <Text style={[styles.partyview]}><Text style={{ fontSize: 60 }}>{currentusernum + remaining}</Text> 명이 모두 모였어요</Text>
                                </View>
                                <View style={[styles.row3, { marginTop: 20, height: 60, width: 320, marginLeft: 20 }]}>
                                    <Text style={[styles.partyview, { marginTop: 40 }]}></Text>
                                </View>
                                <View style={[styles.row3, { height: 60, width: 320, marginLeft: 20 }]}>
                                    <Text style={[styles.partyview, { marginBottom: 30 }]}>이제 아래의 시간 추출 버튼을 통해 모두가</Text>
                                </View>
                                <View style={[styles.row3, { height: 30, width: 320, marginLeft: 20 }]}>
                                    <Text style={[styles.partyview, { marginTop: 50 }]}></Text>
                                </View>
                                <View style={[styles.row3, { height: 20, width: 320, marginLeft: 20 }]}>
                                    <Text style={[styles.partyview, { marginTop: 90 }]}>만날 시간을 정할 수 있어요!</Text>
                                </View>
                            </View>
                            <View style={styles.row3}>
                                <View style={[styles.promiseboardcontent, { marginTop: 120, height: 94 }]}>
                                    <TouchableOpacity onPress={() => onSelectOption1()}>
                                        <View style={styles.row3}>
                                            <Text style={[styles.title, { fontSize: 20, height: 30, marginLeft: 16 }]}>공강팟 시간 추출하기</Text>
                                        </View>
                                        <View style={styles.row3}>
                                            <Text style={{ marginTop: 30, height: 30, marginLeft: 16 }}>모임 시간을 결정하고 싶다면 여기를 터치하세요</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    )}

                    {/* {remaining === 0 ? (
                        <View style={styles.row3}>
                            <View style={[styles.promiseboardcontent, { marginTop: 630, height: 94 }]}>
                                <TouchableOpacity onPress={() => onSelectOption1()}>
                                    <View style={styles.row3}>
                                        <Text style={[styles.title, { fontSize: 20, height: 30, marginLeft: 16 }]}>공강팟 시간 추출하기</Text>
                                    </View>
                                    <View style={styles.row3}>
                                        <Text style={{ marginTop: 30, height: 30, marginLeft: 16 }}>모임 시간을 결정하고 싶다면 여기를 터치하세요</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.row3}>
                            <View style={[styles.promiseboardcontent, { marginTop: 630, height: 94 }]}>
                                <TouchableWithoutFeedback>
                                    <View style={styles.row3}>
                                        <Text style={[styles.title, { fontSize: 20, height: 30, marginLeft: 16 }]}>공강팟 시간 추출하기</Text>
                                    </View>
                                    <View style={styles.row3}>
                                        <Text style={{ marginTop: 30, height: 30, marginLeft: 16 }}>모임 시간을 결정하고 싶다면 여기를 터치하세요</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    )} */}

                    <View style={styles.row3}>
                        <View style={[styles.promiseboardcontent, { marginTop: 300, height: 94 }]}>
                            <TouchableWithoutFeedback onPress={() => onSelectOption2()}>
                                <View style={styles.row3}>
                                    <Text style={[styles.title, { fontSize: 20, height: 30, marginLeft: 16 }]}>공강팟 설정 변경하기</Text>\
                                </View>
                                <View style={styles.row3}>
                                    <Text style={{ marginTop: 30, height: 30, marginLeft: 16 }}>공강팟의 설정을 수정하고 싶다면 여기를 터치하세요</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView >
    );
};

export default Manage;
