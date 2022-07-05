
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import ImagePath from './src/constants/imagePath';
import { data } from './src/constants/data';

const { height, width } = Dimensions.get('window');
const App = () => {
  const videoRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const onBuffer = (e) => {
    console.log("buffering.....", e)
  }
  const onError = (e) => {
    console.log("error raised", e)
  }

  const renderItem = ({item, index}) => {
    console.log(item.url);
    
    
    return (
      <View style={{ flex: 1, height: height }}>
        <Video source={{uri:item.url}}
          poster={item.thumb}
          ref={videoRef}
          resizeMode='cover'
          posterResizeMode='cover'
          onBuffer={onBuffer}
          onError={onError}
          repeat
          paused={currentIndex !== index}
          style={styles.backgroundVideo} />

<View style={styles.bottomView}>

<View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <Image
    source={require('./src/assets/images/profile.png')}
    style={styles.profileImage}
  />
  <Text style={[styles.bottomText, { marginHorizontal: 8, fontSize: 16, fontWeight: '500' }]} >{item.title}</Text>
  <TouchableOpacity >
    <Text style={[styles.bottomText, { fontWeight: 'bold', fontSize: 18 }]}>
      Follow
    </Text>
  </TouchableOpacity>
</View>

<View style={{ flexDirection: 'row', marginTop: 8, }}>
  <Text numberOfLines={1} style={[styles.bottomText, { flex: 1, fontSize: 14, fontWeight: '400' }]}>{item.descreption}</Text>
  <TouchableOpacity>
    <Text style={styles.bottomText}>More</Text>
  </TouchableOpacity>
</View>

<View style={{ ...styles.flexHorizontal, marginVertical: 8 }}>

  <View style={{ flexDirection: 'row', alignItem: 'center' }}>
    <Image source={ImagePath.icLike} style={styles.buttonImage} />
    <Image source={ImagePath.icCamera} style={styles.buttonImage} />
    <Image source={ImagePath.icShare} style={styles.buttonImage} />
    <Image source={ImagePath.icSave} style={styles.buttonImage} />
    <Image source={ImagePath.icMore} style={styles.buttonImage} />
  </View>

  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image style={{ tintColor: 'red', width: 20, height: 15 }} source={ImagePath.icLike} />
      <Text style={{ marginLeft: 4, }}>94.6k</Text>
    </View>

    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image style={{ tintColor: 'blue', width: 20, height: 15 }} source={ImagePath.icComment} />
      <Text style={{ marginLeft: 4, }}>112</Text>
    </View>

  </View>
</View>
</View>
      </View>
    )
  }

  const onChangeIndex = ({index}) => {
    setCurrentIndex(index)
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar barStyle='light-content' />

      <SwiperFlatList
        vertical={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onChangeIndex={onChangeIndex}
      />



      <View style={{ position: 'absolute', top: 40, left: 16 }}>
        <Text style={styles.textStyle}>Reels</Text>
      </View>

      <View style={{ position: 'absolute', top: 40, right: 16 }}>
        <Image source={ImagePath.icCamera}
          style={{ tintColor: 'white', height: 30, width: 30 }}
        />
      </View>



      
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position:'absolute',
    height: height,
    width: width,

  },
  flexHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  buttonImage: {
    height: 30,
    width: 30,
    tintColor: "#cccccc",
    marginHorizontal: 4,
  },
  bottomText: {
    color: '#3b4657'
  }
});


export default App;
