'use client';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import type { News } from '@/types/News';
import { formatDate } from '@/utils/dateUtils';
import {
  CardContainer,
  ContentContainer,
  DateContainer,
  DateText,
  Description,
  ImageContainer,
  ImageOverlay,
  MetaContainer,
  NewsImage,
  ReadMoreContainer,
  ReadMoreText,
  SourceBadge,
  SourceText,
  SparkleIcon,
  Title,
  TitleContainer,
} from './styles';
import FavoriteButton from '../FavoriteButton';

const { width } = Dimensions.get('window');

interface NewsCardProps {
  news: News;
  showFavoriteButton?: boolean;
  onRemoveFavorite?: (id: string) => void;
}

export default function NewsCard({
  news,
  showFavoriteButton = true,
  onRemoveFavorite,
}: NewsCardProps) {
  const navigation = useNavigation();
  const [imageError, setImageError] = useState(false);

  const handlePress = () => {
    navigation.navigate('NewsDetail' as never, { news } as never);
  };

  return (
    <CardContainer onPress={handlePress} activeOpacity={0.8}>
      <ImageContainer>
        {news.urlToImage && !imageError ? (
          <>
            <NewsImage
              source={{ uri: news.urlToImage }}
              onError={() => setImageError(true)}
              resizeMode="cover"
            />
            <ImageOverlay />
          </>
        ) : (
          <ImageContainer
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Ionicons name="image" size={32} color="#64748b" />
          </ImageContainer>
        )}
        <MotiView
          from={{
            scale: 0.5,
            opacity: 0.6,
          }}
          animate={{
            scale: 1.1,
            opacity: 1,
          }}
          transition={{
            type: 'timing',
            duration: 800,
            loop: true,
          }}
        >
          <SparkleIcon name="sparkles" size={16} />
        </MotiView>
      </ImageContainer>

      <ContentContainer>
        <TitleContainer>
          <Title numberOfLines={2}>{news.title}</Title>
          {showFavoriteButton && (
            <FavoriteButton
              newsId={news.id}
              title={news.title}
              onRemove={onRemoveFavorite}
            />
          )}
        </TitleContainer>

        <MetaContainer>
          <SourceBadge>
            <SourceText>{news.source.name}</SourceText>
          </SourceBadge>
          <DateContainer>
            <Ionicons name="time" size={12} color="#64748b" />
            <DateText>{formatDate(news.publishedAt)}</DateText>
          </DateContainer>
        </MetaContainer>

        <Description numberOfLines={3}>{news.description}</Description>

        <ReadMoreContainer>
          <ReadMoreText>Ler mais</ReadMoreText>
          <Ionicons name="arrow-forward" size={12} color="#10b981" />
        </ReadMoreContainer>
      </ContentContainer>
    </CardContainer>
  );
}
