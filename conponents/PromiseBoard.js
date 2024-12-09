import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

const PromiseBoard = () => {
    var promiseboardcontentcategory = ['스터디/동아리', '밥약', '상담', '기타'];
    var promiseboardcontenttime = ['11:00 AM ~ 12:0 PM', '12:00 PM ~ 1:00 PM', '1:00 PM ~ 2:00 PM', '2:00 PM ~ 3:00 PM'];
    const promiseData = promiseboardcontentcategory.map((category, index) => ({
        category,
        time: promiseboardcontenttime[index] || '시간 없음', // 시간 없을 경우 기본값
    }));

    return (
        <View>
            {promiseData.map((content, index) => (
                <View
                    key={index} // 고유 키 설정
                    style={[
                        styles.row2,
                        index !== 0 && { marginTop: 45 }, // 첫 번째 요소가 아니면 marginTop 적용
                        index === promiseData.length - 1 && { marginBottom: 70 }, // 마지막 요소면 marginBottom 적용
                    ]}
                >
                    <View style={styles.promiseboardcontent}>
                        <Text style={styles.promiseboardcontenttext}>{content.category}</Text>
                        <Text style={styles.promiseboardcontenttime}>{content.time}</Text>
                    </View>
                </View>
            ))}
        </View>
    )
}

export default PromiseBoard;