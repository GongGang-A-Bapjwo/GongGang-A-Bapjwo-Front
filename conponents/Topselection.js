import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import Today from '../screens/Today';
import Join from '../screens/Join';
import Manage from '../screens/Manage';
import Matching from '../screens/Matching';
import EditAppt from '../screens/EditAppt';
import MakeParty from '../screens/MakeParty';

const Topselection = () => {
    const [currentPage, setCurrentPage] = useState('Today');
    const [managePage, setManagePage] = useState(null);
    const [roomId, setRoomId] = useState(0);
    const [entranceCode, setEntranceCode] = useState(0);

    const toggleOptions = [
        { label: 'Today', value: 'Today' },
        { label: 'Join', value: 'Join' },
    ];

    const renderPage = () => {
        switch (currentPage) {
            case 'Today':
                return <Today />;
            case 'Join':
                return (
                    <Join
                        onSelectManage={(selectedRoomId, selectedEntrance) => {
                            setRoomId(selectedRoomId); // roomId 상태 설정
                            setEntranceCode(selectedEntrance);
                            setCurrentPage('Manage'); // Manage로 이동
                        }}
                        onSelectMakeParty={() => setCurrentPage('MakeParty')}
                    />

                );
            case 'Manage':
                if (managePage) {
                    const BackComponent = managePage === 'Matching' ? Matching : EditAppt;
                    return <BackComponent onBack={() => setManagePage(null)} />;
                }
                return (
                    <Manage
                        onSelectOption1={() => setManagePage('Matching')}
                        onSelectOption2={() => setManagePage('EditAppt')}
                        roomId={roomId}
                        entranceCode={entranceCode}
                    />
                );
            case 'MakeParty':
                return <MakeParty
                    roomId={roomId}
                    entranceCode={entranceCode} />;
            default:
                return <Text>Page not found</Text>; // 기본 페이지 또는 오류 메시지 표시
        }
    };


    // currentPage에 따라 현재 선택된 인덱스 구하기
    const selectedIndex = (currentPage === 'Manage' || currentPage === 'MakeParty')
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
