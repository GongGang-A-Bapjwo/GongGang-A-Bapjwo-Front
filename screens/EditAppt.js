import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';
import HorizontalScroll from '../conponents/HorizontalScroll';
import { TextInput } from 'react-native-gesture-handler';

const EditAppt = () => {
    const [category, setCategory] = useState('전체');
    return (
        <View style={styles.container}>
            <View style={styles.table}>
                <View style={[styles.row3, { marginTop: 30 }]}>
                    <Text style={[styles.title, { height: 40 }]}>공강팟 설정 변경</Text>
                </View>
                <View style={[styles.row3, { marginTop: 240 }]}>
                    <View style={[styles.promiseboardcontent, { height: 500 }]}>
                        <View style={[styles.row3]}>
                            <Text style={[styles.row3, styles.title, { height: 40, flex: 1, paddingLeft: 25, marginBottom: 40 }]}>공강팟 카테고리</Text>
                        </View>
                        <View style={[styles.row3]}>
                            <HorizontalScroll />
                            {/* 나중에 카테고리 가져와서 넣기 */}
                        </View>
                        <View style={[styles.row3]}>
                            <Text style={[styles.title, {
                                height: 40, flex: 1, paddingLeft: 25, marginTop: 70
                            }]}>공강팟</Text>
                        </View>
                        <View style={[styles.row3]}>
                            <TextInput
                                name='partycontent'
                                placeholder='공강팟의 간단 설명을 20자 이내로 입력해주세요'
                                style={{ backgroundColor: '#F7F5F2', marginTop: 10, height: 74, width: 280, marginLeft: 25, marginTop: 140, borderRadius: 12, borderColor: '#E3DBCF', borderWidth: 1 }}
                            />
                        </View>
                        <View style={[styles.row3]}>
                            <Text style={[styles.title, { height: 40, flex: 1, paddingLeft: 25, marginTop: 250 }]}>참여 인원</Text>
                        </View>

                        <View style={[styles.row3]}>
                            <Text style={{ height: 50, flex: 1, paddingLeft: 25, marginTop: 280 }}>
                                <Text style={[styles.circleIcon, { fontSize: 25, backgroundColor: '#eee' }]}>1</Text> / <Text style={styles.circleIcon}>3</Text> 명
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View >
    )
}

export default EditAppt;