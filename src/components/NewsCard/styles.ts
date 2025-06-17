import { Ionicons } from '@expo/vector-icons';
import { Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2 - 8;

export const CardContainer = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl}px;
  margin: ${({ theme }) => theme.spacing.sm}px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  ${({ theme }) => theme.shadows.medium};
  /* width: ${cardWidth}px; */
`;

export const ImageContainer = styled.View`
  height: 120px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.backgroundTertiary};
`;

export const NewsImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const ImageOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const SparkleIcon = styled(Ionicons)`
  position: absolute;
  top: 8px;
  right: 8px;
  color: #eab308;
`;

export const ContentContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.md}px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.sm}px;
  font-weight: bold;
  flex: 1;
  line-height: 18px;
`;

export const MetaContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  flex-wrap: wrap;
`;

export const SourceBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl}px;
  padding: ${({ theme }) => theme.spacing.xs}px
    ${({ theme }) => theme.spacing.sm}px;
  margin-right: ${({ theme }) => theme.spacing.xs}px;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

export const SourceText = styled.Text`
  color: white;
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  font-weight: bold;
`;

export const DateContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

export const DateText = styled.Text`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  margin-left: ${({ theme }) => theme.spacing.xs}px;
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  line-height: 16px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

export const ReadMoreContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ReadMoreText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.xs}px;
  font-weight: bold;
  margin-right: ${({ theme }) => theme.spacing.xs}px;
`;
