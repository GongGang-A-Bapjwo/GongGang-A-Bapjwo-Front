import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { GestureHandlerRootView, ScrollView, Switch } from 'react-native-gesture-handler';
import { styles } from '../styles';
import ToggleSwitch from '../conponents/ToggleSwitch';
import Topsection from '../conponents/Topsection';
import Topselection from '../conponents/Topselection';
import FreeTimeNotice from '../conponents/FreeTimeNotice';
import BoardNotice from '../conponents/BoardNotice';
import HorizontalScroll from '../conponents/HorizontalScroll';
import PromiseBoard from '../conponents/PromiseBoard';

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
                    <Topsection />
                    <Topselection />
                    <FreeTimeNotice />
                    <ToggleSwitch />
                    <BoardNotice />
                    <HorizontalScroll />
                    <PromiseBoard />
                </ScrollView>
            </View >
        </GestureHandlerRootView >
    );
}

export default MainFrame;