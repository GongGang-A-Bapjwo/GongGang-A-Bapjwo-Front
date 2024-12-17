import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
    Alert,
    TextInput,
    Image
} from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { styles } from '../styles';
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from '@react-navigation/native';

const MakeParty = ({ onBack }) => {
    const [pressedIndex, setPressedIndex] = useState(null); // 현재 터치된 항목의 인덱스
    const [partycontent, setPartycontent] = useState('');
    const [memNum2, setMemNum2] = useState(1); // 오른쪽 원의 값 (수정 가능)
    const [focused, setFocused] = useState(false);
    const [toastvisible, setToastVisible] = useState(false);
    const navigation = useNavigation();

    const token = "eyJhbGciOiJIUzM4NCJ9.eyJtZW1iZXJJZCI6MTMsImV4cCI6MTczNTAyMDczMiwicm9sZSI6IlJPTEVfTUVNQkVSIn0.DM8Tk01sjLF1gDZkOZa_2fegCSHlzdxWaJPIt_bxJqlFPywhrL_MiofFdLrD96h5";
    // const token = "eyJhbGciOiJIUzM4NCJ9.eyJtZW1iZXJJZCI6MTIsImV4cCI6MTczNTAxNDk1NSwicm9sZSI6IlJPTEVfTUVNQkVSIn0.Wa4wpv7u7crJQdP505UhUkjicUnNNWRovk5LMIAl5 - 7M7LnIvTePMSLf_cocO00c";
    const categories = ['스터디', '밥약', '상담', '기타'];
    const dbcategories = ['STUDY', 'EAT', 'COUNCELING', 'ETC'];

    const copyToClipboard = async (text) => {
        await Clipboard.setStringAsync(text); // setStringAsync 사용
        Alert.alert('복사 완료', '코드가 클립보드에 복사되었습니다.');
    };


    const fetchFromClipboard = async () => {
        const text = await Clipboard.getStringAsync();
        Alert.alert('클립보드 내용', text || '클립보드에 복사된 텍스트가 없습니다.');
    };

    // 키보드 닫기
    const dismissKeyboard = () => {
        Keyboard.dismiss();
        setFocused(false);
    };

    // 참여 인원 변경
    const handleTextChange2 = (text) => {
        setMemNum2(text.replace(/[^0-9]/g, '')); // 숫자만 입력 가능
    };

    // 공강팟 설명 변경
    const handleTextChangePartycontent = (text) => {
        setPartycontent(text);
    };

    // 입력값 확인 후 서버로 데이터 전송
    const handleSubmit = () => {
        if (!partycontent.trim() || pressedIndex === null || memNum2 < 1) {
            Alert.alert('입력 오류', '모든 항목을 올바르게 입력해주세요.');
            return;
        }
        sendDataToServer();
    };

    // Toast 표시 함수
    const MakeToast = (title, description, code) => {
        Toast.show({
            type: 'custom',
            text1: title,
            text2: description,
            autoHide: false,
            props: {
                onCancel: () => {
                    Toast.hide(); // 토스트 숨김
                    setToastVisible(false); // 상태 변경
                },
                code,
            },
        });
        setToastVisible(true);
    };

    // 서버로 데이터 전송
    const sendDataToServer = async () => {
        const requestData = {
            category: dbcategories[pressedIndex],
            title: `${partycontent}`,
            maxParticipants: parseInt(memNum2, 10),
        };

        try {
            const response = await axios.post(
                'http://129.154.55.198:80/api/appointment',
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log("Keys in response.data:", Object.keys(response.data));
            console.log("response.data:", response.data);


            // 응답 데이터에서 난수 코드 가져오기
            const entrance_code = response.data.response.entrance_code;
            console.log('Entrance Code:', entrance_code);

            MakeToast(
                '공강팟이 생성되었습니다',
                '아래의 난수 코드를 터치하여 복사 후 참석자들에게 공유해주세요',
                entrance_code
            );
        } catch (error) {
            console.error('Error sending data:', error);
            const errorMessage = error.response?.data?.message || '공강팟 생성 중 문제가 발생했습니다.';
            Alert.alert('오류', errorMessage);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
                        <View style={[styles.container, { height: focused ? 400 : 500 }]}>
                            <View style={styles.table}>
                                <View style={[styles.row3, { marginTop: 30 }]}>
                                    <Text style={[styles.title, { height: 40 }]}>공강팟 만들기</Text>
                                </View>
                                <View style={[styles.row3, { marginTop: 210 }]}>
                                    <View style={[styles.promiseboardcontent, { height: 430 }]}>
                                        {/* 카테고리 선택 */}
                                        <View style={[styles.row3]}>
                                            <Text style={[styles.row3, styles.title, { height: 50, flex: 1, paddingLeft: 25, marginBottom: 40 }]}>
                                                공강팟 카테고리
                                            </Text>
                                        </View>
                                        <View style={[styles.row3, { height: 33 }]}>
                                            <ScrollView
                                                horizontal={true}
                                                style={[styles.scrollview, { marginLeft: 20, marginTop: 0 }]}
                                                contentContainerStyle={styles.scrollviewContentContainer}
                                                showsHorizontalScrollIndicator={false}
                                            >
                                                {categories.map((category, index) => (
                                                    <TouchableOpacity
                                                        key={index}
                                                        style={[
                                                            styles.scrollviewcontent,
                                                            {
                                                                backgroundColor: pressedIndex === index ? '#C3C3C3' : '#F5F2E8',
                                                            },
                                                        ]}
                                                        onPress={() => setPressedIndex(index)}
                                                    >
                                                        <Text style={styles.scrollviewtext}>{category}</Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </ScrollView>
                                        </View>
                                        {/* 공강팟 설명 */}
                                        <View style={[styles.row3]}>
                                            <Text style={[styles.title, { height: 40, flex: 1, paddingLeft: 25, marginTop: 70 }]}>공강팟</Text>
                                        </View>
                                        <View style={[styles.row3, { position: 'relative', top: 10 }]}>
                                            <TextInput
                                                placeholder="공강팟의 간단 설명을 20자 이내로 입력해주세요"
                                                multiline={true}
                                                value={partycontent}
                                                editable={true}
                                                onChangeText={handleTextChangePartycontent}
                                                style={{
                                                    backgroundColor: '#F7F5F2',
                                                    height: 74,
                                                    width: '90%',
                                                    marginLeft: 20,
                                                    marginTop: 140,
                                                    borderRadius: 12,
                                                    borderColor: '#E3DBCF',
                                                    borderWidth: 1,
                                                }}
                                            />
                                        </View>
                                        <Toast
                                            config={{
                                                custom: ({ text1, text2, props }) => (
                                                    <View style={[styles.customToast, { height: 320, zIndex: 1000 }]}>
                                                        <View style={[styles.row3, { position: 'relative', top: 10 }]}>
                                                            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, height: 40 }}>{text1}</Text>
                                                        </View>
                                                        <View style={[styles.row3, { position: 'relative', top: 10 }]}>
                                                            <Text style={{ marginTop: 30, fontSize: 15, height: 20 }}>{text2}</Text>
                                                        </View>
                                                        <View style={[styles.row3, { position: 'relative', top: 10 }]}>
                                                            <TouchableOpacity onPress={() => copyToClipboard(props.code)} style={{ flex: 1 }}>
                                                                <TextInput
                                                                    style={{
                                                                        backgroundColor: '#F7F5F2',
                                                                        height: 50,
                                                                        width: '100%',
                                                                        marginTop: 80,
                                                                        borderRadius: 12,
                                                                        borderColor: '#E3DBCF',
                                                                        borderWidth: 1,
                                                                    }}
                                                                    editable={false}
                                                                    placeholder={props.code || '코드 없음'}
                                                                    value={props.code || '코드 없음'}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={[styles.row3, { position: 'relative', top: 10 }]}>
                                                            <View style={{ backgroundColor: '#F4F2E9', height: 110, width: '100%', marginTop: 230, borderRadius: 12, borderColor: '#E3DBCF', borderWidth: 1, zIndex: 1000 }}>
                                                                <View style={[styles.row3]}>
                                                                    <Text style={{ flex: 1, fontSize: 20, height: 25, textAlign: 'center', marginTop: 20, fontWeight: 'bold' }}>공유하기</Text>
                                                                </View>
                                                                <View style={[styles.row3, { height: 80, marginTop: 15, alignItems: 'center', justifyContent: 'center' }]}>
                                                                    <TouchableOpacity onPress={() => alert('파티 생성')} >
                                                                        <Image source={require('../assets/images/kakao.png')} style={{ width: 60, height: 60 }} />
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        <View style={[styles.row3, { marginLeft: 65, position: 'relative', top: 10 }]}>
                                                            <TouchableOpacity onPress={() => {
                                                                if (props.onCancel) props.onCancel(); // Toast 숨기기
                                                                setToastVisible(false);              // 토스트 상태 false로 업데이트
                                                                if (onBack) onBack();                // Join 화면으로 돌아가기
                                                            }}>                                                                <Text style={{ fontSize: 17, height: 30, marginTop: 355, marginLeft: 40, width: 70, textAlign: 'center', fontWeight: 'bold', position: 'relative', left: 14 }}>닫기</Text>
                                                            </TouchableOpacity>
                                                        </View>

                                                    </View>
                                                ),
                                            }}
                                        />
                                        {/* 참여 인원 */}
                                        <View style={[styles.row3]}>
                                            <Text style={[styles.title, { height: 40, flex: 1, paddingLeft: 25, marginTop: 250, position: 'relative', top: 10 }]}>참여 인원</Text>
                                        </View>
                                        <View style={[styles.row3, { alignItems: 'center', position: 'relative', top: 15 }]}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, flex: 1, paddingLeft: 25, marginTop: 280 }}>
                                                <View
                                                    style={[
                                                        styles.circleIcon,
                                                        {
                                                            width: 38,
                                                            height: 38,
                                                            backgroundColor: '#C3C3C3',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        },
                                                    ]}
                                                >
                                                    <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>1</Text>
                                                </View>
                                                <Text style={{ fontSize: 25, textAlign: 'center', marginHorizontal: 5 }}>/</Text>
                                                <View
                                                    style={[
                                                        styles.circleIcon,
                                                        {
                                                            width: 38,
                                                            height: 38,
                                                            backgroundColor: '#DAD2B4',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        },
                                                    ]}
                                                >
                                                    <TextInput
                                                        style={{
                                                            fontSize: 15,
                                                            fontWeight: 'bold',
                                                            textAlign: 'center',
                                                            color: '#000',
                                                            padding: 5,
                                                            width: '80%',
                                                        }}
                                                        value={String(memNum2)}
                                                        keyboardType="numeric"
                                                        onChangeText={handleTextChange2}
                                                        editable={true}
                                                        placeholder="1"
                                                        onFocus={() => setFocused(true)}
                                                        onBlur={() => setFocused(false)}
                                                    />
                                                </View>
                                                <Text style={{ fontSize: 23, fontWeight: 'bold', paddingLeft: 8 }}>명</Text>
                                            </View>
                                        </View>

                                        {toastvisible ? (<>
                                            <View style={[styles.row3, { marginTop: 180 }]}>
                                                <TouchableOpacity onPress={handleSubmit}>
                                                    <View style={[styles.okbutton, { marginTop: 0, position: 'relative', top: 10, left: 120 }]}>
                                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>선택하기</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                        ) : (
                                            <>
                                                <View style={[styles.row3, { marginTop: 180 }]}>
                                                    <TouchableWithoutFeedback onPress={handleSubmit}>
                                                        <View style={[styles.okbutton, { marginTop: 0, position: 'relative', top: 10, left: 120 }]}>
                                                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>선택하기</Text>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                </View>
                                            </>
                                        )}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default MakeParty;
