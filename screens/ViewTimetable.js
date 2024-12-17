import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";

const ViewTimetable = ({ route }) => {
    const navigation = useNavigation(); // navigation 훅 가져오기
    const rawData = route.params || {}; // 전달받은 데이터를 object로 초기화
    console.log("Raw Data:", rawData);

    const data = Array.isArray(rawData.data) ? rawData.data : []; // 올바른 데이터만 처리
    console.log("Parsed Data:", data);

    const tableHead = ["시간", "월", "화", "수", "목", "금"];
    const tableData = Array.from({ length: 13 }, (_, i) => [`${9 + i}`, "", "", "", "", ""]);

    const weekdayMap = {
        MONDAY: 1,
        TUESDAY: 2,
        WEDNESDAY: 3,
        THURSDAY: 4,
        FRIDAY: 5,
    };

    const timeMap = {
        "09:00": 0,
        "10:00": 1,
        "11:00": 2,
        "12:00": 3,
        "13:00": 4,
        "14:00": 5,
        "15:00": 6,
        "16:00": 7,
        "17:00": 8,
        "18:00": 9,
        "19:00": 10,
        "20:00": 11,
        "21:00": 12,
    };

    const [selectedCells, setSelectedCells] = useState(
        Array.from({ length: 13 }, () => Array(6).fill(false)) // 초기값: 모든 셀 선택 안 됨
    );

    useEffect(() => {
        const initializeCells = () => {
            if (data.length > 0) {
                const updatedCells = Array.from({ length: 13 }, () => Array(6).fill(false)); // 초기값

                data.forEach(({ weekday, startTime, endTime }) => {
                    const colIndex = weekdayMap[weekday]; // 요일 열 인덱스
                    const startRow = timeMap[startTime]; // 시작 행 인덱스
                    const endRow = timeMap[endTime]; // 종료 행 인덱스

                    if (
                        colIndex !== undefined &&
                        startRow !== undefined &&
                        endRow !== undefined &&
                        startRow <= endRow &&
                        colIndex >= 1 &&
                        colIndex <= 5 &&
                        startRow >= 0 &&
                        endRow < 13
                    ) {
                        for (let rowIndex = startRow; rowIndex < endRow; rowIndex++) {
                            if (!updatedCells[rowIndex][colIndex]) {
                                updatedCells[rowIndex][colIndex] = true; // 선택되지 않은 경우에만 선택
                            }
                        }
                    }
                });

                // rowIndex가 12인 경우 수동 처리
                updatedCells[12].forEach((_, colIndex) => {
                    if (colIndex > 0 && colIndex < 6) { // 첫 번째 열 제외 (시간 열)
                        updatedCells[12][colIndex] = true;
                    }
                });

                setSelectedCells(updatedCells);
            }
        };

        initializeCells();
    }, [data]);

    const flexArr = [1.3, 2, 2, 2, 2, 2];

    return (
        <View style={{ flex: 1, padding: 16, backgroundColor: "#f0f0f0" }}>
            <View style={{ flexDirection: "row", height: 40 }}>
                {tableHead.map((head, index) => (
                    <View
                        key={`head-${index}`}
                        style={{
                            flex: flexArr[index],
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 0.4,
                            borderColor: "#000000",
                            backgroundColor: "#F7F7F7",
                        }}
                    >
                        <Text>{head}</Text>
                    </View>
                ))}
            </View>
            {tableData.map((row, rowIndex) => (
                <View key={`row-${rowIndex}`} style={{ flexDirection: "row", height: 35 }}>
                    {row.map((cellText, colIndex) => {
                        if (colIndex === 0) {
                            return (
                                <View
                                    key={`cell-${rowIndex}-${colIndex}`}
                                    style={{
                                        flex: flexArr[colIndex],
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: 38.5,
                                        borderWidth: 0.4,
                                        borderColor: "#000000",
                                        backgroundColor: "#F7F7F7",
                                    }}
                                >
                                    <Text>{cellText}</Text>
                                </View>
                            );
                        }

                        return (
                            <TouchableWithoutFeedback key={`cell-${rowIndex}-${colIndex}`}>
                                <View
                                    style={{
                                        flex: flexArr[colIndex],
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: 38.5,
                                        borderWidth: 0.4,
                                        borderColor: "#000000",
                                        backgroundColor: selectedCells[rowIndex][colIndex]
                                            ? "#FFFFFF" // 선택된 시간 (베이지색)
                                            : "#C3B87A", // 공강 아님 (흰색)
                                    }}
                                >
                                    <Text style={{ textAlign: "center" }}>{cellText}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    })}
                </View>
            ))}
            <View style={{ position: 'relative', top: 5 }}>
                <View style={[styles.row3, { width: '95%', position: 'relative', left: 10 }]}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MainFrame')}
                        style={{
                            backgroundColor: '#C3B87A',
                            flex: 1,
                            width: '105%',
                            position: 'absolute',
                            top: 20,
                            left: -10,
                            height: 50,
                            borderRadius: 24,
                        }}
                    >                    <View>
                            <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', position: 'relative', top: 15, color: '#FFFFFF' }}>네 맞아요</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.row3, { width: '95%', position: 'relative', left: 10 }]}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('UploadPhoto')}
                        style={{
                            backgroundColor: '#C3B87A',
                            flex: 1,
                            width: '105%',
                            position: 'absolute',
                            top: 60,
                            left: -10,
                            height: 50,
                            borderRadius: 24,
                        }}
                    >                    <View>
                            <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', position: 'relative', top: 15, color: '#FFFFFF' }}>수정이 필요해요</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ViewTimetable;
