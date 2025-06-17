'use client';

import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  SearchButton,
  SearchButtonText,
  SearchContainer,
  SearchIcon,
  SearchInput,
  SearchInputContainer,
} from './styles';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = 'Buscar notícias incríveis...',
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <SearchContainer>
      <SearchInputContainer>
        <SearchIcon name="search" size={20} />
        <SearchInput
          value={query}
          onChangeText={setQuery}
          placeholder={placeholder}
          placeholderTextColor="#64748b"
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <SearchButton onPress={handleSearch}>
          <Ionicons name="flash" size={16} color="white" />
          <SearchButtonText>Buscar</SearchButtonText>
        </SearchButton>
      </SearchInputContainer>
    </SearchContainer>
  );
}
