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
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

export const HeroSubtitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

export const HeroMeta = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HeroMetaText = styled.Text`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  margin-left: ${({ theme }) => theme.spacing.xs}px;
`;

export const NewsGrid = styled.View`
  flex: 1;
  /* padding: 0 ${({ theme }) => theme.spacing.sm}px; */
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xxl}px;
`;

export const EmptyText = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;
