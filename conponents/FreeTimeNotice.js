import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles';
import FreeTimeNoticeTitle from './FreeTimeNoticeTitle';
import { ScrollView } from 'react-native-gesture-handler';

const FreeTimeNotice = () => {
    var Time = ['11:00 AM - 1:00 PM', '3:00 PM - 4:00 PM', '6:00 PM - 8:00 PM', '9:00 PM - 10:00 PM'];
    //json으로 받아온 시간을 4개씩 나누어 저장 & 나중에 map으로 뿌려주기
    return (
        <>
            <FreeTimeNoticeTitle />
            <View style={styles.table}>
                <View style={[styles.row, { marginTop: 5 }]}>
                    <View style={styles.freebox}>
                        <Image source={require('../assets/images/calendarcheck.png')} style={{ width: 24, height: 24, margin: 13 }} />
                        <Text style={styles.freeboxtitle}>공강</Text>
                        <Text style={styles.freeboxtime}>{Time[0]}</Text>
                    </View>
                    <View style={[styles.freebox, styles.rightbox]}>
                        <Image source={require('../assets/images/calendarcheck.png')} style={{ width: 24, height: 24, margin: 16 }} />
                        <Text style={styles.freeboxtitle}>공강</Text>
                        <Text style={styles.freeboxtime}>{Time[1]}</Text>
                    </View>
                </View>
                <View style={[styles.row, styles.pushblock]}>
                    <View style={styles.freebox}>
                        <Image source={require('../assets/images/calendarcheck.png')} style={{ width: 24, height: 24, margin: 16 }} />
                        <Text style={styles.freeboxtitle}>공강</Text>
                        <Text style={styles.freeboxtime}>{Time[2]}</Text>
                    </View>
                    <View style={[styles.freebox, styles.rightbox]}>
                        <Image source={require('../assets/images/calendarcheck.png')} style={{ width: 24, height: 24, margin: 16 }} />
                        <Text style={styles.freeboxtitle}>공강</Text>
                        <Text style={styles.freeboxtime}>{Time[3]}</Text>
                    </View>
                </View>
            </View>
        </>
    )
}

export default FreeTimeNotice;