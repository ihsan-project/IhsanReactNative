import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import BookList from '../components/BookList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Home: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <BookList />
  </SafeAreaView>
);

export default Home;
