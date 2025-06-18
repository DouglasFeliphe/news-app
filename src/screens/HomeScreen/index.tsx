import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useNews } from '@/hooks/useNews';
import { useNewsFilters } from '@/hooks/useNewsFilters';
import { myTheme } from '@/theme/theme';
import { FlatList, RefreshControl } from 'react-native';
import { ListEmpty } from './components/ListEmpty';
import { ListFooter } from './components/ListFooter';
import { ListHeader } from './components/ListHeader';
import { NewsItem } from './components/ListNewsItem';
import { Container, NewsGrid } from './styles';

export default function HomeScreen() {
  const {
    category,
    searchQuery,
    // isSearching,
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
          ListHeaderComponent={
            <ListHeader
              categories={categories}
              category={category}
              handleSearch={handleSearch}
              handleCategoryChange={handleCategoryChange}
            />
          }
          data={news}
          renderItem={NewsItem}
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
          ListEmptyComponent={
            <ListEmpty
              loading={loading}
              error={error}
              searchQuery={searchQuery}
            />
          }
          ListFooterComponent={<ListFooter loadingMore={loadingMore} />}
        />
      </NewsGrid>
    </Container>
  );
}
