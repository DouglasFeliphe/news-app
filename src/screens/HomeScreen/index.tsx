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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    let mounted = true;

    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await getNews(category, 1);
        if (mounted) {
          setNews(response.articles);
          setTotalResults(response.totalResults);
          setHasMore(response.articles.length < response.totalResults);
          setPage(1);
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
    setNews([]);
    setCategory(newCategory);
    setPage(1);
    setHasMore(true);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await getNews(category, 1);
      setNews(response.articles);
      setTotalResults(response.totalResults);
      setHasMore(response.articles.length < response.totalResults);
      setPage(1);
    } catch (error) {
      console.error(error);
    }
    setRefreshing(false);
  };

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore || loading) return;

    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const response = await getNews(category, nextPage);

      if (response.articles.length > 0) {
        setNews((prev) => [...prev, ...response.articles]);
        setPage(nextPage);
        setHasMore(
          news.length + response.articles.length < response.totalResults
        );
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMore(false);
    }
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
          numColumns={1}
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
          ListFooterComponent={
            hasMore ? (
              <LoadingSpinner text="Carregando mais notícias..." />
            ) : null
          }
        />
      </NewsGrid>
    </Container>
  );
}
