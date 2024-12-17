import { styles } from '../styles';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Topsection = () => {
    // console.log('Topsection');
    const navigation = useNavigation(); // navigation 훅 가져오기

    return (
        <View style={[styles.table, { marginTop: 0, height: 100, backgroundColor: '#FCFAF7' }]}>
            <View style={[styles.row, { position: 'relative', top: 12, backgroundColor: '#FCFAF7' }]}>
                <View style={styles.topcellleft}>
                    <TouchableOpacity onPress={() => navigation.navigate('Timetable')}>
                        <Image source={require('../assets/images/calendar.png')} style={{ width: 24, height: 24, position: 'relative', left: -16 }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.topcellmiddle}>
                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>공강아밥줘</Text>
                </View>
                <View style={styles.topcellright}>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <Image source={require('../assets/images/settings.png')} style={{ width: 24, height: 24, position: 'relative', left: 16 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
export default Topsection;