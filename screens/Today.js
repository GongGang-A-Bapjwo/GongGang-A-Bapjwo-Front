import React, { useState } from 'react';
import { View, Text, Switch, Image, TouchableOpacity, ScrollView } from 'react-native';
import FreeTimeNotice from '../conponents/FreeTimeNotice';
import BoardNotice from '../conponents/BoardNotice';
import HorizontalScroll from '../conponents/HorizontalScroll';
import PromiseBoard from '../conponents/PromiseBoard';
import { styles } from '../styles';

const Today = () => {
    const [isToggled, setIsToggled] = useState(false);
    const [textSizes, setTextSizes] = useState({});
    const [pressedIndex, setPressedIndex] = useState(null); // 현재 터치된 항목의 인덱스
    const categories = ['전체', '스터디', '밥약', '상담', '기타'];
    const toggleSwitch = () => setIsToggled((prevState) => !prevState);

    const handleTextLayout = (index, event) => {
        const { width } = event.nativeEvent.layout; // 텍스트의 너비 계산
        setTextSizes((prevSizes) => ({
            ...prevSizes,
            [index]: width, // 각 텍스트의 인덱스별로 크기 저장
        }));
    };


    return (
        <View>
            {/* 공강 알림 */}
            <FreeTimeNotice />

            {/* 약속 보기 Toggle */}
            <View style={[styles.row2, styles.pushblock2]}>
                <View style={[styles.row2, { justifyContent: 'flex-start', position: 'relative', top: -50 }]}>
                    <Text style={{ marginRight: 15, position: 'relative', left: -25 }}>
                        {isToggled ? '공강 시간대의 약속 보기' : '모든 시간대의 약속 보기'}
                    </Text>
                    <Switch
                        trackColor={{ false: '#D9D9D9', true: '#000000' }}
                        thumbColor={isToggled ? '#D9D9D9' : '#000000'}
                        onValueChange={toggleSwitch}
                        style={{ marginLeft: 90, position: 'relative', left: 30 }}
                        value={isToggled}
                    />
                </View>
            </View>

            {/* 보드 제목 */}
            <View style={[styles.row2, { height: 25, marginTop: 10, position: 'relative', top: -50, left: -40 }]}>
                {!isToggled ? (
                    <>
                        <Image source={require('../assets/images/thunder.png')} style={{ width: 32, height: 32 }} />
                        <Text style={[{ marginRight: 15, position: 'relative', left: 0, fontWeight: 'bold', fontSize: 20, top: -3 }]}>지금 참여할 수 있는 약속</Text>
                    </>
                ) : (
                    <>

                        <Image source={require('../assets/images/clipboard.png')} style={{ width: 32, height: 32, position: 'relative', left: -10 }} />
                        <Text style={[{ marginRight: 15, position: 'relative', left: 0, fontWeight: 'bold', fontSize: 20, top: -3 }]}>모든 약속 한눈에 보기</Text>
                    </>
                )}
            </View>
            {/* 스크롤 가능한 약속 보드 */}
            <View style={[styles.row, { position: 'relative', top: -50 }]}>
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
                                { width: (textSizes[index] || 0) + 35 },
                                {
                                    backgroundColor: pressedIndex === index ? '#C3C3C3' : '#F5F2E8', // 현재 선택된 항목만 색 변경
                                },
                            ]}
                            onPress={() => setPressedIndex(index)}

                        >
                            <Text
                                style={styles.scrollviewtext}
                                onLayout={(event) => handleTextLayout(index, event)}
                            >
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* 약속 보드 */}
            <PromiseBoard istoggle={isToggled} />
        </View>
    );
};

export default Today;
