import { useState, useCallback } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';
import NewsCard from '../../components/NewsCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import type { News } from '../../types/News';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const HeroSection = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px
    ${({ theme }) => theme.spacing.md}px;
  align-items: center;
`;

const HeroTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xxxl}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.warning};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const HeroSubtitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;

const NewsGrid = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spacing.sm}px;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xxl}px;
`;

const EmptyCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl}px;
  padding: ${({ theme }) => theme.spacing.xxl}px;
  align-items: center;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  ${({ theme }) => theme.shadows.large};
  max-width: 300px;
`;

const EmptyTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.xl}px;
  font-weight: bold;
  text-align: center;
  margin: ${({ theme }) => theme.spacing.md}px 0;
`;

const EmptyText = styled.Text`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSize.md}px;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  line-height: 20px;
`;

const ExploreButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl}px;
  padding: ${({ theme }) => theme.spacing.md}px
    ${({ theme }) => theme.spacing.lg}px;
  flex-direction: row;
  align-items: center;
  ${({ theme }) => theme.shadows.medium};
`;

const ExploreButtonText = styled.Text`
  color: white;
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: bold;
  margin-left: ${({ theme }) => theme.spacing.sm}px;
`;

export default function FavoritesScreen({ navigation }: any) {
  const [favorites, setFavorites] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async (refresh = false) => {
    try {
      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      const updatedFavorites = favorites.filter((item) => item.id !== id);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleRefresh = () => {
    loadFavorites(true);
  };

  const handleExplore = () => {
    navigation.navigate('Home');
  };

  const renderNewsItem = ({ item }: { item: News }) => (
    <NewsCard news={item} onRemoveFavorite={removeFavorite} />
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
          keyExtractor={(item) => item.id}
          numColumns={2}
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
