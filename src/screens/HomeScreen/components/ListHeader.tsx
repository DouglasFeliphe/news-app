import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import { myTheme } from '@/theme/theme';
import { Category } from '@/types/Category';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import {
  HeroMeta,
  HeroMetaText,
  HeroSection,
  HeroSubtitle,
  HeroTitle,
} from '../styles';

type ListHeaderProps = {
  categories: Category[];
  category: string;
  handleSearch: (query: string) => void;
  handleCategoryChange: (category: string) => void;
};

export function ListHeader({
  categories,
  category,
  handleSearch,
  handleCategoryChange,
}: ListHeaderProps) {
  return (
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
            <Ionicons name="flash" size={16} color={myTheme.colors.secondary} />
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
  );
}
