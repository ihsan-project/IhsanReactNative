import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ProgressBar as Bar, Colors } from 'react-native-paper';

const ProgressBar: React.FC = () => {
  const loadingStates = useSelector((state) => (state as any).loading);

  const [displayLoading, setDisplayLoading] = useState(false);

  useEffect(() => {
    const display = Object.keys(loadingStates).reduce(
      (p, c) => p || loadingStates[c],
      false,
    );
    setDisplayLoading(display);
  }, [loadingStates]);

  if (displayLoading) {
    return <Bar color={Colors.red800} indeterminate />;
  }

  return null;
};

export default ProgressBar;
