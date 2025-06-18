import { getNews } from '@/services/api';
import type { News } from '@/types/News';
import { useEffect, useState } from 'react';

export const useNews = (category?: string, searchQuery: string = '') => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState<string | null>(null);

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
        }
      }
    };

    const debounceTimeout = setTimeout(fetchNews, 500);

    return () => {
      mounted = false;
      clearTimeout(debounceTimeout);
    };
  }, [category, searchQuery]);

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

  return {
    news,
    loading,
    refreshing,
    hasMore,
    loadingMore,
    error,
    handleRefresh,
    handleLoadMore,
    setNews,
  };
};
