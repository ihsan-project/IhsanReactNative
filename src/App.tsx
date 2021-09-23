import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HomeContainer from './containers/Home';
import MainContainer from './containers/Main';
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

const App: React.FC = () => {
  const isLoggedIn = useSelector((state) => (state as any).auth.isLoggedIn);

  const dispatch = useDispatch();
  dispatch(appDidLoad());

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ProgressBar />
      {isLoggedIn ? <HomeContainer /> : <MainContainer />}
      <View style={styles.overlay}>
        <Overlay />
      </View>
    </>
  );
};

export default App;
