'use client';

import { useState } from 'react';
import { FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  FilterContainer,
  FilterButton,
  FilterButtonText,
  CategoryItem,
  CategoryText,
} from './styles';
import type { Category } from '@/types/Category';
import { Modal } from '../Modal';
import { useModal } from '@/contexts/modal';
import { myTheme } from '@/theme/theme';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const { openModal, closeModal } = useModal();

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category);
    closeModal();
  };

  const getSelectedCategoryLabel = () => {
    return (
      categories.find((cat) => cat.id === selectedCategory)?.name || 'Todas'
    );
  };

  return (
    <FilterContainer>
      <FilterButton onPress={() => openModal()}>
        <FilterButtonText>{getSelectedCategoryLabel()}</FilterButtonText>
        <Ionicons
          name="chevron-down"
          size={20}
          color={myTheme.colors.textMuted}
        />
      </FilterButton>

      <Modal>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryItem onPress={() => handleCategorySelect(item.id)}>
              <CategoryText>{item.name}</CategoryText>
              {selectedCategory === item.id && (
                <Ionicons
                  name="checkmark"
                  size={20}
                  color={myTheme.colors.success}
                />
              )}
            </CategoryItem>
          )}
        />
      </Modal>
    </FilterContainer>
  );
}
