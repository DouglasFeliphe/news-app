import { useState, useCallback } from 'react';
import { getCategories } from '@/services/api';

export const useNewsFilters = () => {
  const [category, setCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  const categories = getCategories();

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
  }, []);

  const handleCategoryChange = useCallback((newCategory: string) => {
    setCategory(newCategory);
    setSearchQuery('');
    setIsSearching(false);
  }, []);

  const getSelectedCategoryLabel = useCallback(() => {
    return categories.find((cat) => cat.id === category)?.name || 'Todas';
  }, [category, categories]);

  return {
    categories,
    category,
    searchQuery,
    isSearching,
    handleSearch,
    handleCategoryChange,
    getSelectedCategoryLabel,
  };
};
