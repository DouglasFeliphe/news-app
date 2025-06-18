import { Ionicons } from '@expo/vector-icons';
import { EmptyContainer, EmptyText } from '../styles';
import { myTheme } from '@/theme/theme';

type ListEmptyProps = {
  loading: boolean;
  error: string | null;
  searchQuery: string;
};
export function ListEmpty({ loading, error, searchQuery }: ListEmptyProps) {
  if (loading) return null;
  return (
    <EmptyContainer>
      <Ionicons
        name={error ? 'alert-circle-outline' : 'newspaper-outline'}
        size={64}
        color={myTheme.colors.textMuted}
      />
      <EmptyText>
        {error ||
          (searchQuery
            ? 'Nenhum resultado encontrado'
            : 'Nenhuma notícia disponível')}
      </EmptyText>
    </EmptyContainer>
  );
}
