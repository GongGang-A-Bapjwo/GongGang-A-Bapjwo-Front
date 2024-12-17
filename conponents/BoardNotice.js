import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles';

const BoardNotice = ({ istoggle }) => {
    return (
        <View style={[styles.row2, { height: 25, marginTop: 10, position: 'relative', top: -90, left: -70 }]}>
            <Image source={require('../assets/images/clipboard.png')} style={{ width: 32, height: 32 }} />
            {!istoggle ? (
                <Text style={[{ marginRight: 15, position: 'relative', left: 0, fontWeight: 'bold' }]}>모든 시간대의 약속 보기</Text>
            ) : (
                <Text style={[{ marginRight: 15, position: 'relative', left: 0, fontWeight: 'bold' }]}>공강 시간대의 약속 보기</Text>
            )}
        </View>
    )
}

export default BoardNotice;