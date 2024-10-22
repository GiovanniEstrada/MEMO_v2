import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, Button, TouchableOpacity, Image, Dimensions } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator()


// Mantén la pantalla de carga visible mientras obtenemos los recursos
SplashScreen.preventAutoHideAsync();

export default function MainMenu() {
  const [appIsReady, setAppIsReady] = useState(false);
  const sizeX = Dimensions.get('window').width;
  const sizeY = Dimensions.get('window').height;
  const navigation = useNavigation();
  
  useEffect(() => {
    async function prepare() {
      try {
        // Precarga las fuentes, realiza aquí las llamadas a la API que necesites
        await Font.loadAsync(Entypo.font);
        // Retraso artificial de dos segundos para simular una carga lenta
        // ¡Por favor, elimina esto si copias y pegas el código!
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (e) {
        console.warn(e);
      } finally {
        // Indica a la aplicación que renderice
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // ¡Esto le dice a la pantalla de carga que se oculte inmediatamente!
      // Si llamamos a esto después de `setAppIsReady`, entonces podríamos ver una pantalla en blanco mientras la aplicación está
      // cargando su estado inicial y renderizando sus primeros píxeles. Así que en su lugar,
      // ocultamos la pantalla de carga una vez que sabemos que la vista raíz ya ha realizado el diseño.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
      <View style={{  alignItems: 'center', backgroundColor: "#64C9FF" , width: sizeX, height: sizeY} } onLayout={onLayoutRootView}>
        <Image source={require("./sources/img/MEMOCION.png")} style={{ width: sizeX * 0.8, height: sizeY * 0.25 }} resizeMode="contain" />
        <TouchableOpacity onPress={() => navigation.navigate("Codigo de barras")}  style={{ width: sizeX * 0.4, height: sizeY * 0.45, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ flex: 1, alignItems: 'Bottom', justifyContent: 'center' }}>
          <Image source={require("./sources/img/Cuentos.png")} style={{ width: sizeX, height: "100%" }} resizeMode="contain" />
          </View>
        </TouchableOpacity>
      </View>
  );
}


