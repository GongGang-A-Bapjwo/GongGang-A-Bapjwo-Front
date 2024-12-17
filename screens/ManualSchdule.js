import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, PanResponder, Alert } from "react-native";
import { styles } from '../styles';
import { useNavigation } from "@react-navigation/native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import axios from "axios";
const ManualSchedule = () => {
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

    const [selectedCells, setSelectedCells] = useState(
        Array.from({ length: tableData.length }, () =>
            Array.from({ length: tableHead.length }, () => false)
        )
    );

    const flexArr = [1.3, 2, 2, 2, 2, 2];
    const cellCoordinates = useRef({});
    const tempSelection = useRef(new Set());
    const startCoords = useRef({ x: 0, y: 0 });
    const endCoords = useRef({ x: 0, y: 0 });

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt, gestureState) => {
                startCoords.current = {
                    x: gestureState.x0,
                    y: gestureState.y0,
                };
                tempSelection.current.clear();
            },
            onPanResponderMove: (evt, gestureState) => {
                endCoords.current = {
                    x: gestureState.moveX,
                    y: gestureState.moveY,
                };
                trackSelection();
            },
            onPanResponderRelease: () => {
                applySelection();
            },
        })
    ).current;

    const handleLayout = (rowIndex, colIndex, layout) => {
        const { x, width, height } = layout;
        const y = 140 + (35 * rowIndex);
        cellCoordinates.current[`${rowIndex}-${colIndex}`] = {
            x,
            y,
            width,
            height,
        };
    };

    const trackSelection = () => {
        const { x: startX, y: startY } = startCoords.current;
        const { x: endX, y: endY } = endCoords.current;

        const xMin = Math.min(startX, endX);
        const xMax = Math.max(startX, endX);
        const yMin = Math.min(startY, endY);
        const yMax = Math.max(startY, endY);

        for (let rowIndex = 0; rowIndex < tableData.length; rowIndex++) {
            for (let colIndex = 0; colIndex < tableHead.length; colIndex++) {
                const cellKey = `${rowIndex}-${colIndex}`;
                const cellInfo = cellCoordinates.current[cellKey];

                if (cellInfo) {
                    const { x, y, width, height } = cellInfo;
                    const cellXMin = x;
                    const cellXMax = x + width;
                    const cellYMin = y;
                    const cellYMax = y + height;

                    const isOverlapping =
                        xMin <= cellXMax &&
                        xMax >= cellXMin &&
                        yMin <= cellYMax &&
                        yMax >= cellYMin;

                    if (isOverlapping) {
                        tempSelection.current.add(cellKey);
                    }
                }
            }
        }
    };

    const applySelection = () => {
        setSelectedCells(prevState => {
            const updatedState = prevState.map(row => [...row]);

            tempSelection.current.forEach(cellKey => {
                const [rowIndex, colIndex] = cellKey.split("-").map(Number);

                updatedState[rowIndex][colIndex] = !updatedState[rowIndex][colIndex];
            });

            return updatedState;
        });
    };

    const handleRegister = async () => {
        const weekdays = ["", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
        const freeTimeRequestItems = [];

        for (let colIndex = 1; colIndex < tableHead.length; colIndex++) {
            const selectedRows = [];

            for (let rowIndex = 0; rowIndex < tableData.length; rowIndex++) {
                if (selectedCells[rowIndex][colIndex]) {
                    selectedRows.push(rowIndex + 9); // 시간은 9시부터 시작
                }
            }

            if (selectedRows.length > 0) {
                freeTimeRequestItems.push({
                    weekday: weekdays[colIndex],
                    startTime: `${selectedRows[0]}:00`, // :00 추가
                    endTime: `${selectedRows[selectedRows.length - 1]}:00`, // :00 추가
                });
            }
        }

        console.log("Generated JSON:", { freeTimeRequestItems });

        try {
            const response = await axios.post(
                'http://129.154.55.198:80/api/free-time',
                {
                    freeTimeRequestItems // "freeTimeRequestItems" 키로 데이터를 전송
                },
                {
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzM4NCJ9.eyJtZW1iZXJJZCI6OSwiZXhwIjoxNzM0ODc1OTIyLCJyb2xlIjoiUk9MRV9NRU1CRVIifQ.o_XkvMmqSY4kbTHI4x0VdgaGI8t8NZM3JXTdZO5rQ6uAQHQ27NuzJW7P2-GBuZgt",
                    },
                }
            );
            console.log("Response:", response.data);
            navigation.navigate('MainFrame');

        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
        }
    };
    return (
        <View
            {...panResponder.panHandlers}
            style={{ flex: 1, padding: 16, backgroundColor: "#FCFAF7" }}
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
                            <TouchableOpacity
                                key={`cell-${rowIndex}-${colIndex}`}
                                style={{
                                    flex: flexArr[colIndex],
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: 38.5,
                                    borderWidth: 0.4,
                                    borderColor: "#000000",
                                    backgroundColor: selectedCells[rowIndex][colIndex]
                                        ? "#C3B87A"
                                        : "#FFFFFF",
                                }}
                                onLayout={(e) =>
                                    handleLayout(
                                        rowIndex,
                                        colIndex,
                                        e.nativeEvent.layout
                                    )
                                }
                            >
                                <Text style={{ textAlign: "center" }}>{cellText}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            ))}
            <View style={[styles.row3, { marginTop: 0, position: 'relative', top: 40 }]}>
                <TouchableOpacity
                    onPress={() => { handleRegister() }}
                    style={{
                        backgroundColor: '#C3B87A',
                        flex: 1,
                        width: '100%',
                        position: 'relative',
                        top: 10,
                        height: 50,
                        borderRadius: 24,
                    }}
                >
                    <View>
                        <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', position: 'relative', top: 15 }}>등록 완료</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ManualSchedule;
