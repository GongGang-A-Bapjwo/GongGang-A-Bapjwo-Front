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
                        onSelectManage={(selectedRoomId) => {
                            setRoomId(selectedRoomId); // roomId 상태 설정
                            setCurrentPage('Manage'); // Manage로 이동
                        }}
                        onSelectMakeParty={() => setCurrentPage('MakeParty')}
                    />

                );
            case 'Manage':
                if (managePage) {
                    // managePage가 객체일 경우 페이지를 판별
                    const { page, roomId } = managePage;

                    if (page === 'Matching') {
                        return <Matching roomId={roomId} onBack={() => setCurrentPage('Join')} />;
                    } else if (page === 'EditAppt') {
                        return <EditAppt onBack={() => setManagePage(null)} />;
                    }
                }

                return (
                    <Manage
                        onSelectOption1={(roomId) => setManagePage({ page: 'Matching', roomId })}
                        onSelectOption2={() => setManagePage({ page: 'EditAppt' })}
                        roomId={roomId}
                    />
                );

            case 'MakeParty':
                return <MakeParty
                    roomId={roomId}
                />;
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
                <View style={[styles.togglerow, { width: '90%' }]}>
                    {toggleOptions.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => { setCurrentPage(option.value); setManagePage(null); }}
                            style={[
                                styles.togglecell,
                                selectedIndex === index && styles.toggleselectedcell,
                                { width: '50%' }
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
            </View >
            {renderPage()}
        </>
    );
};

export default Topselection;
