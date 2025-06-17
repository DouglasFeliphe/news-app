import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const FavoriteContainer = styled(TouchableOpacity)`
  padding: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  border-width: 1px;
`;

export const FavoriteButtonActive = styled(FavoriteContainer)`
  background-color: ${({ theme }) => theme.colors.secondary}30;
  border-color: ${({ theme }) => theme.colors.secondary}50;
`;

export const FavoriteButtonInactive = styled(FavoriteContainer)`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-color: ${({ theme }) => theme.colors.border};
`;
