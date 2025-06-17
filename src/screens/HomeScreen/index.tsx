import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import NewsCard from '@/components/NewsCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getNews } from '@/services/api';
import type { News } from '@/types/News';
import {
  Container,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  HeroMeta,
  HeroMetaText,
  NewsGrid,
  EmptyContainer,
  EmptyText,
} from './styles';

export default function HomeScreen() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [category, setCategory] = useState<string | undefined>();

  useEffect(() => {
    fetchNews();
  }, [category]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await getNews(category);
      setNews(response.articles);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    // Implement search functionality
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchNews();
    setRefreshing(false);
  };

  const handleLoadMore = () => {
    // Implement load more functionality
  };

  const renderNewsItem = ({ item }: { item: News }) => <NewsCard news={item} />;

  const renderEmpty = () => (
    <EmptyContainer>
      <Ionicons name="newspaper-outline" size={64} color="#64748b" />
      <EmptyText>Nenhuma notícia encontrada</EmptyText>
    </EmptyContainer>
  );

  if (loading && news.length === 0) {
    return (
      <Container>
        <Header />
        <LoadingSpinner text="Carregando notícias..." />
      </Container>
    );
  }

  return (
    <Container>
      <Header />

      <NewsGrid>
        <FlatList
          ListHeaderComponent={() => (
            <React.Fragment>
              <HeroSection>
                <HeroTitle>Notícias em Destaque</HeroTitle>
                <HeroSubtitle>Descubra as últimas notícias</HeroSubtitle>
                <HeroMeta>
                  <Ionicons name="flash" size={16} color="#06b6d4" />
                  <HeroMetaText>Atualizado em tempo real</HeroMetaText>
                </HeroMeta>
              </HeroSection>

              <SearchBar onSearch={handleSearch} />

              <CategoryFilter
                selectedCategory={category}
                onCategoryChange={handleCategoryChange}
              />
            </React.Fragment>
          )}
          data={news}
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
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </NewsGrid>
    </Container>
  );
}
