import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, PanResponder, TouchableWithoutFeedback } from "react-native";
import { styles } from '../styles';
import { useNavigation } from "@react-navigation/native";

const ViewTimetable = () => {
    const navigation = useNavigation();
    const tableHead = ["시간", "월", "화", "수", "목", "금"];
    const tableData = [
        ['9', '', '', '', '', ''],
        ['10', '', '', '', '', ''],
        ['11', '', '', '', '', ''],
        ['12', '', '', '', '', ''],
        ['13', '', '', '', '', ''],
        ['14', '', '', '', '', ''],
        ['15', '', '', '', '', ''],
        ['16', '', '', '', '', ''],
        ['17', '', '', '', '', ''],
        ['18', '', '', '', '', ''],
        ['19', '', '', '', '', ''],
        ['20', '', '', '', '', ''],
        ['21', '', '', '', '', ''],
    ];

    const [SelectRes, setSelectRes] = useState([]); // 선택된 셀 상태
    const [selectedCells, setSelectedCells] = useState(
        Array.from({ length: tableData.length }, () =>
            Array.from({ length: tableHead.length }, () => false)
        )
    );

    const flexArr = [1.3, 2, 2, 2, 2, 2];


    return (
        <View
            style={{ flex: 1, padding: 16, backgroundColor: "#f0f0f0" }}
        >
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
                <View
                    key={`row-${rowIndex}`}
                    style={{ flexDirection: "row", height: 35 }}
                >
                    {row.map((cellText, colIndex) => {
                        if (colIndex === 0) {
                            // 첫 번째 열
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
                            <TouchableWithoutFeedback
                                key={`cell-${rowIndex}-${colIndex}`}
                                onPress={() => {
                                    // 아무 동작도 하지 않음 (반응 비활성화)
                                }}
                            >
                                <View
                                    style={{
                                        flex: flexArr[colIndex],
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: 38.5,
                                        borderWidth: 0.4,
                                        borderColor: "#000000",
                                        backgroundColor: "#FFFFFF",
                                    }}
                                >
                                    <Text style={{ textAlign: "center" }}>{cellText}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                        );
                    })}
                </View>
            ))}
            <View style={[styles.row3, { width: '95%', position: 'relative', left: 10 }]}>
                <TouchableOpacity
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
                    onPress={() => navigation.navigate('ChangeTimetable')}
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
    );
};

export default ViewTimetable;
