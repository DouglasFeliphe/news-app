'use client';

import { useState } from 'react';
import { Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  FilterContainer,
  FilterButton,
  FilterButtonText,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CategoryItem,
  CategoryText,
} from './styles';
import type { Category } from '@/types/Category';

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
  const [modalVisible, setModalVisible] = useState(false);

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category);
    setModalVisible(false);
  };

  const getSelectedCategoryLabel = () => {
    return (
      categories.find((cat) => cat.id === selectedCategory)?.name || 'Todas'
    );
  };

  return (
    <FilterContainer>
      <FilterButton onPress={() => setModalVisible(true)}>
        <FilterButtonText>{getSelectedCategoryLabel()}</FilterButtonText>
        <Ionicons name="chevron-down" size={20} color="#64748b" />
      </FilterButton>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalContainer>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Selecionar Categoria</ModalTitle>
            </ModalHeader>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CategoryItem onPress={() => handleCategorySelect(item.id)}>
                  <CategoryText>{item.name}</CategoryText>
                  {selectedCategory === item.id && (
                    <Ionicons name="checkmark" size={20} color="#10b981" />
                  )}
                </CategoryItem>
              )}
            />
          </ModalContent>
        </ModalContainer>
      </Modal>
    </FilterContainer>
  );
}
