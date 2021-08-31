import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    opacity: 0.8,
  },
});

const Overlay: React.FC = () => {
  const loadingStates = useSelector((state) => (state as any).loading);
  const displayLoading = Object.keys(loadingStates).reduce(
    (p, c) => p || loadingStates[c],
    false,
  );

  if (displayLoading) {
    return <View style={styles.overlay} />;
  }

  return null;
};

export default Overlay;
