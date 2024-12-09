import { styles } from '../styles';
import { View, Text, Image } from 'react-native';
import React from 'react';

const Topsection = () => {
    return (
        <View style={[styles.table, { marginTop: 25 }]}>
            <View style={styles.row}>
                <View style={styles.topcellleft}>
                    <Image source={require('../assets/images/calendar.png')} style={{ width: 24, height: 24 }} />
                </View>
                <View style={styles.topcellmiddle}>
                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>공강아밥줘</Text>
                </View>
                <View style={styles.topcellright}>

                    <Image source={require('../assets/images/settings.png')} style={{ width: 24, height: 24 }} />
                </View>
            </View>
        </View>
    );
}
export default Topsection;