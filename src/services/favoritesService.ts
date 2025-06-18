import AsyncStorage from '@react-native-async-storage/async-storage';
import type { News } from '@/types/News';

const FAVORITES_KEY = '@NewsApp:favorites';

export const getFavorites = async (): Promise<News[]> => {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
    console.log('Raw favorites from storage:', favorites);

    if (!favorites) return [];

    const parsed = JSON.parse(favorites);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const addToFavorites = async (news: News): Promise<void> => {
  try {
    if (!news?.url) {
      throw new Error('Invalid news data');
    }

    const currentId = news.id || encodeURIComponent(news.url);
    const newsWithId = { ...news, id: currentId };

    const favorites = await getFavorites();
    const exists = favorites.some(
      (fav) => fav.id === currentId || fav.url === news.url
    );

    if (!exists) {
      const updatedFavorites = [...favorites, newsWithId];
      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites)
      );

      // Verify the save was successful
      const saved = await getFavorites();
      if (!saved.some((item) => item.id === currentId)) {
        throw new Error('Failed to save favorite');
      }

      console.log('Added to favorites:', {
        id: currentId,
        total: updatedFavorites.length,
      });
    }
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

export const removeFromFavorites = async (newsId: string): Promise<void> => {
  try {
    if (!newsId) {
      throw new Error('News ID is required');
    }

    const favorites = await getFavorites();
    const updatedFavorites = favorites.filter(
      (item) => item.id !== newsId && encodeURIComponent(item.url) !== newsId
    );

    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    console.log('Removed from favorites:', {
      id: newsId,
      total: updatedFavorites.length,
    });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};
