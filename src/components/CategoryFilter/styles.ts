import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const FilterContainer = styled.View`
  margin: 0 ${({ theme }) => theme.spacing.md}px
    ${({ theme }) => theme.spacing.md}px;
`;

export const FilterButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.shadows.medium};
`;

export const FilterButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: 500;
`;

export const CategoryItem = styled(TouchableOpacity)`
  padding: ${({ theme }) => theme.spacing.md}px
    ${({ theme }) => theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CategoryText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.md}px;
`;
