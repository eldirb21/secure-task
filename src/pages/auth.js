/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';
import {Icons, Texts} from '@components';
const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});
import colors from '@styles/colors';

export default function Auth(props) {
  const [biometryTypes, setBiometryType] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCanceled, setauthCanceled] = useState(false);

  useEffect(() => {
    handleSensorAvailable();
  }, []);

  const handleSensorAvailable = async () => {
    setauthCanceled(false);
    let result = await rnBiometrics?.isSensorAvailable();
    if (result === 'TouchID') setBiometryType('Touch ID');
    else if (result === 'FaceID') setBiometryType('Face ID');
    else setBiometryType('None');
  };

  useEffect(() => {
    if (biometryTypes === 'None') {
      simplePrompt();
    }
  }, [biometryTypes]);

  const simplePrompt = async () => {
    rnBiometrics
      .simplePrompt({
        promptMessage: 'Biometric verification',
      })
      .then(result => {
        if (result.success) {
          setIsAuthenticated(true);
          console.log('Authenticated successfully', result);
        } else if (result.error) {
          setauthCanceled(true);
          console.error('Authentication failed', result.error);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleBiometric = () => {
    console.log('press me');
    simplePrompt();
  };

  useEffect(() => {
    if (isAuthenticated) {
      props.navigation.replace('Task');
    }
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icons name="security" size={30} color={colors.bordered} />
        <View style={styles.devider} />
        <Texts>Secure Task Locked</Texts>
      </View>

      <View style={styles.body}>
        {!authCanceled ? (
          <>
            <TouchableOpacity onPress={handleBiometric}>
              <Icons name="fingerprint" size={80} color={colors.bordered} />
            </TouchableOpacity>
            <View style={styles.devider} />
            <Texts>Touch the fingerprint sensor</Texts>
          </>
        ) : (
          <>
            <Icons
              type={'EvilIcons'}
              name="exclamation"
              size={60}
              color={colors.danger}
            />
            <View style={styles.devider} />
            <Texts>The fingerprint operation was canceled by the user</Texts>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  devider: {
    marginTop: 25,
  },
  body: {
    alignItems: 'center',
    flex: 1,
  },
});
