import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={[styles.table, { width: 360, height: 200, borderWidth: 1, borderColor: '#E8E3CF', borderRadius: 12, marginTop: 16, position: 'relative', left: 25, top: -10 }]}>
                <View style={[styles.row2, { marginTop: 0 }]}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginRight: 200, position: 'relative', top: -8 }}>시간표 변경</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('UploadPhoto')}>
                    <View style={[styles.row2, { width: 320, height: 50, justifyContent: 'center', borderWidth: 1, borderColor: '#E8E3CF', borderRadius: 12, marginBottom: 16 }]}>
                        <Text style={{ fontSize: 16, color: '#8F7552' }}>에브리타임 시간표를 통해 자동으로 변경</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity >
                    <View style={[styles.row2, { width: 320, height: 50, justifyContent: 'center', borderWidth: 1, borderColor: '#E8E3CF', borderRadius: 12, }]}>
                        <Text style={{ fontSize: 16, color: '#8F7552' }}>수동으로 시간표 변경</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Settings;