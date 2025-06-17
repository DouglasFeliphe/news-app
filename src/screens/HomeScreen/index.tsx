import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
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
import { myTheme } from '@/theme/theme';

export default function HomeScreen() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [category, setCategory] = useState<string | undefined>();

  useEffect(() => {
    let mounted = true;

    console.log(' rendered:');
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await getNews(category);
        console.log('response :', response);
        if (mounted) {
          setNews(response.articles);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchNews();

    return () => {
      mounted = false;
    };
  }, [category]);

  const handleSearch = (query: string) => {
    // Implement search functionality
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await getNews(category);
      setNews(response.articles);
    } catch (error) {
      console.error(error);
    }
    setRefreshing(false);
  };

  const handleLoadMore = () => {
    // Implement load more functionality
  };

  const renderNewsItem = ({ item, index }: { item: News; index: number }) => (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: 'timing',
        duration: 500,
        delay: index * 50,
      }}
      exitTransition={{
        type: 'timing',
        duration: 400,
      }}
    >
      <NewsCard news={item} />
    </MotiView>
  );

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
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <LoadingSpinner text="Carregando notícias..." />
        </MotiView>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <NewsGrid>
        <FlatList
          ListHeaderComponent={() => (
            <MotiView
              from={{ opacity: 0, translateY: -20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 600 }}
            >
              <HeroSection>
                <HeroTitle>Notícias em Destaque</HeroTitle>
                <HeroSubtitle>Descubra as últimas notícias</HeroSubtitle>
                <HeroMeta>
                  <MotiView
                    from={{ opacity: 0, translateY: 5 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                      type: 'timing',
                      duration: 1000,
                      loop: true,
                      repeatReverse: true,
                    }}
                  >
                    <Ionicons name="flash" size={16} color="#06b6d4" />
                  </MotiView>
                  <HeroMetaText>Atualizado em tempo real</HeroMetaText>
                </HeroMeta>
              </HeroSection>

              <SearchBar onSearch={handleSearch} />

              <CategoryFilter
                selectedCategory={category}
                onCategoryChange={handleCategoryChange}
              />
            </MotiView>
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
              colors={[myTheme.colors.primary, myTheme.colors.tertiary]}
              tintColor={myTheme.colors.primary}
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
