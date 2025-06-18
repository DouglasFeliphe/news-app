import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const HeroSection = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px
    ${({ theme }) => theme.spacing.md}px;
  align-items: center;
`;

export const HeroTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.xxxl}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

export const HeroSubtitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;

export const NewsGrid = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spacing.sm}px;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl}px;
  padding: ${({ theme }) => theme.spacing.xxl}px;
  align-items: center;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  ${({ theme }) => theme.shadows.large};
  max-width: 300px;
`;

export const EmptyTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.xl}px;
  font-weight: bold;
  text-align: center;
  margin: ${({ theme }) => theme.spacing.md}px 0;
`;

export const EmptyText = styled.Text`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSize.md}px;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  line-height: 20px;
`;

export const ExploreButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl}px;
  padding: ${({ theme }) => theme.spacing.md}px
    ${({ theme }) => theme.spacing.lg}px;
  flex-direction: row;
  align-items: center;
  ${({ theme }) => theme.shadows.medium};
`;

export const ExploreButtonText = styled.Text`
  color: white;
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: bold;
  margin-left: ${({ theme }) => theme.spacing.sm}px;
`;
