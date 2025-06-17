import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { theme } from '@/styles/theme';

export const HeaderContainer = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const HeaderContent = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

export const LogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LogoIconContainer = styled.View`
  position: relative;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

export const SparkleIcon = styled(Ionicons)`
  position: absolute;
  top: -4px;
  right: -4px;
`;

export const LogoText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xl}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const NavContainer = styled.ScrollView.attrs(({ theme }) => ({
  contentContainerStyle: {
    gap: theme.spacing.sm,
  },
}))``;

export const NavButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm}px
    ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.xl}px;
  border-width: 1px;
`;

export const HomeButton = styled(NavButton)`
  background-color: rgba(16, 185, 129, 0.2);
  border-color: rgba(16, 185, 129, 0.3);
`;

export const FavoritesButton = styled(NavButton)`
  background-color: rgba(245, 158, 11, 0.2);
  border-color: rgba(245, 158, 11, 0.3);
`;

export const NavButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  margin-left: ${({ theme }) => theme.spacing.xs}px;
`;
