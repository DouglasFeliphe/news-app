import { useState, useEffect } from 'react';
import { TouchableOpacity, Animated } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from '@/hooks/use-toast';
import type { News } from '../../types/News';
import { getNewsById } from '../../services/api';
import { FavoriteButtonActive, FavoriteButtonInactive } from './styles';

interface FavoriteButtonProps {
  newsId: string;
  title: string;
  onRemove?: (id: string) => void;
}

export default function FavoriteButton({
  newsId,
  title,
  onRemove,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));
  const { showToast } = useToast();

  useEffect(() => {
    checkIfFavorite();
  }, [newsId]);

  const checkIfFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const favoritesArray: News[] = JSON.parse(favorites);
        setIsFavorite(favoritesArray.some((fav) => fav.id === newsId));
      }
    } catch (error) {
      console.error('Error checking favorites:', error);
    }
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const toggleFavorite = async () => {
    animateButton();

    try {
      const favorites = await AsyncStorage.getItem('favorites');
      const favoritesArray: News[] = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        const updatedFavorites = favoritesArray.filter(
          (fav) => fav.id !== newsId
        );
        await AsyncStorage.setItem(
          'favorites',
          JSON.stringify(updatedFavorites)
        );
        setIsFavorite(false);

        if (onRemove) {
          onRemove(newsId);
        }
        showToast(
          'success',
          'Removido dos favoritos',
          'Notícia removida com sucesso'
        );
      } else {
        const news = await getNewsById(newsId);
        if (news) {
          const updatedFavorites = [...favoritesArray, news];
          await AsyncStorage.setItem(
            'favorites',
            JSON.stringify(updatedFavorites)
          );
          setIsFavorite(true);
          showToast(
            'success',
            'Adicionado aos favoritos',
            'Notícia adicionada com sucesso'
          );
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      showToast('error', 'Erro ao atualizar favoritos');
    }
  };

  const ButtonComponent = isFavorite
    ? FavoriteButtonActive
    : FavoriteButtonInactive;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <ButtonComponent onPress={toggleFavorite} activeOpacity={0.7}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={16}
          color={isFavorite ? '#f59e0b' : '#64748b'}
        />
      </ButtonComponent>
    </Animated.View>
  );
}
