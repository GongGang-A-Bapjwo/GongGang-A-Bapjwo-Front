import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles';

const FreeTimeNoticeTitle = () => {
    return (
        <View style={styles.table}>
            <View style={[styles.row, { marginbottom: 30 }]}>
                <Image source={require('../assets/images/calendarcheck.png')} style={{ width: 32, height: 32 }} />
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginHorizontal: 10, marginRight: 115 }}>오늘의 공강(월)</Text>
                <Image source={require('../assets/images/listline.png')} style={{ width: 32, height: 32 }} />
            </View>
        </View>
    )
}

export default FreeTimeNoticeTitle;