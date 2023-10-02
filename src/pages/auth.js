/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
import {View, StyleSheet, TouchableOpacity, AppState} from 'react-native';
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
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        if (biometryTypes === 'None' || biometryTypes === null) {
          simplePrompt();
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, [biometryTypes]);

  const simplePrompt = async () => {
    setauthCanceled(false);

    rnBiometrics
      .simplePrompt({
        promptMessage: 'Biometric verification',
      })
      .then(result => {
        if (result.success) {
          setIsAuthenticated(true);
        } else if (result.error) {
          setauthCanceled(true);
        }
      })
      .catch(() => setauthCanceled(true));
  };

  const handleBiometric = () => {
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
        <Icons name="lock" size={30} color={colors.buttonColor} />
        <View style={styles.devider} />
        <Texts>Secure Task Locked</Texts>
      </View>

      <View style={styles.body}>
        {!authCanceled ? (
          <>
            <TouchableOpacity onPress={handleBiometric}>
              <Icons name="fingerprint" size={70} color={colors.bordered} />
            </TouchableOpacity>
            <View style={styles.devider} />
            <Texts>Touch the fingerprint sensor</Texts>
          </>
        ) : (
          <>
            <Icons
              type="SimpleLineIcons"
              name="info"
              size={40}
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
