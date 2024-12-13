import React, { useRef, useState, useEffect } from 'react';
import { View, Text, PanResponder, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component';
import { styles } from '../styles';

const ChangeTimetable = () => {
    const tableHead = ['시간', '월', '화', '수', '목', '금'];
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
    ]

    const flexArr = [1.3, 2, 2, 2, 2, 2];
    const [selectedCells, setSelectedCells] = useState(
        Array.from({ length: tableData.length }, () =>
            Array.from({ length: tableHead.length }, () => false)
        )
    );

    const selectedCellCollection = []; // 선택된 셀 저장

    const startCell = useRef({ rowIndex: null, colIndex: null }); // 드래그 시작 셀
    const endCell = useRef({ rowIndex: null, colIndex: null }); // 드래그 종료 셀

    const cellCoordinates = useRef({}); // 셀의 좌표 저장
    const [cellSizes, setCellSizes] = useState({ width: [], height: 0 });
    const { width: screenWidth } = useWindowDimensions();

    useEffect(() => {
        const totalFlex = flexArr.reduce((acc, value) => acc + value, 0);
        const columnWidths = flexArr.map(value => (screenWidth * value) / totalFlex);
        setCellSizes({
            width: columnWidths,
            height: 38.5, // 고정된 셀 높이
        });
    }, [screenWidth]);

    const startCoords = useRef({ x: 0, y: 0 });
    const endCoords = useRef({ x: 0, y: 0 });

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt, gestureState) => {
                // 드래그 시작 좌표 설정
                startCoords.current = {
                    x: gestureState.x0,
                    y: gestureState.y0,
                };
                console.log('Start Coords:', startCoords.current);
            },
            onPanResponderMove: (evt, gestureState) => {
                const { moveX, moveY } = gestureState;
                // console.log('moveX:', moveX, 'moveY:', moveY);
            },
            onPanResponderRelease: (evt, gestureState) => {
                // 드래그 종료 좌표 설정
                endCoords.current = {
                    x: gestureState.moveX,
                    y: gestureState.moveY,
                };
                console.log('End Coords:', endCoords.current);
            },
        })
    ).current;

    const handleLayout = (rowIndex, colIndex, layout) => {
        const { x, y, width, height } = layout;
        cellCoordinates.current[`${rowIndex}-${colIndex}`] = { x, y, width, height };
    };

    const handleCellClick = (rowIndex, colIndex) => {
        selectedCellCollection.push({ rowIndex, colIndex });
        setSelectedCells(prevState => {
            const updatedState = prevState.map((row, rIndex) =>
                rIndex === rowIndex
                    ? row.map((cell, cIndex) => (cIndex === colIndex ? !cell : cell))
                    : row
            );
            return updatedState;
        });
        console.log('Selected Cells:', selectedCellCollection);
    };

    // const handleCellClick = (rowIndex, colIndex) => {
    //     // 드래그 시작 셀 설정
    //     startCell.current = { rowIndex, colIndex };
    //     endCell.current = { ...startCell.current };

    //     // 초기 셀 선택
    //     setSelectedCells(prevState => {
    //         const updatedState = prevState.map((row, rIndex) =>
    //             row.map((cell, cIndex) => (rIndex === rowIndex && cIndex === colIndex ? !cell : cell))
    //         );
    //         return updatedState;
    //     });

    //     console.log('Start Cell:', startCell.current);
    // };

    // 각 셀의 좌표 저장
    const handleCellLayout = (rowIndex, colIndex, layout) => {
        const { x, y, width, height } = layout;
        cellCoordinates.current[`${rowIndex}-${colIndex}`] = { x, y, width, height };
    };


    const handleDragSelection = () => {
        const { x1: startX, y1: startY } = startCoords.current;
        const { x2: endX, y2: endY } = endCoords.current;

        const selectedCells = Object.keys(cellCoordinates.current).reduce(
            (acc, key) => {
                const [rowIndex, colIndex] = key.split('-');
                const { x, y, width, height } = cellCoordinates.current[key];

                const isSelected =
                    x < startX &&
                    x + width > endX &&
                    y < startY &&
                    y + height > endY;

                acc[rowIndex][colIndex] = isSelected;
                return acc;
            },
            Array.from({ length: tableData.length }, () =>
                Array.from({ length: tableHead.length }, () => false)
            )
        );
        console.log('Selected Cells:', selectedCells);
    };

    // PanResponder의 onPanResponderRelease에서 호출
    onPanResponderRelease: (evt, gestureState) => {
        endCoords.current = {
            x: gestureState.moveX,
            y: gestureState.moveY,
        };
        console.log("Start Coords:", startCoords.current);
        console.log("End Coords:", endCoords.current);

        // 드래그가 끝난 후 영역 내 셀 선택
        handleDragSelection();
    };


    const updatedTableData = tableData.map((row, rowIndex) =>
        row.map((selectedcell, colIndex) =>
            <TouchableOpacity
                key={`tablecell-${rowIndex}-${colIndex}`}
                style={{
                    flex: flexArr[colIndex],
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 38.5,
                    borderWidth: 0.4,
                    borderColor: '#000000',
                    backgroundColor: selectedCells[rowIndex][colIndex]
                        ? '#C3B87A' // 선택된 셀 배경색
                        : '#FFFFFF', // 기본 배경색
                }}
                disabled={colIndex === 0} // 첫 번째 열(시간 열)은 비활성화
                onLayout={(e) =>
                    handleLayout(
                        rowIndex,
                        colIndex,
                        e.nativeEvent.layout
                    )
                }
                onPress={() => handleCellClick(rowIndex, colIndex)}
            >
                <Text style={{ textAlign: 'center' }}>{selectedcell || ''}</Text>
            </TouchableOpacity>
        )
    );

    return (
        <View style={[styles.container, { justifyContent: 'Top', flex: 1, paddingLeft: 20, paddingTop: 10 }]}>
            <View style={[styles.table, { width: '95%', height: 470, borderRadius: 12 }]}>
                <View style={[styles.row3, { position: 'relative', top: 50, width: '100%', height: 540, backgroundColor: '#ffffff', borderColor: '#000000', borderWidth: 1, overflow: 'hidden', borderStyle: 'dashed', borderRadius: 0 }]}
                    {...panResponder.panHandlers}>

                    <Table borderStyle={{ borderWidth: 1 }} style={{ flex: 1, height: '100%' }}>
                        <Row
                            data={tableHead}
                            style={{ width: '100%', height: '7%', }}
                            textStyle={{ textAlign: 'center' }}
                            flexArr={flexArr}
                        />
                        {updatedTableData.map((row, rowIndex) => (
                            <View key={`row-${rowIndex}`} style={{ flexDirection: 'row', height: 38.5 }}>
                                {row}
                            </View>
                        ))}
                    </Table>
                </View>
                <View style={{ position: 'relative', backgroundColor: '#eee', top: -290, left: 0, flex: 1, width: '100%' }}>
                    <View style={[styles.row3, { marginTop: 0 }]}>
                        <TouchableOpacity
                            onPress={() => alert('이미지 선택 기능')}
                            style={{
                                backgroundColor: '#C3B87A',
                                flex: 1,
                                width: '100%',
                                position: 'absolute',
                                top: 350,
                                height: 50,
                                borderRadius: 24,
                            }}
                        >
                            <View>
                                <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', position: 'relative', top: 15 }}>네, 맞아요</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.row3, { marginTop: 0, position: 'relative', top: 40 }]}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#C3B87A',
                                flex: 1,
                                width: '100%',
                                position: 'absolute',
                                top: 350,
                                height: 50,
                                borderRadius: 24,
                            }}
                        >
                            <View>
                                <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', position: 'relative', top: 15 }}>수정이 필요해요</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ChangeTimetable;
