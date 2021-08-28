import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeContainer from './containers/Home';
import LoginContainer from './containers/Login';
import { appDidLoad } from './actions';
import ProgressBar from './components/ProgressBar';
import Overlay from './components/Overlay';

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Stack = createStackNavigator();

const App: React.FC = () => {
  const isLoggedIn = useSelector((state) => (state as any).auth.isLoggedIn);

  const dispatch = useDispatch();
  dispatch(appDidLoad());

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ProgressBar />
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Screen name="Home" component={HomeContainer} />
          ) : (
            <Stack.Screen
              name="Login"
              component={LoginContainer}
              options={{ title: 'Ihsan React Native' }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Overlay />
    </>
  );
};

export default App;
