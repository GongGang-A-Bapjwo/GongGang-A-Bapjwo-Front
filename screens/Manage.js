import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { ScrollView } from 'react-native-gesture-handler';

const Manage = ({ onSelectOption1, onSelectOption2 }) => {
    return (
        <ScrollView contentContainerStyle={[styles.container]}>
            <View style={[styles.container]} >
                <View style={[styles.table, { marginTop: 30 }]}>
                    <View style={[styles.row3, { marginBottom: 30, height: 30, textAlign: 'Top' }]}>
                        <Text style={[styles.title]}>공팟장 옵션</Text>
                    </View>
                    <View style={[styles.row3]}>
                        <View style={[styles.promiseboardcontent, { height: 300, marginTop: 250 }]}>
                            <View style={[styles.row3, { marginLeft: 20, height: 20 }]}>
                                <Text style={[styles.partyview]}>벌써 <Text style={{ fontSize: 60 }}>2</Text> 명이 </Text>
                            </View>
                            <View style={[styles.row3, { marginTop: 20, height: 60, width: 320, marginLeft: 20 }]}>
                                <Text style={[styles.partyview, { marginTop: 40 }]}>함께했어요!</Text>
                            </View>
                            <View style={[styles.row3, { height: 60, width: 320, marginLeft: 20 }]}>
                                <Text style={[styles.partyview, { marginBottom: 30 }]}>이제 <Text style={{ fontSize: 60 }}>1</Text> 명만 더 오면 </Text>
                            </View>
                            <View style={[styles.row3, { height: 30, width: 320, marginLeft: 20 }]}>
                                <Text style={[styles.partyview, { marginTop: 50 }]}>모두 모여서</Text>
                            </View>
                            <View style={[styles.row3, { height: 20, width: 320, marginLeft: 20 }]}>
                                <Text style={[styles.partyview, { marginTop: 90 }]}>만날 시간을 정할 수 있어요</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.row3}>
                        <View style={[styles.promiseboardcontent, { marginTop: 630, height: 94 }]}>
                            <TouchableOpacity onPress={() => onSelectOption1()}>
                                <View style={styles.row3}>
                                    <Text style={[styles.title, { fontSize: 20, height: 30, marginLeft: 16 }]}>공강팟 시간 추출하기</Text>
                                </View>
                                <View style={styles.row3}>
                                    <Text style={{ marginTop: 30, height: 30, marginLeft: 16 }}>모임 시간을 결정하고 싶다면 여기를 터치하세요</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.row3}>
                        <View style={[styles.promiseboardcontent, { marginTop: 810, height: 94 }]}>
                            <TouchableOpacity onPress={() => onSelectOption2()}>
                                <View style={styles.row3}>
                                    <Text style={[styles.title, { fontSize: 20, height: 30, marginLeft: 16 }]}>공강팟 설정 변경하기</Text>\
                                </View>
                                <View style={styles.row3}>
                                    <Text style={{ marginTop: 30, height: 30, marginLeft: 16 }}>공강팟의 설정을 수정하고 싶다면 여기를 터치하세요</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView >
    );
}

export default Manage;