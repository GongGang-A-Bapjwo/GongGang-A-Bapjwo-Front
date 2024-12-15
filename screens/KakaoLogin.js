import React from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';
import { client_id } from '@env';
import { redirectUrl } from '@env';
import { user_login_api } from '@env';
import { useNavigation } from '@react-navigation/native';

const KakaogLogin = () => {
    const navigation = useNavigation();

    const CLIENT_ID = 'f2e25f4e863b53bd8f26299a1d14136d'; // 카카오 REST API 키
    const REDIRECT_URI = 'http://auth.expo.io/@ksy2384/gonganababjwo';
    // 카카오 로그인 URL 생성
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;

    const handleLogin = async () => {
        try {
            const result = await WebBrowser.openAuthSessionAsync(KAKAO_AUTH_URL, REDIRECT_URI);
            console.log('redirecturl:', result);
            if (result.type === 'success' && result.url) {
                const url = new URL(result.url); // 리다이렉트된 URL
                const code = url.searchParams.get('code'); // Authorization Code 추출
                console.log('code:', code);
                if (code) {
                    console.log('Authorization Code:', code);
                    await sendAuthorizationCode(code);
                } else {
                    console.log('Error', 'Authorization code not found');
                }
            } else if (result.type === 'cancel') {
                console.log('Error', 'Login process was cancelled');
            } else {
                console.log('Error', 'Login failed');
            }
        } catch (error) {
            console.error('Login Error:', error.message);
            console.log('Error', 'Login failed');
        } finally {
            WebBrowser.dismissBrowser(); // 세션 종료
        }
    };



    // API로 authorizationCode 전송
    const sendAuthorizationCode = async (authorizationCode) => {
        console.log('Sending Authorization Code:', authorizationCode); // 호출 여부 확인

        const API_URL = user_login_api;
        const data = { socialType: 'KAKAO' };

        try {
            const response = await axios.post(`${API_URL}?authorizationCode=${authorizationCode}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('API Response:', response.data);
            console.log('Success', 'Login successful');

        } catch (error) {
            console.error('API Error:', error.response?.data || error.message);
            console.log('Error', 'Failed to process authorization code');
        }
    };



    // const CLIENT_ID = client_id; // 카카오 앱 REST API 키
    // const REDIRECT_URI = 'http://129.154.55.198:80/api/free-time/process-image';

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
    //             console.log('액세스 토큰:', access_token);
    //             console.log('리프레시 토큰:', refresh_token);

    //             // 중간 서버로 토큰 전송
    //             const serverResponse = await axios.post(REDIRECT_URI, {
    //                 accessToken: access_token,
    //                 refreshToken: refresh_token,
    //             });

    //             console.log('서버 응답:', serverResponse.data);
    //             console.log('로그인 성공', '카카오 로그인이 완료되었습니다.');
    //             navigation.navigate('ScheduleRegister');
    //         } else {
    //             console.error('로그인 실패:', result);
    //             console.log('로그인 실패', '카카오 로그인이 취소되었습니다.');
    //         }
    //     } catch (error) {
    //         console.error('로그인 실패:', error.message);
    //         console.log('로그인 실패', '문제가 발생했습니다. 다시 시도해주세요.');
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
                        <Image source={require('../assets/images/gonggang1.png')} style={{ width: 310, height: 330, position: 'relative', top: 25 }} />
                    </View>
                </View>
                <View style={[styles.row3]}>
                    <Text style={[styles.title, { fontSize: 17, position: 'relative', top: 30, left: 20, height: 22 }]}>간편하게 로그인하고 서비스를 이용해보세요</Text>
                </View>
                <View style={[styles.row3, { width: '95%' }]}>
                    <TouchableOpacity
                        onPress={() => { handleLogin() }}
                        style={{
                            backgroundColor: '#FAE300',
                            flex: 1,
                            width: '90%',
                            position: 'relative',
                            top: 70,
                            height: 50,
                            borderRadius: 24,
                        }}
                    >
                        <Image source={require('../assets/images/kakaotalksharingbtnsmall.png')} style={{ width: 30, height: 30, position: 'relative', top: 10, left: 10 }} />
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