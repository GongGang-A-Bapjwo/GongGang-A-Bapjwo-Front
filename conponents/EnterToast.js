import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import Toast from 'react-native-toast-message';

const EnterToast = () => {
    const CustonToast = () => {
        setIsToastVisible(true);

        Toast.show({
            type: 'custom',
            text1: '이 공강팟에 참여하시겠습니까?',
            autoHide: false,
            props: {
                onConfirm: () => console.log('onConfirm'),
                onCancel: () => Toast.hide()
            }
        })
    }
    return (
        <Toast
            style={{ backgroundColor: "FCFAF7", borderwidth: 1, borderColor: '#000000', borderRadius: 12 }}
            config={{
                custom: ({ text1, props }) => (
                    <View style={styles.customToast}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>{text1}</Text>
                        <View style={styles.row3}>
                            <TouchableOpacity onPress={props.onConfirm}>
                                <Text style={{ fontSize: 20, height: 30, backgroundColor: '#E3DBCF', width: 70, marginTop: 60, textAlign: 'center', marginLeft: 5 }}>확인</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={props.onCancel}>
                                <Text style={{ fontSize: 20, height: 30, backgroundColor: '#E3DBCF', marginTop: 60, marginLeft: 40, width: 70, textAlign: 'center' }}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ),
            }}
        />)
}

export default EnterToast;