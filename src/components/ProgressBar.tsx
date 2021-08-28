import React from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { ProgressBar as Bar, Colors } from 'react-native-paper';

const ProgressBar: React.FC = () => {
  const loadingStates = useSelector((state) => (state as any).loading);
  const displayLoading = Object.keys(loadingStates).reduce(
    (p, c) => p || loadingStates[c],
    false,
  );

  return (
    <View>{displayLoading && <Bar color={Colors.red800} indeterminate />}</View>
  );
};

export default ProgressBar;
