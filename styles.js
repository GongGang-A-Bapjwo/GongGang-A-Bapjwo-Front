import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFAF7',
        alignItems: 'center',
        justifyContent: 'flex-start', // 세로 스크롤을 위한 정렬
        width: '100%', // 가로로 넘치지 않도록 제한
    },
    table: {
        width: '100%', // 테이블도 가로로 넘치지 않도록 제한
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: '#FCFAF7',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center', // 가로 정렬
        alignItems: 'center',    // 세로 정렬
        height: 70,
        borderRadius: 12,
    },
    row2: {
        flexDirection: 'row',
        justifyContent: 'center', // 가로 정렬
        alignItems: 'center',    // 세로 정렬
        height: 45,
        borderRadius: 12,
    },
    freebox: {
        width: 160,
        height: 110,
        borderColor: "#E8E3CF",
        borderWidth: 1,
        marginTop: 20,
        borderRadius: 12,
    },
    scrollviewtext: {
        fontSize: 15.5,
    },
    freeboxtitle: {
        textAlign: 'left',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 13
    },
    freeboxtime: {
        textAlign: 'left', fontSize: 15, marginLeft: 13, marginTop: 5, marginBottom: 13, color: '#9C8F4A'
    },
    rightbox: {
        marginLeft: 10
    },
    pushblock: {
        marginTop: 50,
    },
    pushblock2: { marginTop: 30 },
    topcellleft: {
        width: 32,
        height: 32,
        marginLeft: 30, // 좌우 여백 추가
        marginRight: 0, // 좌우 여백 추가
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollviewcontent: {
        width: 63,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: '#F5F2E8',
        marginLeft: 5,
        marginTop: 0,
        borderRadius: 12,
    },
    topcellmiddle: {
        width: 258,
        height: 33,
        justifyContent: 'center', // 텍스트 가로 정렬
        alignItems: 'center',    // 텍스트 세로 정렬
        display: 'flex',
    },
    topcellright: {
        width: 32,
        height: 32,
        marginLeft: 0, // 좌우 여백 추가
        marginRight: 30, // 좌우 여백 추가
        justifyContent: 'center',
        alignItems: 'center',
    },
    togglerow: {
        flexDirection: 'row',
        backgroundColor: '#F5F2E8',
        height: 40,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#F5F2E8',
        borderRadius: 12,
    },
    toggleselectedcell: {
        width: 160,
        height: 32,
        backgroundColor: '#FCFAF7',
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    toggleselectedcellText: {
        textAlign: 'center',
        fontSize: 14,
    },
    togglecellText: {
        textAlign: 'center',
        fontSize: 14,
        color: "#9C8F4A"
    },
    togglecell: {
        width: 160,
        height: 32,
        textAlign: 'center',
        fontSize: 14,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    promiseboardcontent: {
        width: 330,
        height: 80,
        marginTop: 30,
        borderRadius: 12,
        borderWidth: 2, // 올바른 속성명 사용
        borderColor: '#E8E3CF', // 올바른 색상 값 사용
        justifyContent: 'center',
        alignItems: 'flex-start', // 올바른 정렬 옵션
        display: 'flex',
    },
    promiseboardcontenttext: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    promiseboardcontenttime: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 16,
        marginTop: 5,
        color: '#9C8F4A'
    },
});

