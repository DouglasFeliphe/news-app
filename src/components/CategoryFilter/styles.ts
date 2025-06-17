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

export const ModalContainer = styled.View`
  /* border: 2px solid red; */
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.overlay};
`;

export const ModalContent = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.xl}px;
  width: 80%;
  max-height: 60%;
  ${({ theme }) => theme.shadows.large};
`;

export const ModalHeader = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const ModalTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  font-weight: bold;
  text-align: center;
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
