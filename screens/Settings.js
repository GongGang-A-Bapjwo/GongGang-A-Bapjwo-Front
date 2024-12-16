import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

const Settings = () => {
    return (
        <View style={styles.container}>
            <View style={[styles.table, { width: 340, height: 200, borderWidth: 1, borderColor: '#E8E3CF', borderRadius: 12, marginTop: 16, position: 'relative', left: 30, top: 20 }]}>
                <View style={[styles.row2, { marginTop: 0 }]}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginRight: 200 }}>시간표 변경</Text>
                </View>
                <TouchableOpacity onPress={() => alert('자동 변겅')}>
                    <View style={[styles.row2, { width: 300, height: 50, justifyContent: 'center', borderWidth: 1, borderColor: '#E8E3CF', borderRadius: 12, marginBottom: 16 }]}>
                        <Text style={{ fontSize: 16 }}>에브리타임 시간표를 통해 자동으로 변경</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert('수동 변경')}>
                    <View style={[styles.row2, { width: 300, height: 50, justifyContent: 'center', borderWidth: 1, borderColor: '#E8E3CF', borderRadius: 12, }]}>
                        <Text style={{ fontSize: 16 }}>수동으로 시간표 변경</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Settings;