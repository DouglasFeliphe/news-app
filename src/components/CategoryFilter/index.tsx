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

const categories = [
  { value: 'all', label: 'Todas as categorias' },
  { value: 'business', label: 'Negócios' },
  { value: 'entertainment', label: 'Entretenimento' },
  { value: 'health', label: 'Saúde' },
  { value: 'science', label: 'Ciência' },
  { value: 'sports', label: 'Esportes' },
  { value: 'technology', label: 'Tecnologia' },
];

interface CategoryFilterProps {
  selectedCategory?: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedLabel =
    categories.find((cat) => cat.value === selectedCategory)?.label ||
    'Todas as categorias';

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category === 'all' ? '' : category);
    setModalVisible(false);
  };

  return (
    <FilterContainer>
      <FilterButton onPress={() => setModalVisible(true)}>
        <FilterButtonText>{selectedLabel}</FilterButtonText>
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
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <CategoryItem onPress={() => handleCategorySelect(item.value)}>
                  <CategoryText>{item.label}</CategoryText>
                  {(selectedCategory === item.value ||
                    (selectedCategory === '' && item.value === 'all')) && (
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
