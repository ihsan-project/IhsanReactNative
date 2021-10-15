import React from 'react';
import { StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LoginContainer from './containers/Login';
import MainContainer from './containers/Main';
import { appDidLoad } from './actions';
import ProgressBar from './components/ProgressBar';
import Overlay from './components/Overlay';

const App: React.FC = () => {
  const isLoggedIn = useSelector((state) => (state as any).auth.isLoggedIn);

  const dispatch = useDispatch();
  dispatch(appDidLoad());

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ProgressBar />
      {isLoggedIn ? <MainContainer /> : <LoginContainer />}
      <Overlay />
    </>
  );
};

export default App;
