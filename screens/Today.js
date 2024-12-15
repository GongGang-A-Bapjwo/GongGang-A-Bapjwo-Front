import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import FreeTimeNotice from '../conponents/FreeTimeNotice';
import BoardNotice from '../conponents/BoardNotice';
import HorizontalScroll from '../conponents/HorizontalScroll';
import PromiseBoard from '../conponents/PromiseBoard';
import { styles } from '../styles';

const Today = () => {
    const [isToggled, setIsToggled] = useState(false);

    const toggleSwitch = () => setIsToggled((prevState) => !prevState);

    return (
        <>
            {/* 공강 알림 */}
            <FreeTimeNotice />

            {/* 약속 보기 Toggle */}
            <View style={[styles.row2, styles.pushblock2]}>
                <View style={[styles.row2, { justifyContent: 'flex-start', position: 'relative', top: -90 }]}>
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
            <BoardNotice istoggle={isToggled} />

            {/* 스크롤 가능한 약속 보드 */}
            <HorizontalScroll />

            {/* 약속 보드 */}
            <PromiseBoard istoggle={isToggled} />
        </>
    );
};

export default Today;
