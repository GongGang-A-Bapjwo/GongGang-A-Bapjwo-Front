import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { GestureHandlerRootView, ScrollView, Switch } from 'react-native-gesture-handler';
import { styles } from './styles';

const ToggleSwitch = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleSwitch = () => setIsToggled((prevState) => !prevState);

  return (
    <View style={[styles.row2, styles.pushblock2]}>
      <View style={[styles.row2, { justifyContent: 'left' }]}>
        {isToggled ? (
          <Text style={{ marginRight: 15 }}>모든 시간대의 약속 보기</Text>
        ) : (
          <Text style={{ marginRight: 15 }}>공강 시간대의 약속 보기</Text>
        )}

        <Switch
          trackColor={{ false: '#D9D9D9', true: '#000000' }}
          thumbColor={isToggled ? '#D9D9D9' : '#000000'}
          onValueChange={toggleSwitch}
          style={{ marginLeft: 90 }}
          value={isToggled}
        />
      </View>
    </View>
  );
};

const Topsection = () => {
  return (
    <View style={[styles.table, { marginTop: 30 }]}>
      <View style={styles.row}>
        <View style={styles.topcellleft}>
          <Image source={require('./assets/images/calendar.png')} style={{ width: 24, height: 24 }} />
        </View>
        <View style={styles.topcellmiddle}>
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>공강아밥줘</Text>
        </View>
        <View style={styles.topcellright}>
          <Image source={require('./assets/images/settings.png')} style={{ width: 24, height: 24 }} />
        </View>
      </View>
    </View>
  );
}

const Topselection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // 선택된 버튼의 인덱스 상태

  const toggleOptions = [
    { label: 'Today', value: 'Today' },
    { label: 'Join', value: 'Join' },
  ];

  return (
    <View style={[styles.table, styles.header]}>
      <View style={styles.togglerow}>
        {toggleOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedIndex(index)} // 선택된 버튼의 인덱스 저장
            style={[
              styles.togglecell,
              selectedIndex === index && styles.toggleselectedcell, // 선택된 버튼 스타일 적용
            ]}
          >
            <Text
              style={[
                styles.togglecellText,
                selectedIndex === index && styles.toggleselectedcellText, // 선택된 텍스트 스타일 적용
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const FreeTimeNoticeTitle = () => {
  return (
    <View style={styles.table}>
      <View style={[styles.row, { marginbottom: 20 }]}>
        <Image source={require('./assets/images/calendarcheck.png')} style={{ width: 32, height: 32 }} />
        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginHorizontal: 10, marginRight: 115 }}>오늘의 공강(월)</Text>
        <Image source={require('./assets/images/listline.png')} style={{ width: 32, height: 32 }} />
      </View>
    </View>
  )
}

const FreeTimeNotice = () => {
  return (
    <>
      <FreeTimeNoticeTitle />
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.freebox}>
            <Image source={require('./assets/images/calendarcheck.png')} style={{ width: 24, height: 24, margin: 13 }} />
            <Text style={styles.freeboxtitle}>공강</Text>
            <Text style={styles.freeboxtime}>11:00 AM - 1:00 PM</Text>
          </View>
          <View style={[styles.freebox, styles.rightbox]}>
            <Image source={require('./assets/images/calendarcheck.png')} style={{ width: 24, height: 24, margin: 16 }} />
            <Text style={styles.freeboxtitle}>공강</Text>
            <Text style={styles.freeboxtime}>11:00 ~ 1:00</Text>
          </View>
        </View>
        <View style={[styles.row, styles.pushblock]}>
          <View style={styles.freebox}>
            <Image source={require('./assets/images/calendarcheck.png')} style={{ width: 24, height: 24, margin: 16 }} />
            <Text style={styles.freeboxtitle}>공강</Text>
            <Text style={styles.freeboxtime}>11:00 ~ 1:00</Text>
          </View>
          <View style={[styles.freebox, styles.rightbox]}>
            <Image source={require('./assets/images/calendarcheck.png')} style={{ width: 24, height: 24, margin: 16 }} />
            <Text style={styles.freeboxtitle}>공강</Text>
            <Text style={styles.freeboxtime}>11:00 ~ 1:00</Text>
          </View>
        </View>
      </View>
    </>
  )
}

const BoardNotice = () => {
  return (
    <View style={[styles.row2, { height: 25, marginTop: 10 }]}>
      <Image source={require('./assets/images/clipboard.png')} style={{ width: 32, height: 32 }} />
      <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginLeft: 13, marginRight: 110 }}>모든 약속 한 눈에 보기</Text>
    </View>
  )
}

const HorizontalScroll = () => {
  const [textSizes, setTextSizes] = useState({});
  const [pressedIndex, setPressedIndex] = useState(null); // 현재 터치된 항목의 인덱스

  const handleTextLayout = (index, event) => {
    const { width } = event.nativeEvent.layout; // 텍스트의 너비 계산
    setTextSizes((prevSizes) => ({
      ...prevSizes,
      [index]: width, // 각 텍스트의 인덱스별로 크기 저장
    }));
  };

  const categories = ['전체', '스터디/동아리', '밥약', '상담', '기타'];

  return (
    <View style={styles.row}>
      <ScrollView
        horizontal={true}
        style={[styles.scrollview, { marginLeft: 20, marginTop: 0 }]}
        contentContainerStyle={styles.scrollviewContentContainer}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.scrollviewcontent,
              { width: (textSizes[index] || 0) + 30 },
              {
                backgroundColor: pressedIndex === index ? '#C3C3C3' : '#F5F2E8', // 현재 선택된 항목만 색 변경
              },
            ]}
            onPress={() => setPressedIndex(index)}

          >
            <Text
              style={styles.scrollviewtext}
              onLayout={(event) => handleTextLayout(index, event)}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const PromiseBoard = () => {
  var promiseboardcontentcategory = ['스터디/동아리', '밥약', '상담', '기타'];
  var promiseboardcontenttime = ['11:00 AM ~ 12:0 PM', '12:00 PM ~ 1:00 PM', '1:00 PM ~ 2:00 PM', '2:00 PM ~ 3:00 PM'];
  const promiseData = promiseboardcontentcategory.map((category, index) => ({
    category,
    time: promiseboardcontenttime[index] || '시간 없음', // 시간 없을 경우 기본값
  }));

  return (
    <View>
      {promiseData.map((content, index) => (
        <View
          key={index} // 고유 키 설정
          style={[
            styles.row2,
            index !== 0 && { marginTop: 50 }, // 첫 번째 요소가 아니면 marginTop 적용
            index === promiseData.length - 1 && { marginBottom: 70 }, // 마지막 요소면 marginBottom 적용
          ]}
        >
          <View style={styles.promiseboardcontent}>
            <Text style={styles.promiseboardcontenttext}>{content.category}</Text>
            <Text style={styles.promiseboardcontenttime}>{content.time}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.container]}>
        <ScrollView
          horizontal={false} // 세로 스크롤만 활성화
          contentContainerStyle={{ flexGrow: 1, width: '100%' }} // 컨텐츠가 화면 너비를 초과하지 않도록 설정
          showsVerticalScrollIndicator={true} // 세로 스크롤 표시
          style={{ width: '100%' }} // ScrollView 자체도 화면 너비에 맞게 설정
        >
          <Topsection />
          <Topselection />
          <FreeTimeNotice />
          <ToggleSwitch />
          <BoardNotice />
          <HorizontalScroll />
          <PromiseBoard />
        </ScrollView>
      </View >
    </GestureHandlerRootView >
  );
}

