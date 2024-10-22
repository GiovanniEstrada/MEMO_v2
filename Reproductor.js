// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { Audio } from 'expo-av';

// const audioFiles = {
//     AZUL: require('./assets/AZUL.mp3')
// };

// export default function AudioPlayer({ route }) {
//     const { songCode } = route.params;
//     const [soundObject, setSoundObject] = useState(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [isLoaded, setIsLoaded] = useState(false);

//     useEffect(() => {
//         async function loadSound() {
//             try {
//                 console.log(songCode)
//                 console.log('Cargando sonido:', songCode);
//                 let newSoundObject = new Audio.Sound();
//                 await newSoundObject.loadAsync(audioFiles[songCode]);
//                 setSoundObject(newSoundObject)
//                 await newSoundObject.playAsync();
//                 console.log('Sonido cargado exitosamente');
//                 setIsLoaded(true);
//             } catch (error) {
//                 console.error('Error al cargar el sonido', error);
//             }
//         }

//         loadSound();

//         return () => {
//             // Limpieza cuando se desmonta el componente
//             if (isPlaying) {
//                 soundObject.current.stopAsync();
//             }
//             soundObject.current.unloadAsync();
//         };
//     }, [songCode]);

//     const playSound = async () => {
//         try {
//             if (!isPlaying && isLoaded) {
//                 await soundObject.current.playAsync();
//                 setIsPlaying(true);
//             }
//         } catch (error) {
//             console.error('Error al reproducir el sonido', error);
//         }
//     };

//     const stopSound = async () => {
//         try {
//             if (isPlaying) {
//                 await soundObject.current.stopAsync();
//                 setIsPlaying(false);
//             }
//         } catch (error) {
//             console.error('Error al detener el sonido', error);
//         }
//     };

//     return (
//         <View>
//             <Image
//                 source={require('./sources/img/logo.png')}
//                 resizeMode="contain"
//             />
//             <Text style={styles.title}>Reproductor de Música</Text>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     // Estilos de la interfaz de usuario
// });

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

const audioFiles = {
  AMARILLO_ALEGRIA: require('./sources/audio/ALEGRIA.mp3'),
  VERDE_CALMA: require('./sources/audio/CALMA.mp3'),
  NEGRO_MIEDO: require('./sources/audio/MIEDO.mp3'),
  ROJO_ENOJO: require('./sources/audio/ENOJO.mp3'),
  AZUL_TRISTEZA: require('./sources/audio/TRISTEZA.mp3')
};

const imagesFiles = {
  AMARILLO_ALEGRIA: require('./sources/img/ALEGRIA.jpg'),
  VERDE_CALMA: require('./sources/img/CALMA.jpg'),
  NEGRO_MIEDO: require('./sources/img/MIEDO.jpg'),
  ROJO_ENOJO: require('./sources/img/ENOJO.jpg'),
  AZUL_TRISTEZA: require('./sources/img/TRISTEZA.jpg')
};

export default function AudioPlayer({ route }) {
  const { songCode } = route.params;
  const [soundObject, setSoundObject] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
        headerLeft: null, // Esto ocultará el botón de retroceso
      });
    const backAction = () => {
      // Decide aquí si deseas bloquear o permitir el retroceso.
      // Por ejemplo, puedes bloquearlo en ciertas condiciones o pantallas.
      
      // Si deseas bloquear el retroceso, simplemente devuelve true.
      return true;
    };
  
    // Agrega el controlador del evento de retroceso
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
    return () => {
      // Limpia el controlador del evento de retroceso al desmontar el componente
      backHandler.remove();
    };
  }, [navigation]);
  
  

  const loadSound = async () => {
    try {
      console.log(songCode);
      console.log('Cargando sonido:', songCode);
      let newSoundObject = new Audio.Sound();
      await newSoundObject.loadAsync(audioFiles[songCode]);
      setSoundObject(newSoundObject);
      console.log('Sonido cargado exitosamente');
      setIsLoaded(true);
    } catch (error) {
      console.error('Error al cargar el sonido', error);
    }
  };

  const playSound = async () => {
    try {
      if (!isPlaying) {
        if (!soundObject) {
          await loadSound();
        }
        if (soundObject) { // Verifica que soundObject no sea null
          await soundObject.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Error al reproducir el sonido', error);
    }
  };

  const pauseSound = async () => {
    try {
      if (isPlaying && soundObject) {
        await soundObject.pauseAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error al pausar el sonido', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Portada del álbum */}
      <Image
        source={imagesFiles[songCode]} // Ruta de la imagen del álbum
        style={styles.albumCover}
        resizeMode="cover"
      />
      <Text style={styles.title}>Reproductor de Música</Text>
      <View style={styles.flex}>
        <TouchableOpacity
            onPress={isPlaying ? pauseSound : playSound}
            style={styles.button}
        >
            <Text style={styles.buttonText}>
            {isPlaying ? 'Pausar' : 'Reproducir'}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>{
                if(isPlaying){
                    pauseSound()
                }
                navigation.navigate("Menu principal")
            }}
            style={styles.buttonExit}
        >
            <Text style={styles.buttonText}>
            Volver
            </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.status}>
        {isPlaying ? 'Reproduciendo' : 'En pausa'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  albumCover: {
    width: 270, // Ajusta el tamaño de la imagen del álbum según tus necesidades
    height: 400, // Ajusta el tamaño de la imagen del álbum según tus necesidades
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 10
  },
  buttonExit: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  status: {
    fontSize: 18,
    marginTop: 20,
  },
  headerButton: {
    color: 'blue',
    fontSize: 16,
    marginLeft: 20,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row'
  },
});