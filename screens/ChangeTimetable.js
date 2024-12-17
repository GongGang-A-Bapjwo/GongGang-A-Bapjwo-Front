import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, PanResponder } from "react-native";
import { styles } from '../styles';

const ChangeTimetable = () => {
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
    const cellCoordinates = useRef({});
    const tempSelection = useRef(new Set()); // 스와이프 중 임시로 저장된 셀
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
                tempSelection.current.clear(); // 스와이프 시작 시 초기화
            },
            onPanResponderMove: (evt, gestureState) => {
                endCoords.current = {
                    x: gestureState.moveX,
                    y: gestureState.moveY,
                };
                console.log(startCoords.current, endCoords.current);
                trackSelection(); // 드래그 중 선택된 셀 추적
            },
            onPanResponderRelease: () => {
                applySelection(); // 드래그 완료 후 상태 업데이트
            },
        })
    ).current;

    const handleLayout = (rowIndex, colIndex, layout) => {
        const { x, width, height } = layout;

        // y 좌표를 행 인덱스를 기반으로 계산
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
                        tempSelection.current.add(cellKey); // 임시 저장
                    }
                }
            }
        }
    };

    const applySelection = () => {
        setSelectedCells(prevState => {
            const updatedState = prevState.map(row => [...row]);
            const updatedRes = [...SelectRes];

            tempSelection.current.forEach(cellKey => {
                const [rowIndex, colIndex] = cellKey.split("-").map(Number);

                if (updatedState[rowIndex][colIndex]) {
                    // 선택 해제
                    updatedState[rowIndex][colIndex] = false;
                    const index = updatedRes.findIndex(
                        ([row, col]) => row === rowIndex && col === colIndex
                    );
                    if (index !== -1) {
                        updatedRes.splice(index, 1); // 리스트에서 제거
                    }
                } else {
                    // 선택
                    updatedState[rowIndex][colIndex] = true;
                    updatedRes.push([rowIndex, colIndex]);
                }
            });

            setSelectRes(updatedRes); // 선택 리스트 업데이트
            return updatedState;
        });
    };

    return (
        <View
            {...panResponder.panHandlers}
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
            <View style={[styles.row3, { width: '95%', position: 'relative', left: 10 }]}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ChangeTimetable')}
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
                        <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', position: 'relative', top: 15, color: '#FFFFFF' }}>수정 완료</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChangeTimetable;
