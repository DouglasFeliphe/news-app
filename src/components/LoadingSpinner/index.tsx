'use client';

import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { LoadingContainer, LoadingText, SpinnerContainer } from './styles';
import { myTheme } from '@/theme/theme';

export default function LoadingSpinner({
  text = 'Carregando...',
}: {
  text?: string;
}) {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => spin());
    };
    spin();
  }, [spinValue]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LoadingContainer>
      <SpinnerContainer>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Ionicons name="refresh" size={32} color={myTheme.colors.success} />
        </Animated.View>
      </SpinnerContainer>
      <LoadingText>{text}</LoadingText>
    </LoadingContainer>
  );
}
