import React, { useState } from 'react';
import { View, Text, Touchable, TouchableOpacity, Alert, Image } from 'react-native';
import { styles } from '../styles';

const Matching = ({ onBack }) => {
    var rawdata = [['월', '15-17'], ['금', '16-17'], ['화', '9-11'], ['목', '11-15']]
    // var rawdata = []
    var processeddata = []
    const [pressedIndex, setPressedIndex] = useState(null);

    const handlePress = (pressedIndex) => {
        if (pressedIndex === null) {
            Alert.alert('시간을 선택해주세요')
        } else {
            Alert.alert(`${pressedIndex + 1} 번 을 선택하셨습니다`)
        }
    }

    for (var i = 0; i < rawdata.length; i++) {
        var day = rawdata[i][0]
        var times = rawdata[i][1].split('-') // 예: ['15','17']

        // 각 시간을 숫자로 변환
        var hours = times.map(h => parseInt(h, 10))

        let ampm1 = hours[0] > 12 ? 'P' : 'A'

        let ampm2 = hours[1] > 12 ? 'P' : 'A'

        // 12시간제로 변환 (시간이 12보다 클 경우 12를 빼줌)
        var converted = hours.map(h => String(h > 12 ? h - 12 : h))

        // 원하는 형태: ['월', 3,5,'PM'] 또는 ['금', 4,5,'PM']
        processeddata.push([day, ...converted, ampm1, ampm2])
    }

    return (
        <View style={styles.container}>
            <View style={styles.table}>
                <View style={[styles.row3, { marginTop: 30, height: 30 }]}>
                    <Text style={styles.title}>시간 잡기</Text>
                </View>
                <View style={styles.row3}>
                    <View style={[styles.promiseboardcontent, { marginTop: 270, height: 250 }]}>
                        <View style={[styles.row3]}>
                            <Text style={[styles.match, { marginTop: 30 }]}>이 공강팟의</Text>
                        </View>
                        <View style={[styles.row3, { marginTop: 10 }]}>
                            <Text style={[styles.match, { height: 30 }]}>시간대를 아래에서 선택해주세요</Text>
                        </View>
                        {processeddata.length === 0 ?
                            <View style={{ marginTop: 20 }}>
                                <Image source={require('../assets/images/box.png')} style={{ width: 80, height: 80, marginLeft: 120 }} />
                                <Text style={{ marginTop: 20, fontSize: 15, width: 330, textAlign: 'center' }}>가능한 시간이 없어요</Text>
                            </View>
                            :
                            <View style={{ marginTop: 20 }}>
                                {processeddata.map((content, index) => (
                                    <TouchableOpacity onPress={() => { alert(`${index + 1}`); setPressedIndex(index); }} style={{ backgroundColor: pressedIndex === index ? '#C3C3C3' : '#FCFAF7', opacity: 0.7, borderRadius: 12 }}>
                                        <View style={[styles.row3, { marginTop: 15 }]}>
                                            <Text style={[styles.match, { fontWeight: 'middle' }]} key={index}>{index + 1} . ({content[0]}) {content[1]} {content[3]}M ~ {content[2]} {content[4]}M</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        }
                    </View>
                </View>
                {processeddata.length === 0 ?
                    <TouchableOpacity onPress={() => onBack()}>
                        <View style={[styles.row3, { marginTop: 300, backgroundColor: '#D8D3B9', width: 120, height: 35, justifyContent: 'center' }]}>
                            <Text style={{ fontSize: 18 }}>돌아가기</Text>
                        </View>
                    </TouchableOpacity>
                    : <TouchableOpacity onPress={() => handlePress(pressedIndex)}>
                        <View style={[styles.row3, { marginTop: 300, backgroundColor: '#D8D3B9', width: 120, height: 35, justifyContent: 'center' }]}>
                            <Text style={{ fontSize: 18 }}>선택하기</Text>
                        </View>
                    </TouchableOpacity>}
            </View>
        </View >
    )
}

export default Matching;