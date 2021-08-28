import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { ProgressBar as Bar, Colors } from 'react-native-paper';

const styles = StyleSheet.create({
  booksContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const ProgressBar: React.FC = () => {
  const loadingStates = useSelector((state) => (state as any).loading);
  const displayLoading = Object.keys(loadingStates).reduce(
    (p, c) => p || loadingStates[c],
    false,
  );

  return (
    <View style={styles.booksContainer}>
      {displayLoading && <Bar color={Colors.red800} indeterminate />}
    </View>
  );
};

export default ProgressBar;
