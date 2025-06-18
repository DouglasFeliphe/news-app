import CategoryFilter from '@/components/CategoryFilter';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import NewsCard from '@/components/NewsCard';
import SearchBar from '@/components/SearchBar';
import { getNews } from '@/services/api';
import { myTheme } from '@/theme/theme';
import type { News } from '@/types/News';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import {
  Container,
  EmptyContainer,
  EmptyText,
  HeroMeta,
  HeroMetaText,
  HeroSection,
  HeroSubtitle,
  HeroTitle,
  NewsGrid,
} from './styles';

export default function HomeScreen() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [category, setCategory] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getNews(category, 1, searchQuery);
        if (mounted) {
          setNews(response.articles);
          setTotalResults(response.totalResults);
          setHasMore(
            response.articles.length > 0 &&
              response.articles.length < response.totalResults
          );
          setPage(1);
        }
      } catch (error) {
        if (mounted) {
          setError(
            error instanceof Error ? error.message : 'Erro ao carregar notícias'
          );
          setHasMore(false);
        }
      } finally {
        if (mounted) {
          setLoading(false);
          setIsSearching(false);
        }
      }
    };

    const debounceTimeout = setTimeout(fetchNews, 500);

    return () => {
      mounted = false;
      clearTimeout(debounceTimeout);
    };
  }, [category, searchQuery]);

  const handleSearch = (query: string) => {
    setNews([]);
    setSearchQuery(query);
    setPage(1);
    setHasMore(true);
    setIsSearching(true);
    setError(null);
  };

  const handleCategoryChange = (newCategory: string) => {
    setNews([]);
    setCategory(newCategory);
    setSearchQuery(''); // Clear search when changing categories
    setPage(1);
    setHasMore(true);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await getNews(category, 1, searchQuery);
      setNews(response.articles);
      setTotalResults(response.totalResults);
      setHasMore(
        response.articles.length > 0 &&
          response.articles.length < response.totalResults
      );
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
      const response = await getNews(category, nextPage, searchQuery);

      if (response.articles.length > 0) {
        setNews((prev) => [...prev, ...response.articles]);
        setPage(nextPage);
        setHasMore(news.length + response.articles.length < totalResults);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Erro ao carregar mais notícias'
      );
      setHasMore(false);
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
      <Ionicons
        name={error ? 'alert-circle-outline' : 'newspaper-outline'}
        size={64}
        color="#64748b"
      />
      <EmptyText>
        {error ||
          (searchQuery
            ? 'Nenhum resultado encontrado'
            : 'Nenhuma notícia disponível')}
      </EmptyText>
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
                    <Ionicons
                      name="flash"
                      size={16}
                      color={myTheme.colors.primary}
                    />
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
              tintColor={myTheme.colors.tertiary}
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={!loading && renderEmpty}
          ListFooterComponent={
            loadingMore ? (
              <LoadingSpinner text="Carregando mais notícias..." />
            ) : null
          }
        />
      </NewsGrid>
    </Container>
  );
}
