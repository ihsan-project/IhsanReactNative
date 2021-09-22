import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { loggingOut as loggingOutAction } from '../actions';
import BookList from '../components/BookList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  booksContainer: {
    flex: 1,
  },
});

const Home: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <BookList />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.booksContainer}>
        <Button title="Log Out" onPress={() => dispatch(loggingOutAction())} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
