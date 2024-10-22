import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';


export default function CodeBar() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setQrData(data);
    AZUL_TRISTEZA: require('./sources/audio/TRISTEZA.mp3')
    // Verificar el valor del QR
    if (data === 'AMARILLO_ALEGRIA' || data === 'VERDE_CALMA' || data === 'NEGRO_MIEDO' || data === 'ROJO_ENOJO' || data === 'AZUL_TRISTEZA') {
      // Navegar a la pantalla correspondiente
      navigation.navigate('Captura el momento', { songCode: data });
    } else {
      // Mostrar un mensaje de QR no válido
      alert('QR no válido');
    }
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <View style={styles.scanResultContainer}>
          <Text style={styles.scanResultText}>QR Code Scanned:</Text>
          <Text style={styles.qrDataText}>{qrData}</Text>
          <Button
            title="Escanear de nuevo"
            onPress={() => {
              setScanned(false);
              setQrData('');
            }}
          />
        </View>
      )}

      {!scanned && !hasPermission && (
        <Text style={styles.permissionText}>Se necesita permiso para acceder a la cámara</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scanResultContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  scanResultText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  qrDataText: {
    fontSize: 16,
    marginTop: 10,
  },
  permissionText: {
    fontSize: 18,
    alignSelf: 'center',
  },
});
