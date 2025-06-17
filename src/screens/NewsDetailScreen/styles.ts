import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  margin: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.xl}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  ${({ theme }) => theme.shadows.large};
  overflow: hidden;
`;

export const ImageContainer = styled.View`
  height: 250px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.backgroundTertiary};
`;

export const NewsImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const ImageOverlay = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const ImageMetaContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  padding: ${({ theme }) => theme.spacing.sm}px;
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
`;

export const SourceBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl}px;
  padding: ${({ theme }) => theme.spacing.xs}px
    ${({ theme }) => theme.spacing.sm}px;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

export const SourceText = styled.Text`
  color: white;
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  font-weight: bold;
`;

export const DateContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DateText = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  margin-left: ${({ theme }) => theme.spacing.xs}px;
`;

export const ContentPadding = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.xxl}px;
  font-weight: bold;
  line-height: 32px;
  flex: 1;
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  line-height: 24px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  font-weight: 500;
`;

export const Content = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.md}px;
  line-height: 22px;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

export const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing.lg}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
`;

export const ReadFullButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl}px;
  padding: ${({ theme }) => theme.spacing.md}px
    ${({ theme }) => theme.spacing.lg}px;
  flex-direction: row;
  align-items: center;
  ${({ theme }) => theme.shadows.medium};
`;

export const ReadFullButtonText = styled.Text`
  color: white;
  font-size: ${({ theme }) => theme.fontSize.md}px;
  font-weight: bold;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

export const SourceInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SourceInfoText = styled.Text`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  margin-left: ${({ theme }) => theme.spacing.xs}px;
`;
