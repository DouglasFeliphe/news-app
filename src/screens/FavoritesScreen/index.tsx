import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import NewsCard from '@/components/NewsCard';
import { getFavorites, removeFromFavorites } from '@/services/favoritesService';
import type { News } from '@/types/News';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState, useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import {
  Container,
  EmptyCard,
  EmptyContainer,
  EmptyText,
  EmptyTitle,
  ExploreButton,
  ExploreButtonText,
  HeroSection,
  HeroSubtitle,
  HeroTitle,
  NewsGrid,
} from './styles';

export default function FavoritesScreen({ navigation }: any) {
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
      console.log('Loading favorites:', {
        count: favoritedNews.length,
        favorites: favoritedNews,
      });

      // Filter out any null or invalid entries
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });

    return unsubscribe;
  }, [navigation, loadFavorites]);

  // const handleRemoveFavorite = async (id: string) => {
  //   try {
  //     await removeFromFavorites(id);
  //     await loadFavorites(); // Reload the entire list
  //   } catch (error) {
  //     console.error('Error removing favorite:', error);
  //   }
  // };

  const handleRefresh = () => {
    loadFavorites(true);
  };

  const handleExplore = () => {
    navigation.navigate('Home');
  };

  const renderNewsItem = ({ item }: { item: News }) =>
    item && (
      <NewsCard
        news={item}
        // onRemoveFavorite={handleRemoveFavorite}
        showFavoriteButton
      />
    );

  const renderEmpty = () => (
    <EmptyContainer>
      <EmptyCard>
        <Ionicons name="heart-outline" size={64} color="#64748b" />
        <EmptyTitle>Você ainda não tem notícias favoritas</EmptyTitle>
        <EmptyText>
          Explore nossa coleção de notícias e salve suas favoritas!
        </EmptyText>
        <ExploreButton onPress={handleExplore} activeOpacity={0.8}>
          <Ionicons name="flash" size={16} color="white" />
          <ExploreButtonText>Explorar notícias</ExploreButtonText>
        </ExploreButton>
      </EmptyCard>
    </EmptyContainer>
  );

  if (loading) {
    return (
      <Container>
        <Header showBackButton title="Favoritos" />
        <LoadingSpinner text="Carregando favoritos..." />
      </Container>
    );
  }

  return (
    <Container>
      <Header showBackButton title="Favoritos" />

      <HeroSection>
        <HeroTitle>Suas Notícias Favoritas</HeroTitle>
        <HeroSubtitle>Todas as notícias que você salvou</HeroSubtitle>
      </HeroSection>

      <NewsGrid>
        <FlatList
          data={favorites}
          renderItem={renderNewsItem}
          keyExtractor={(item) => item.id ?? ''}
          // numColumns={1}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#10b981']}
              tintColor="#10b981"
            />
          }
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
        />
      </NewsGrid>
    </Container>
  );
}
