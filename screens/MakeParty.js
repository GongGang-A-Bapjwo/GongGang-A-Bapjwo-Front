import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { styles } from '../styles';
import HorizontalScroll from '../conponents/HorizontalScroll';
import { TextInput } from 'react-native-gesture-handler';

const MakeParty = () => {
    const [partycontent, setPartycontent] = useState('');
    const [memNum1, setMemNum1] = useState(1);
    const [memNum2, setMemNum2] = useState(1);
    const [focused, setFocused] = useState(false);

    const dismissKeyboard = () => {
        Keyboard.dismiss();
        setFocused(false);
    };

    const handleTextChange1 = (text) => {
        // memNum1 상태 업데이트
        setMemNum1(text.replace(/[^0-9]/g, ""));
    };

    const handleTextChange2 = (text) => {
        // memNum2 상태 업데이트
        setMemNum2(text.replace(/[^0-9]/g, ""));
    };

    const handleTextChangePartycontent = (text) => {
        // partycontent 상태 업데이트
        setPartycontent(text);
    };

    const memalert = () => {
        if (memNum1 > memNum2) {
            Alert.alert('전체 멤버 수는 항상 현재 참여 멤버 수보다 많아야합니다')
            setMemNum1(1)
            setMemNum2(1)
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View >
                    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
                        <View style={[styles.container, {
                            height: focused
                                ? 400
                                : 500,
                        }]}>
                            <View style={styles.table}>
                                <View style={[styles.row3, { marginTop: 30 }]}>
                                    <Text style={[styles.title, { height: 40 }]}>공강팟 만들기</Text>
                                </View>
                                <View style={[styles.row3, { marginTop: 210 }]}>
                                    <View style={[styles.promiseboardcontent, { height: 430 }]}>
                                        <View style={[styles.row3]}>
                                            <Text style={[styles.row3, styles.title, { height: 50, flex: 1, paddingLeft: 25, marginBottom: 40 }]}>공강팟 카테고리</Text>
                                        </View>
                                        <View style={[styles.row3]}>
                                            <HorizontalScroll />
                                            {/* 나중에 카테고리 가져와서 넣기 */}
                                        </View>
                                        <View style={[styles.row3]}>
                                            <Text style={[styles.title, {
                                                height: 40, flex: 1, paddingLeft: 25, marginTop: 70
                                            }]}>공강팟</Text>
                                        </View>
                                        <View style={[styles.row3]}>
                                            {/* 나중에 글자수 세는 기능 추가할 것 */}
                                            <TextInput
                                                name='partycontent'
                                                placeholder='공강팟의 간단 설명을 20자 이내로 입력해주세요'
                                                multiline={true}
                                                value={partycontent}
                                                editable={true}
                                                onChangeText={handleTextChangePartycontent}
                                                style={{ backgroundColor: '#F7F5F2', marginTop: 10, height: 74, width: 280, marginLeft: 25, marginTop: 140, borderRadius: 12, borderColor: '#E3DBCF', borderWidth: 1 }}
                                            />
                                        </View>
                                        <View style={[styles.row3]}>
                                            <Text style={[styles.title, { height: 40, flex: 1, paddingLeft: 25, marginTop: 250 }]}>참여 인원</Text>
                                        </View>

                                        <View style={[styles.row3, { alignItems: 'center' }]}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    height: 50,
                                                    flex: 1,
                                                    paddingLeft: 25,
                                                    marginTop: 280,
                                                }}
                                            >
                                                <View
                                                    style={[
                                                        styles.circleIcon,
                                                        {
                                                            width: 28,
                                                            height: 28,
                                                            backgroundColor: '#DAD2B4',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        },
                                                    ]}
                                                >
                                                    <TextInput
                                                        style={{ fontSize: 25, textAlign: 'center' }}
                                                        value={memNum1} // 상태 값으로 지정
                                                        keyboardType="numeric" // 숫자 키패드 표시
                                                        onChangeText={handleTextChange1} // 값 변경 시 상태 업데이트
                                                        placeholder="1" // 값이 없을 때 표시될 기본값
                                                        onFocus={() => setFocused(true)}
                                                        onBlur={() => setFocused(false)}
                                                    />
                                                    {/* //나중에 참여 인원 나누어서 바꾸기 */}
                                                </View>

                                                <Text
                                                    style={{
                                                        fontSize: 25,
                                                        textAlign: 'center',
                                                        marginHorizontal: 5,
                                                    }}
                                                >
                                                    /
                                                </Text>

                                                <View
                                                    style={[
                                                        styles.circleIcon,
                                                        {
                                                            width: 28,
                                                            height: 28,
                                                            backgroundColor: '#DAD2B4',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        },
                                                    ]}
                                                >
                                                    <TextInput
                                                        style={{ fontSize: 25, textAlign: 'center' }}
                                                        value={memNum2} // 상태 값으로 지정
                                                        keyboardType="numeric" // 숫자 키패드 표시
                                                        onChangeText={handleTextChange2} // 값 변경 시 상태 업데이트
                                                        editable={true} // 수정 가능
                                                        placeholder="1" // 값이 없을 때 표시될 기본값
                                                        onFocus={() => setFocused(true)}
                                                        onBlur={() => setFocused(false)}
                                                    />
                                                </View>

                                                <Text
                                                    style={{
                                                        fontSize: 23,
                                                        fontWeight: 'bold',
                                                        paddingLeft: 8,
                                                    }}
                                                >
                                                    명
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={[styles.row3, { marginTop: 180 }]}>
                                            <TouchableOpacity onPress={() => alert('수정')} style={[styles.okbutton, { marginTop: 0, flix: 1, marginLeft: 100, backgroundColor: '#eee' }]}>
                                                <View style={[styles.okbutton, { marginTop: 0 }]}>
                                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>선택하기</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View >
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    )
}

export default MakeParty;