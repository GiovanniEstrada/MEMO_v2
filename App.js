import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenu from './MainMenu';
import CodeBar from './QrLector';
// import ContarCuento from './ContarCuento'
import Galeria from './Galeria'
import AudioPlayer from './Reproductor'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu principal">
        <Stack.Screen name="Menu principal" component={MainMenu} />
        <Stack.Screen name="Codigo de barras" component={CodeBar} />
        {/* <Stack.Screen name="Contar cuentos" component={ContarCuento} /> */}
        <Stack.Screen name="Galeria" component={Galeria} />
        <Stack.Screen name="Captura el momento" component={AudioPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;