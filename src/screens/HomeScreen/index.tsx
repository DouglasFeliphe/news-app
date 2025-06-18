import CategoryFilter from '@/components/CategoryFilter';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import NewsCard from '@/components/NewsCard';
import SearchBar from '@/components/SearchBar';
import { useNews } from '@/hooks/useNews';
import { useNewsFilters } from '@/hooks/useNewsFilters';
import { myTheme } from '@/theme/theme';
import type { News } from '@/types/News';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
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
  const {
    category,
    searchQuery,
    isSearching,
    handleSearch,
    handleCategoryChange,
    categories,
  } = useNewsFilters();

  const {
    news,
    loading,
    refreshing,
    hasMore,
    loadingMore,
    error,
    handleRefresh,
    handleLoadMore,
  } = useNews(category, searchQuery);

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
    <>
      {!loading && (
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
      )}
    </>
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
                categories={categories}
                selectedCategory={category}
                onCategoryChange={handleCategoryChange}
              />
            </MotiView>
          )}
          data={news}
          renderItem={renderNewsItem}
          keyExtractor={(item) => item.id ?? ''}
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
          ListEmptyComponent={renderEmpty}
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
