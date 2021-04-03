import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  Button,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../actions/countActions';

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
  const count = useSelector((state) => (state as any).count.count);
  console.log('count = ', count);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.detailContainer}>
          <Text>Test!</Text>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.booksContainer}>
          <Text>Hello world</Text>
          <Text>{count}</Text>
          <Button
            title="Press Me"
            color="#841584"
            onPress={() => {
              dispatch(add(1));
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
