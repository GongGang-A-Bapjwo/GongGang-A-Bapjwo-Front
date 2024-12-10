import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import Today from '../screens/Today';
import Join from '../screens/Join';
import Manage from '../screens/Manage';
import Matching from '../screens/Matching';
import EditAppt from '../screens/EditAppt';

const Topselection = () => {
    const [currentPage, setCurrentPage] = useState('Today');
    const [managePage, setManagePage] = useState(null);

    const toggleOptions = [
        { label: 'Today', value: 'Today' },
        { label: 'Join', value: 'Join' },
    ];

    const renderPage = () => {
        if (currentPage === 'Today') return <Today />;
        if (currentPage === 'Join') return <Join onGoToManage={() => { setCurrentPage('Manage'); setManagePage(null); }} />;

        // Manage 상태일 때, managePage 상태를 확인하여 다른 컴포넌트를 조건부 렌더링
        if (currentPage === 'Manage') {
            if (managePage === 'Matching') {
                return <Matching onBack={() => setManagePage('Join')} />;
            } else if (managePage === 'EditAppt') {
                return <EditAppt onBack={() => setManagePage(null)} />;
            } else {
                // 기본 Manage 화면: 여기서 두 개의 버튼 중 하나를 누르면 managePage를 변경
                return <Manage
                    onSelectOption1={() => setManagePage('Matching')}
                    onSelectOption2={() => setManagePage('EditAppt')}
                />;
            }
        }
        return null;
    };

    // currentPage에 따라 현재 선택된 인덱스 구하기
    const selectedIndex = currentPage === 'Manage'
        ? 1 // Manage일 때도 Join과 같은 인덱스를 선택한 상태로 표시
        : toggleOptions.findIndex(option => option.value === currentPage);

    return (
        <>
            <View style={[styles.table, styles.header]}>
                <View style={styles.togglerow}>
                    {toggleOptions.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => { setCurrentPage(option.value); setManagePage(null); }}
                            style={[
                                styles.togglecell,
                                selectedIndex === index && styles.toggleselectedcell,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.togglecellText,
                                    selectedIndex === index && styles.toggleselectedcellText,
                                ]}
                            >
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            {renderPage()}
        </>
    );
};

export default Topselection;
