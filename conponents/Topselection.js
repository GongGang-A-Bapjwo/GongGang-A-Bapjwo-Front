import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import { useNavigation } from '@react-navigation/native';
import Today from '../screens/Today';
import Join from '../screens/Join';

const Topselection = () => {
    const [selectedIndex, setSelectedIndex] = useState(0); // 선택된 버튼의 인덱스 상태

    const toggleOptions = [
        { label: 'Today', value: 'Today' },
        { label: 'Join', value: 'Join' },
    ];

    return (
        <>
            <View style={[styles.table, styles.header]}>
                <View style={styles.togglerow}>
                    {toggleOptions.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => { setSelectedIndex(index) }} // 선택된 버튼의 인덱스 저장
                            style={[
                                styles.togglecell,
                                selectedIndex === index && styles.toggleselectedcell, // 선택된 버튼 스타일 적용
                            ]}
                        >
                            <Text
                                style={[
                                    styles.togglecellText,
                                    selectedIndex === index && styles.toggleselectedcellText, // 선택된 텍스트 스타일 적용
                                ]}
                            >
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            {/* 선택된 인덱스를 판단해서 아래에 해당하는 페이지 라우팅 */}
            {selectedIndex === 0 ? <Today /> : <Join />}
        </>
    );
};

export default Topselection;