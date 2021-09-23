import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeContainer from './Home';
import ProfileContainer from './Profile';

const Drawer = createDrawerNavigator();

const Main: React.FC = () => (
  <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeContainer} />
      <Drawer.Screen name="Profile" component={ProfileContainer} />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default Main;
