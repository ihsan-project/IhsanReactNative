import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import config from 'react-native-config';
import { googleAuthenticated, showLoading, hideLoading } from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  authContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const googleSignIn = async () => {
    dispatch(showLoading());

    try {
      if (await GoogleSignin.hasPlayServices()) {
        const userInfo = await GoogleSignin.signIn();

        dispatch(hideLoading());
        dispatch(googleAuthenticated(userInfo));
      } else {
        dispatch(hideLoading());
        Alert.alert('Google signing not available');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play services not available');
      } else {
        Alert.alert('Signin Error', error.message);
      }
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId: config.GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.authContainer}>
        {/* <Button title="Google Login" onPress={() => dispatch(logIn())} /> */}
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={googleSignIn}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
