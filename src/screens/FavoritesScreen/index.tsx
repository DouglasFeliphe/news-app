import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import NewsCard from '@/components/NewsCard';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
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
import { useFavorites } from '@/hooks/useFavorites';
import { useFavoritesNavigation } from '@/hooks/useFavoritesNavigation';

export default function FavoritesScreen({ navigation }: any) {
  const { favorites, loading, refreshing, loadFavorites } = useFavorites();
  const { handleExplore } = useFavoritesNavigation(navigation);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });

    return unsubscribe;
  }, [navigation, loadFavorites]);

  const handleRefresh = () => {
    loadFavorites(true);
  };

  const renderNewsItem = ({ item }: { item: News }) =>
    item && <NewsCard news={item} showFavoriteButton />;

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
