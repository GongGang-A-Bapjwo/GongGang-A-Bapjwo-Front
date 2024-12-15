import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, Modal } from 'react-native';
import { styles } from '../styles';
import { ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
// import { setScrollY } from '../redux/actions/scrollActions';
import Animated from 'react-native-reanimated';

const Join = ({ onSelectManage, onSelectMakeParty }) => {
    const [text, setText] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [ToastFocus, setToastFocus] = useState(false);
    const inputRef = useRef(null);
    const scrollViewRef = useRef(null);
    // const navigation = useNavigation();

    // const scrollY = useSelector((state) => state.scroll.scrollY);

    var group = [['스터디/동아리', '스터디 할 사람을 구합니다', '미정', '1/3', '관리자'],
    ['스터디/동아리', '스터디 할 사람을 구합니다', '미정', '1/3', '관리자'],
    ['밥약', '같이 밥 먹을 사람 구해요', '12:00 - 1:00 (월)', '1/3', '일반유저'],
    ['밥약', '같이 밥 먹을 사람 구해요', '12:00 - 1:00 (월)', '1/3', '일반유저']
    ];

    const handleScroll = (event) => {
        // const currentY = useSelector((state) => state.scroll.scrollY);;
        // dispatch(setScrollY(currentY));
        // console.log('Current scrollY:', scrollY);
    };

    useEffect(() => {
        // 컴포넌트가 렌더링될 때 ScrollView를 제일 아래로 스크롤
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100); // 약간의 지연 추가
    }, []);

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        setIsInputFocused(true);
        console.log('Current scrollY:', scrollY);

        setTimeout(() => {
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({
                    y: scrollY + 60,
                    animated: true,
                });
            }
        }, 50); // 레이아웃 완료를 기다리기 위해 50ms 지연
    };


    const handleBlur = () => {
        setIsInputFocused(false);
    };

    const handleSubmit = () => {
        if (!text || typeof text !== 'string' || !text.trim()) {
            Alert.alert(
                '경고',
                '입장코드를 입력해주세요.',
                [
                    {
                        text: '확인',
                        onPress: () => inputRef.current?.focus(),
                    },
                ]
            );

        } else {
            //Alert.alert('입장코드 확인', 입장코드 ${text}로 입장하시겠습니까?)
            // if (scrollViewRef.current) {
            //     console.log("scroll check");
            //     scrollViewRef.current.scrollTo({
            //         y: 0, // 최상단
            //         animated: true,
            //     });
            // }

            EnterToast();
            console.log("toast message check");
        }
    }

    const EnterToast = () => {
        Toast.show({
            type: 'custom',
            text1: '이 공강팟에 참여하시겠습니까?',
            autoHide: false,
            props: {
                onConfirm: () => console.log('onConfirm'),
                onCancel: () => Toast.hide()
            }
        })
    }

    const ExitToast = () => {
        Toast.show({
            type: 'custom',
            text1: '이 공강팟을 떠나실 건가요?',
            autoHide: false,
            props: {
                onConfirm: () => console.log('onConfirm'),
                onCancel: () => Toast.hide()
            }
        })
    }



    return (
        <ScrollView ref={scrollViewRef}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
            onScroll={handleScroll}
            scrollEventThrottle={16}>

            <View style={[styles.container, styles.container,
            {
                height: isInputFocused
                    ? 600 + group.length * 130
                    : 600 + group.length * 70,
            },]}>
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
                                {content[4] === '관리자' ? <TouchableOpacity onPress={() => onSelectManage()}>
                                    <View style={[styles.circleIcon, { marginLeft: 118, marginTop: 30 }]}>
                                        <Image source={require('../assets/images/manager.png')} style={{ width: 24, height: 24, marginLeft: 10 }} />
                                    </View>
                                </TouchableOpacity> : <View style={{ marginLeft: 215 }}></View>}

                                <TouchableOpacity onPress={() => ExitToast()}>
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
                        <TouchableOpacity onPress={() => onSelectMakeParty()}>
                            <View style={[styles.makeparty, { marginTop: 50 }]}>
                                <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'medium' }}>+</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Toast
                        style={{ backgroundColor: "FCFAF7", borderwidth: 1, borderColor: '#000000', borderRadius: 12 }}
                        config={{
                            custom: ({ text1, props }) => (
                                <View style={styles.customToast}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>{text1}</Text>
                                    <View style={styles.row3}>
                                        <TouchableOpacity onPress={props.onConfirm}>
                                            <Text style={{ fontSize: 20, height: 30, backgroundColor: '#E3DBCF', width: 70, marginTop: 60, textAlign: 'center', marginLeft: 5 }}>확인</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={props.onCancel}>
                                            <Text style={{ fontSize: 20, height: 30, backgroundColor: '#E3DBCF', marginTop: 60, marginLeft: 40, width: 70, textAlign: 'center' }}>취소</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ),
                        }}
                    />
                    <View style={[styles.row, { marginTop: 120 }]}>
                        <View style={[styles.promiseboardcontent, { height: 250 }]}>
                            <View style={[styles.row3, { height: 50, marginLeft: 16 }]}>
                                <Text style={styles.title}>약속방에 참가하기</Text>
                            </View>
                            <View style={[styles.row3, { marginLeft: 16 }]}>
                                <Text style={{ fontSize: 16 }}>입장 코드를 입력해주세요</Text>
                            </View>
                            <View style={[styles.row3, { marginLeft: 16, marginTop: 20, marginBottom: 10 }]}>
                                <TextInput style={styles.codeinput} ref={inputRef} placeholder="ex. 1F3W3C" value={text} onChangeText={setText} onFocus={handleFocus}
                                    onBlur={handleBlur} />
                            </View>
                            <TouchableOpacity onPress={handleSubmit}>
                                <View style={[styles.row3, { marginTop: 60 }]}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 130 }}>입장하기</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};
export default Join