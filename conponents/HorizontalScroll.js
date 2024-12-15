import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';

const HorizontalScroll = () => {
    const [textSizes, setTextSizes] = useState({});
    const [pressedIndex, setPressedIndex] = useState(null); // 현재 터치된 항목의 인덱스

    const handleTextLayout = (index, event) => {
        const { width } = event.nativeEvent.layout; // 텍스트의 너비 계산
        setTextSizes((prevSizes) => ({
            ...prevSizes,
            [index]: width, // 각 텍스트의 인덱스별로 크기 저장
        }));
    };

    const categories = ['전체', '스터디/동아리', '밥약', '상담', '기타'];

    return (
        <View style={[styles.row, { position: 'relative', top: -90 }]}>
            <ScrollView
                horizontal={true}
                style={[styles.scrollview, { marginLeft: 20, marginTop: 0 }]}
                contentContainerStyle={styles.scrollviewContentContainer}
                showsHorizontalScrollIndicator={false}
            >
                {categories.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.scrollviewcontent,
                            { width: (textSizes[index] || 0) + 30 },
                            {
                                backgroundColor: pressedIndex === index ? '#C3C3C3' : '#F5F2E8', // 현재 선택된 항목만 색 변경
                            },
                        ]}
                        onPress={() => setPressedIndex(index)}

                    >
                        <Text
                            style={styles.scrollviewtext}
                            onLayout={(event) => handleTextLayout(index, event)}
                        >
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default HorizontalScroll;