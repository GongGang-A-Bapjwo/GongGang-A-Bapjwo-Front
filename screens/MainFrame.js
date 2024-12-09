import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { GestureHandlerRootView, ScrollView, Switch } from 'react-native-gesture-handler';
import { styles } from '../styles';
import Topsection from '../conponents/Topsection';
import Topselection from '../conponents/Topselection';
import Today from './Today';

const MainFrame = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={[styles.container]}>
                <ScrollView
                    horizontal={false} // 세로 스크롤만 활성화
                    contentContainerStyle={{ flexGrow: 1, width: '100%' }} // 컨텐츠가 화면 너비를 초과하지 않도록 설정
                    showsVerticalScrollIndicator={true} // 세로 스크롤 표시
                    style={{ width: '100%' }} // ScrollView 자체도 화면 너비에 맞게 설정
                >
                    <Topselection />
                    {/* join 선택 시 이 아래 리다이렉트 */}
                </ScrollView>
            </View >
        </GestureHandlerRootView >
    );
}

export default MainFrame;