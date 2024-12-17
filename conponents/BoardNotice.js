import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles';

const BoardNotice = ({ istoggle }) => {
    return (
        <View style={[styles.row2, { height: 25, marginTop: 10, position: 'relative', top: -90, left: -30 }]}>
            {!istoggle ? (
                <>
                    <Image source={require('../assets/images/thunder.png')} style={{ width: 32, height: 32 }} />
                    <Text style={[{ marginRight: 15, position: 'relative', left: -10, fontWeight: 'bold', fontSize: 20 }]}>지금 참여할 수 있는 약속</Text>
                </>
            ) : (
                <>

                    <Image source={require('../assets/images/clipboard.png')} style={{ width: 32, height: 32 }} />
                    <Text style={[{ marginRight: 15, position: 'relative', left: 10, fontWeight: 'bold', fontSize: 20 }]}>모든 약속 한눈에 보기</Text>
                </>
            )}
        </View>
    )
}

export default BoardNotice;