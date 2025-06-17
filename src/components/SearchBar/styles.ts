import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const SearchContainer = styled.View`
  margin: ${({ theme }) => theme.spacing.md}px;
  position: relative;
`;

export const SearchInputContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md}px;
  ${({ theme }) => theme.shadows.medium};
`;

export const SearchIcon = styled(Ionicons)`
  margin-right: ${({ theme }) => theme.spacing.sm}px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.md}px;
  padding: 0;
`;

export const SearchButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.sm}px
    ${({ theme }) => theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing.sm}px;
  ${({ theme }) => theme.shadows.small};
`;

export const SearchButtonText = styled.Text`
  color: white;
  font-weight: bold;
  margin-left: ${({ theme }) => theme.spacing.xs}px;
`;
