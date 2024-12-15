import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, PanResponder, TouchableWithoutFeedback } from "react-native";
import { styles } from '../styles';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ViewTimetable = () => {
    // const navigation = useNavigation();
    // const data = route.params;
    // console.log(data);
    // const [Selectrowstart, setSelectrowstart] = useState([]); // 시작 행 인덱스
    // const [Selectrowend, setSelectrowend] = useState([]); // 종료 행 인덱스
    // const [selectedcol, setSelectedcol] = useState([]); // 선택된 열 인덱스
    // const [selectedCells, setSelectedCells] = useState(
    //     Array.from({ length: 13 }, () => Array(6).fill(false)) // 13행 x 6열 초기화
    // );
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

    // const weekdayMap = {
    //     MONDAY: 1,
    //     TUESDAY: 2,
    //     WEDNESDAY: 3,
    //     THURSDAY: 4,
    //     FRIDAY: 5,
    // };

    // const TimeMap = {
    //     '9': 1,
    //     '10': 2,
    //     '11': 3,
    //     '12': 4,
    //     '13': 5,
    //     '14': 6,
    //     '15': 7,
    //     '16': 8,
    //     '17': 9,
    //     '18': 10,
    //     '19': 11,
    //     '20': 12,
    //     '21': 13,
    // };


    // useEffect(() => {
    //     // data가 배열인지 확인
    //     if (!Array.isArray(data)) {
    //         console.error("data는 배열이 아닙니다.");
    //         return;
    //     }

    //     // 상태 초기화
    //     const newSelectedcol = [];
    //     const newSelectrowstart = [];
    //     const newSelectrowend = [];

    //     // 데이터 처리
    //     data.forEach(({ weekday, startTime, endTime }) => {
    //         if (weekday in weekdayMap) {
    //             newSelectedcol.push(weekdayMap[weekday]);
    //         }
    //         if (startTime in TimeMap) {
    //             newSelectrowstart.push(TimeMap[startTime]);
    //         }
    //         if (endTime in TimeMap) {
    //             newSelectrowend.push(TimeMap[endTime]);
    //         }
    //     });

    //     // 상태 업데이트
    //     setSelectedcol(newSelectedcol);
    //     setSelectrowstart(newSelectrowstart);
    //     setSelectrowend(newSelectrowend);
    // }, [data]);

    // // selectedCells 업데이트
    // useEffect(() => {
    //     if (Selectrowstart.length && Selectrowend.length && selectedcol.length) {
    //         const updatedCells = selectedCells.map((row, rowIndex) =>
    //             row.map((cell, colIndex) => {
    //                 for (let i = 0; i < Selectrowstart.length; i++) {
    //                     const start = Selectrowstart[i];
    //                     const end = Selectrowend[i];
    //                     const col = selectedcol[i];

    //                     if (rowIndex >= start && rowIndex < end && colIndex === col) {
    //                         return true;
    //                     }
    //                 }
    //                 return cell;
    //             })
    //         );

    //         setSelectedCells(updatedCells);
    //     }
    // }, [Selectrowstart, Selectrowend, selectedcol]);


    // const [SelectRes, setSelectRes] = useState([]); // 선택된 셀 상태

    const response = axios.post(
        'http://129.154.55.198:80/api/free-time/info',
        {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzM4NCJ9.eyJtZW1iZXJJZCI6OSwiZXhwIjoxNzM0ODYzOTIyLCJyb2xlIjoiUk9MRV9NRU1CRVIifQ.-67Mwm60X8dXrTMUcu2U049FJgPsOjf57LK0fVLoaedYf79iMAbRWCtCKrcFfmUc",
            },
        }
    );
    console.log(response.data);


    const navigation = useNavigation();

    // 전달된 데이터 확인 및 배열 변환
    const data = response.data || [];
    console.log("Is data an array?", Array.isArray(data));
    console.log("Data:", data);

    const [Selectrowstart, setSelectrowstart] = useState([]); // 시작 행 인덱스
    const [Selectrowend, setSelectrowend] = useState([]); // 종료 행 인덱스
    const [selectedcol, setSelectedcol] = useState([]); // 선택된 열 인덱스
    const [selectedCells, setSelectedCells] = useState(
        Array.from({ length: 13 }, () => Array(6).fill(false)) // 13행 x 6열 초기화
    );

    const weekdayMap = {
        MONDAY: 1,
        TUESDAY: 2,
        WEDNESDAY: 3,
        THURSDAY: 4,
        FRIDAY: 5,
    };

    const TimeMap = {
        '9': 1,
        '10': 2,
        '11': 3,
        '12': 4,
        '13': 5,
        '14': 6,
        '15': 7,
        '16': 8,
        '17': 9,
        '18': 10,
        '19': 11,
        '20': 12,
        '21': 13,
    };

    useEffect(() => {
        if (!Array.isArray(data)) {
            console.error("Data is not an array.");
            return;
        }

        const newSelectedcol = [];
        const newSelectrowstart = [];
        const newSelectrowend = [];

        data.forEach(({ weekday, startTime, endTime }) => {
            if (weekday in weekdayMap) {
                newSelectedcol.push(weekdayMap[weekday]);
            }
            if (startTime in TimeMap) {
                newSelectrowstart.push(TimeMap[startTime]);
            }
            if (endTime in TimeMap) {
                newSelectrowend.push(TimeMap[endTime]);
            }
        });

        setSelectedcol(newSelectedcol);
        setSelectrowstart(newSelectrowstart);
        setSelectrowend(newSelectrowend);
    }, [data]);

    useEffect(() => {
        if (Selectrowstart.length && Selectrowend.length && selectedcol.length) {
            const updatedCells = selectedCells.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                    for (let i = 0; i < Selectrowstart.length; i++) {
                        const start = Selectrowstart[i];
                        const end = Selectrowend[i];
                        const col = selectedcol[i];

                        // 셀 업데이트 조건 수정
                        if (rowIndex >= start && rowIndex <= end && colIndex === col) {
                            return true;
                        }
                    }
                    return cell;
                })
            );

            // 기존 상태와 비교하여 변경이 있는 경우에만 업데이트
            setSelectedCells((prevCells) => {
                const hasChanged = JSON.stringify(prevCells) !== JSON.stringify(updatedCells);
                return hasChanged ? updatedCells : prevCells;
            });
        }
    }, [Selectrowstart, Selectrowend, selectedcol]);



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
                                        // backgroundColor: "#FFFFFF",
                                        backgroundColor: selectedCells[rowIndex][colIndex]
                                            ? "#C3B87A"
                                            : "#FFFFFF",
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
    );
};

export default ViewTimetable;
