import { useCallback } from 'react';

export function useFavoritesNavigation(navigation: any) {
  const handleExplore = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return {
    handleExplore,
  };
}
