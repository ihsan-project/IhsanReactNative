import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { loggingOut as loggingOutAction } from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailContainer: {
    flex: 1,
  },
});

const Profile: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.detailContainer}>
        <Button title="Log Out" onPress={() => dispatch(loggingOutAction())} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
