import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const FavoriteContainer = styled(TouchableOpacity)`
  padding: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  border-width: 1px;
`;

export const FavoriteButtonActive = styled(FavoriteContainer)`
  background-color: rgba(245, 158, 11, 0.2);
  border-color: rgba(245, 158, 11, 0.5);
`;

export const FavoriteButtonInactive = styled(FavoriteContainer)`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-color: ${({ theme }) => theme.colors.border};
`;
