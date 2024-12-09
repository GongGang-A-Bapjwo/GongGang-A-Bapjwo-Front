import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

const Settings = () => {
    return (
        <View style={styles.table}>
            <View style={styles.row2}>
                <Text>시간표 변경</Text>
                <View style={[styles.row2, { width: 300, height: 73 }]}>
                    <Text>에브리타임 시간표를 통해 자동으로 변경</Text>
                </View>
            </View>
        </View>
    );
}

export default Settings;