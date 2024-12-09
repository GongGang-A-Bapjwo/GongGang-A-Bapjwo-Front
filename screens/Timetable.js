import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { GestureHandlerRootView, ScrollView, Switch } from 'react-native-gesture-handler';
import { styles } from '../styles';

const Timetable = () => {
    return (
        <>
            <Text style={{ fontSize: 22, fontWeight: 'bold', alignItems: 'left', marginLeft: 20, marginTop: 20 }}>시간표</Text>
            <Image source={require('../assets/images/timetable.png')} style={{ width: 340, height: 600, marginLeft: 20, marginTop: 10 }} />
        </>
    );
}

export default Timetable;