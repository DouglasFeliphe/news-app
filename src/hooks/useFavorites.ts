import { getFavorites } from '@/services/favoritesService';
import type { News } from '@/types/News';
import { useState, useCallback } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadFavorites = useCallback(async (refresh = false) => {
    try {
      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const favoritedNews = await getFavorites();
      const validNews = favoritedNews.filter(
        (item): item is News =>
          item !== null &&
          typeof item === 'object' &&
          typeof item.url === 'string'
      );
      setFavorites(validNews);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  return {
    favorites,
    loading,
    refreshing,
    loadFavorites,
  };
}
