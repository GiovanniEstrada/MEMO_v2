import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

function SliderScreen() {
const sizeX = Dimensions.get('window').width;
const sizeY = Dimensions.get('window').height;
  return (
    <SwiperFlatList style={[styles.wrapper, {width: sizeX, height: sizeY, display: 'grid', backgroundColor: "#64C9FF", alignContent: "center"}]} showsButtons={true}>
      <View style={[styles.text, styles.shadowBox, {width: sizeX-40, margin: 20,  alignItems: "center", borderRadius: 20}]}>
      <Image source={require('./sources/img/ALEGRIA.jpg')} style={styles.image}/>
      </View>
      <View style={[styles.text, styles.shadowBox, {width: sizeX-40, height: sizeY - 40, margin: 20, alignItems: "center", alignContent: 'center', borderRadius: 20, backgroundColor: '#8BCCFF'}]}>
        <Text style={styles.text}>Cuadro de Información 2</Text>
      </View>
      <View style={[styles.text, styles.shadowBox, {width: sizeX-40, margin: 20, alignItems: "center", borderRadius: 20, backgroundColor: '#8BCCFF', }]}>
        <Text style={styles.text}>Cuadro de Información 3</Text>
      </View>
    </SwiperFlatList>
  );
}

  // AMARILLO_ALEGRIA: require('./sources/img/ALEGRIA.jpg'),
  // VERDE_CALMA: require('./sources/img/CALMA.jpg'),
  // NEGRO_MIEDO: require('./sources/img/MIEDO.jpg'),
  // ROJO_ENOJO: require('./sources/img/ENOJO.jpg'),
  // AZUL_TRISTEZA: require('./sources/img/TRISTEZA.jpg')

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  shadowBox: {
    elevation: 10,
    shadowColor: 'rgba(0, 0, 0, 0.75)', 
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 50,
    shadowRadius: 124
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
});

export default SliderScreen;
