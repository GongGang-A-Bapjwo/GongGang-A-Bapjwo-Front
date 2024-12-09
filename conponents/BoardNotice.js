import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles';

const BoardNotice = () => {
    return (
        <View style={[styles.row2, { height: 25, marginTop: 10 }]}>
            <Image source={require('../assets/images/clipboard.png')} style={{ width: 32, height: 32 }} />
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginLeft: 13, marginRight: 110 }}>모든 약속 한 눈에 보기</Text>
        </View>
    )
}

export default BoardNotice;