import { memo, useState, useEffect, useCallback } from 'react';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { useToast } from '@/hooks/use-toast';
import type { News } from '@/types/News';
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from '@/services/favoritesService';
import { FavoriteButtonActive, FavoriteButtonInactive } from './styles';
import { myTheme } from '@/theme/theme';

interface FavoriteButtonProps {
  newsId: string;
  news: News; // Add this prop
  isDisabled?: boolean;
  onPress?: (newsId: string) => void;
  children?: React.ReactNode; // Make optional
  onToggle?: (isFavorited: boolean) => void; // Add this prop
}

const FavoriteButton = ({
  news,
  newsId,
  isDisabled,
  onPress,
  onToggle,
  children,
}: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    checkIfFavorite();
  }, [newsId]);

  const checkIfFavorite = useCallback(async () => {
    try {
      const favorites = await getFavorites();
      const currentId = newsId || encodeURIComponent(news.url);
      const isFav = favorites.some(
        (fav) =>
          fav.id === currentId || encodeURIComponent(fav.url) === currentId
      );
      setIsFavorite(isFav);
    } catch (error) {
      console.error('Error checking favorites:', error);
      setIsFavorite(false);
    }
  }, [news.url, newsId]);

  const toggleFavorite = useCallback(async () => {
    if (isLoading || isDisabled) return;

    setIsLoading(true);
    try {
      const currentId = newsId || encodeURIComponent(news.url);
      const newState = !isFavorite;

      if (isFavorite) {
        await removeFromFavorites(currentId);
      } else {
        await addToFavorites({
          ...news,
          id: currentId,
        });
      }

      setIsFavorite(newState);
      onPress?.(currentId);
      onToggle?.(newState);

      showToast(
        'success',
        `${newState ? 'Adicionado aos' : 'Removido dos'} favoritos`
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
      showToast('error', 'Erro ao atualizar favoritos');
    } finally {
      setIsLoading(false);
    }
  }, [
    isLoading,
    isDisabled,
    isFavorite,
    news,
    newsId,
    onPress,
    onToggle,
    showToast,
  ]);

  const ButtonComponent = isFavorite
    ? FavoriteButtonActive
    : FavoriteButtonInactive;

  return (
    <MotiView
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{
        type: 'timing',
        duration: 200,
        loop: false,
      }}
    >
      <ButtonComponent onPress={toggleFavorite} activeOpacity={0.7}>
        <Ionicons
          size={16}
          name={isFavorite ? 'heart' : 'heart-outline'}
          color={isFavorite ? myTheme.colors.error : myTheme.colors.textMuted}
        />
      </ButtonComponent>
    </MotiView>
  );
};

export default memo(FavoriteButton);
