import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { myTheme } from '@/theme/theme';
import { MotiView } from 'moti';

export const HeaderContainer = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};

  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.35;
  shadow-radius: 5px;
  elevation: 12;

  /* flex: 1; */

  /* border: 2px solid red; */
`;

export const HeaderContent = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
  padding-left: ${({ theme }) => theme.spacing.md}px;
  padding-top: ${({ theme }) => theme.spacing.lg}px;
  /* border: 2px solid; */
`;

export const LogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  /* border: 2px solid blue; */
`;

export const LogoIconContainer = styled(MotiView)`
  position: relative;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

export const SparkleIcon = styled(Ionicons)`
  position: absolute;
  top: -4px;
  right: -4px;
`;

export const HeaderTitle = styled.Text`
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
  background-color: ${({ theme }) => theme.colors.primary}30;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const FavoritesButton = styled(NavButton)`
  background-color: ${({ theme }) => theme.colors.secondary}30;
  border-color: ${({ theme }) => theme.colors.secondary};
`;

type NavButtonTextProps = {
  color?: keyof typeof myTheme.colors;
};

export const NavButtonText = styled.Text<NavButtonTextProps>`
  color: ${({ color, theme }) => theme.colors[color ?? 'text']};
  font-weight: 600;
  margin-left: ${({ theme }) => theme.spacing.xs}px;
`;
