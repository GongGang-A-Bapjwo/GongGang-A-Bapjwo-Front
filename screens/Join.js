import React, { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles';
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Join = () => {
    const [text, setText] = useState('');
    const inputRef = useRef(null);
    var group = [['스터디/동아리', '스터디 할 사람을 구합니다', '미정', '1/3', '관리자'], ['밥약', '같이 밥 먹을 사람 구해요', '12:00 - 1:00 (월)', '1/3', '일반유저']];

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleSubmit = () => {
        if (!text.trim()) {
            Alert.alert(
                '경고',
                '입장코드를 입력해주세요.', // 메시지를 명시적으로 추가
                [
                    {
                        text: '확인',
                        onPress: () => inputRef.current?.focus(),
                    },
                ]
            );
        } else {
            Alert.alert('완료', `입력된 텍스트: ${text}`);
        }
    }


    return (
        <View style={[styles.container, { height: 900 }]}>
            <View style={styles.table}>
                <View>
                    <View style={[styles.row3, { height: 30, justifyContent: 'center', marginTop: 20, marginBottom: 0 }]}>
                        <Text style={styles.title}>USER1234님이</Text>
                    </View>
                    <View style={[styles.row3, { height: 40, marginTop: 0 }]}>
                        <Text style={styles.title}>참여 중인 공강팟 목록은 아래와 같아요</Text>
                    </View>
                </View>
                {group.map((content, cindex) => (
                    <View style={[styles.promiseboardcontent, { height: 100, marginTop: 10 }]} key={cindex}>
                        <View style={[styles.row3, { marginBottom: 5, marginLeft: 16 }]}>
                            <Text>{content[0]}</Text>
                            {content[4] === '관리자' ? <TouchableOpacity onPress={() => alert('관리자메뉴')}>
                                <View style={[styles.circleIcon, { marginLeft: 118, marginTop: 30 }]}>
                                    <Image source={require('../assets/images/manager.png')} style={{ width: 24, height: 24, marginLeft: 10 }} />
                                </View>
                            </TouchableOpacity> : <View style={{ marginLeft: 215 }}></View>}

                            <TouchableOpacity onPress={() => alert('유저메뉴')}>
                                <View style={[styles.circleIcon, { marginLeft: 8, marginTop: 30 }]}>
                                    <Image source={require('../assets/images/exit.png')} style={{ width: 24, height: 24, marginLeft: 10 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.row3, { marginLeft: 16, marginBottom: 3 }]}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{content[1]}</Text>

                        </View>
                        <View style={[styles.row3, { marginLeft: 16 }]}>
                            <Text style={{ color: '#9C8F4A' }}>{content[2]}</Text>
                            {content[4] === '관리자' ?
                                <Text style={[styles.membernumIcon, { marginLeft: 220 }]}>{content[3]}</Text> :
                                <Text style={[styles.membernumIcon, { marginLeft: 140 }]}>{content[3]}</Text>}
                        </View>
                    </View>
                ))}
                <View style={[styles.row3]}>
                    <TouchableOpacity onPress={() => alert('공강팟 만들기')}>
                        <View style={[styles.makeparty, { marginTop: 50 }]}>
                            <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'medium', verticalAlign: 'middle' }}>+</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.row, { marginTop: 120 }]}>
                    <View style={[styles.promiseboardcontent, { height: 250 }]}>
                        <View style={[styles.row3, { height: 50, marginLeft: 16 }]}>
                            <Text style={styles.title}>약속방에 참가하기</Text>
                        </View>
                        <View style={[styles.row3, { marginLeft: 16 }]}>
                            <Text style={{ fontSize: 16 }}>입장 코드를 입력해주세요</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={handleFocus}>
                            <View style={[styles.row3, { marginLeft: 16, marginTop: 20, marginBottom: 10 }]}>
                                <TextInput style={styles.codeinput} ref={inputRef} placeholder="ex. 1F3W3C" />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableOpacity onPress={handleSubmit}>
                            <View style={[styles.row3, { marginTop: 60 }]}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 130 }}>입장하기</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};
export default Join;