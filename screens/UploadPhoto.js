import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { styles } from '../styles';
import { useNavigation } from '@react-navigation/native';

// 일단 로그인부터 해결하고 나서 시간표 등록하는 부분을 수정해야할 듯
const UploadPhoto = () => {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

    const token = "eyJhbGciOiJIUzM4NCJ9.eyJtZW1iZXJJZCI6MSwiZXhwIjoxNzM1MDMyNzQ5LCJyb2xlIjoiUk9MRV9NRU1CRVIifQ.31c9kDajutIKXfs9JDS7AKpVSkZu0Yo6S9tUL5ibkgvFu2mzYpGvizD094Yyuqdw";

    const pickImage = async () => {
        try {
            // 권한 요청
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                alert('사진 접근 권한이 필요합니다.');
                return;
            }

            // 이미지 선택
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: false, // 편집 비활성화
                base64: true, // Base64 데이터 포함
                quality: 1, // 원본 품질 유지
            });

            if (!result.canceled && result.assets?.[0]?.uri) {
                const selectedImageUri = result.assets[0].uri;
                setImage(selectedImageUri); // 이미지 URI 설정

                const fileData = {
                    uri: selectedImageUri,
                    name: selectedImageUri.split('/').pop(), // 파일 이름 추출
                    type: 'image/jpeg', // 기본 MIME 타입 설정
                };
                setFile(fileData);
            } else {
                console.log('이미지 선택이 취소되었습니다.');
            }
        } catch (error) {
            console.error('이미지 선택 중 오류 발생:', error);
            alert('이미지 선택 중 오류가 발생했습니다.');
        }
    };

    const uploadImage = async () => {
        if (!file) {
            alert('이미지를 선택해주세요.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', file); // 파일 추가

            const response = await axios.post(
                'http://129.154.55.198:80/api/free-time/process-image',
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('업로드 성공:', response.data);
            alert('사진 업로드 성공!');
            navigation.navigate('ViewTimetable', { data: response.data });
        } catch (error) {
            console.error('업로드 실패:', error);
            alert('사진 업로드 중 오류가 발생했습니다.');
        }
    };

    return (
        <View style={[styles.container, { justifyContent: 'Top', flex: 1, paddingLeft: 20, paddingTop: 10 }]}>
            <View style={[styles.table, { width: '95%', height: 470, borderRadius: 12 }]}>
                {/* <View style={[styles.row3, { position: 'relative', top: 10 }]}>
                    <Text style={[styles.title, { position: 'relative', top: 20, height: 30 }]}>시간표를 등록해주세요</Text>
                </View> */}
                <View style={[styles.row3, { position: 'relative', top: 50, width: '100%', height: 500, backgroundColor: '#ffffff', borderColor: '#000000', borderWidth: 1 }]}>
                    {image ? (<Image
                        source={{ uri: image }}
                        style={{ width: '100%', height: '100%', resizeMode: 'contain' }} // 이미지가 뷰에 맞게 조정됩니다.
                    />) : (
                        <>
                            <View style={[styles.row3, { marginTop: 0, position: 'relative', width: '100%', justifyContent: 'center' }]}>
                                <Image source={require('../assets/images/plus2.png')} style={[{ width: 40, height: 40 }]} />
                            </View>
                            <View style={[styles.row3, { marginTop: 0, position: 'relative', top: 45, left: '-100%', width: '100%', justifyContent: 'center' }]}>
                                <Text style={{ textSize: 16, fontWeight: 'bold' }}>에브리타임 시간표 추가</Text>
                            </View>
                        </>
                    )}
                </View>
                <View style={{ position: 'relative', backgroundColor: '#eee', top: -290, left: 0, flex: 1, width: '100%' }}>
                    <View style={[styles.row3, { marginTop: 0 }]}>
                        <TouchableOpacity
                            onPress={() => { pickImage() }}
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
                                <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', position: 'relative', top: 15 }}>시간표 사진 수정</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.row3, { marginTop: 0, position: 'relative', top: 40 }]}>
                        <TouchableOpacity
                            onPress={() => { uploadImage() }}
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
                                <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', position: 'relative', top: 15 }}>등록 완료</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >
    );
}

export default UploadPhoto;