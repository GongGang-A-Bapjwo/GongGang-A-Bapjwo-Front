import React from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';
import { client_id } from '@env';
import { useNavigation } from '@react-navigation/native';

const KakaogLogin = () => {
    const navigation = useNavigation();

    // 일단 로그인 부분 skip - 조금만 수정하면 될듯
    // const CLIENT_ID = client_id; // 카카오 앱 REST API 키
    // const REDIRECT_URI = 'http://192.168.45.47:3000/process-token'; // 중간 서버의 엔드포인트

    // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    // const handleKakaoLogin = async () => {
    //     try {
    //         // 카카오 로그인 페이지 열기
    //         const result = await WebBrowser.openAuthSessionAsync(KAKAO_AUTH_URL, REDIRECT_URI);

    //         if (result.type === 'success' && result.url) {
    //             // 리다이렉트된 URL에서 인가 코드 추출
    //             const code = new URL(result.url).searchParams.get('code');

    //             if (!code) {
    //                 throw new Error('인가 코드를 받을 수 없습니다.');
    //             }

    //             // 인가 코드를 사용하여 액세스 토큰 요청
    //             const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
    //                 params: {
    //                     grant_type: 'authorization_code',
    //                     client_id: CLIENT_ID,
    //                     redirect_uri: REDIRECT_URI,
    //                     code,
    //                 },
    //                 headers: {
    //                     'Content-Type': 'application/x-www-form-urlencoded',
    //                 },
    //             });

    //             const { access_token, refresh_token } = tokenResponse.data;

    //             // 중간 서버로 토큰 전송
    //             const serverResponse = await axios.post(REDIRECT_URI, {
    //                 accessToken: access_token,
    //                 refreshToken: refresh_token,
    //             });

    //             console.log('서버 응답:', serverResponse.data);
    //             Alert.alert('로그인 성공', '카카오 로그인이 완료되었습니다.');
    //         } else {
    //             console.error('로그인 실패:', result);
    //             Alert.alert('로그인 실패', '카카오 로그인이 취소되었습니다.');
    //         }
    //     } catch (error) {
    //         console.error('로그인 실패:', error.message);
    //         Alert.alert('로그인 실패', '문제가 발생했습니다. 다시 시도해주세요.');
    //     }
    // };

    return (
        <GestureHandlerRootView>
            <View style={[styles.container, { justifyContent: 'Top', flex: 1, paddingLeft: 20, paddingTop: 30 }]}>
                <View style={[styles.table, { marginTop: 50, backgroundColor: '#E8E3CF', width: '95%', height: 450, borderRadius: 12 }]}>
                    <View style={[styles.row3]}>
                        <Text style={[styles.title, { height: 30, textAlign: 'left', flex: 1, position: 'absolute', top: -170, left: -150, fontSize: 23 }]}>
                            공강아 밥줘,
                        </Text>
                    </View>
                    <View style={[styles.row3]}>
                        <Text style={[styles.title, { height: 30, marginTop: 20, position: 'absolute', top: -175, left: -150, fontSize: 23 }]}>
                            학생을 위한 약속 관리 플랫폼
                        </Text>
                    </View>
                    <View style={[styles.row3]}>
                        <Image source={require('../assets/images/logoImg.png')} style={{ width: 310, height: 330, position: 'relative', top: 25 }} />
                    </View>
                </View>
                <View style={[styles.row3]}>
                    <Text style={[styles.title, { fontSize: 17, position: 'relative', top: 25, left: 20 }]}>간편하게 로그인하고 서비스를 이용해보세요</Text>
                </View>
                <View style={[styles.row3, { width: '95%' }]}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ScheduleRegister')}
                        style={{
                            backgroundColor: '#FAE300',
                            flex: 1,
                            width: '90%',
                            position: 'relative',
                            top: 60,
                            height: 50,
                            borderRadius: 24,
                        }}
                    >
                        <Image source={require('../assets/images/kakaotalk_sharing_btn_small.png')} style={{ width: 30, height: 30, position: 'relative', top: 10, left: 10 }} />
                        <View>
                            <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', position: 'relative', top: -15 }}>카카오 로그인</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </GestureHandlerRootView>
    );
};

export default KakaogLogin;