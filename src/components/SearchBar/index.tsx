'use client';

import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useState } from 'react';
import {
  SearchButton,
  SearchButtonText,
  SearchContainer,
  SearchIcon,
  SearchInput,
  SearchInputContainer,
} from './styles';
import { myTheme } from '@/theme/theme';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = 'Buscar notícias...',
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <SearchContainer>
      <SearchInputContainer>
        <MotiView
          from={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.3 }}
          transition={{
            type: 'spring',
            loop: true,
            repeatReverse: true,
            duration: 2000,
          }}
        >
          <SearchIcon name="search" size={20} />
        </MotiView>
        <SearchInput
          value={query}
          onChangeText={setQuery}
          placeholder={placeholder}
          placeholderTextColor={myTheme.colors.textMuted}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <MotiView
          from={{ scale: 1 }}
          animate={{ scale: 1.2 }}
          transition={{
            type: 'spring',
            loop: true,
            repeatReverse: true,
            duration: 2000,
          }}
        >
          <SearchButton onPress={handleSearch}>
            <Ionicons name="flash" size={16} color="white" />
            <SearchButtonText>Buscar</SearchButtonText>
          </SearchButton>
        </MotiView>
      </SearchInputContainer>
    </SearchContainer>
  );
}
