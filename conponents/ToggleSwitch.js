import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { styles } from '../styles';

const ToggleSwitch = () => {
    const [isToggled, setIsToggled] = useState(false);

    const toggleSwitch = () => setIsToggled((prevState) => !prevState);

    return (
        <View style={[styles.row2, styles.pushblock2]}>
            <View style={[styles.row2, { justifyContent: 'left', position: 'relative', top: -90 }]}>
                {!isToggled ? (
                    <Text style={{ marginRight: 15, position: 'relative', left: -25 }}>모든 시간대의 약속 보기</Text>
                ) : (
                    <Text style={{ marginRight: 15, position: 'relative', left: -25 }}>공강 시간대의 약속 보기</Text>
                )}

                <Switch
                    trackColor={{ false: '#D9D9D9', true: '#000000' }}
                    thumbColor={isToggled ? '#D9D9D9' : '#000000'}
                    onValueChange={toggleSwitch}
                    style={{ marginLeft: 90, position: 'relative', left: 30 }}
                    value={isToggled}
                />
            </View>
        </View>
    );
};

export default ToggleSwitch;