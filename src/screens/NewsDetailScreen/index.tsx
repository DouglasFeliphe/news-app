import FavoriteButton from '@/components/FavoriteButton';
import Header from '@/components/Header';
import type { News } from '@/types/News';
import { formatDate } from '@/utils/dateUtils';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import {
  Container,
  Content,
  ContentContainer,
  ContentPadding,
  DateContainer,
  DateText,
  Description,
  FooterContainer,
  ImageContainer,
  ImageMetaContainer,
  ImageOverlay,
  NewsImage,
  ReadFullButton,
  ReadFullButtonText,
  SourceBadge,
  SourceInfo,
  SourceInfoText,
  SourceText,
  Title,
  TitleContainer,
} from './styles';
import Toast from 'react-native-toast-message';
import { useUrlHandler } from '@/hooks/useUrlHandler';
import { myTheme } from '@/theme/theme';

// const { width } = Dimensions.get('window');

interface NewsDetailScreenProps {
  route: {
    params: {
      news: News;
    };
  };
}

export default function NewsDetailScreen({ route }: NewsDetailScreenProps) {
  const { news } = route.params;
  const { isLoading, handleUrlOpen } = useUrlHandler();

  const handleReadFull = () => handleUrlOpen(news.url);

  if (!news.id || !news.title || !news.source) {
    return null;
  }

  return (
    <Container>
      <Header showBackButton title="Detalhes" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ContentContainer>
          {news.urlToImage && (
            <ImageContainer>
              <NewsImage source={{ uri: news.urlToImage }} resizeMode="cover" />
              <ImageOverlay
                colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                locations={[0, 1]}
              >
                <ImageMetaContainer>
                  <SourceBadge>
                    <SourceText>{news.source.name}</SourceText>
                  </SourceBadge>
                  <DateContainer>
                    <Ionicons name="time" size={14} color="#cbd5e1" />
                    <DateText>{formatDate(news.publishedAt)}</DateText>
                  </DateContainer>
                </ImageMetaContainer>
              </ImageOverlay>
            </ImageContainer>
          )}

          <ContentPadding>
            <TitleContainer>
              <Title>{news.title}</Title>
              <FavoriteButton news={news} newsId={news.id} />
            </TitleContainer>

            {!news.urlToImage && (
              <ImageMetaContainer style={{ marginBottom: 24 }}>
                <SourceBadge>
                  <SourceText>{news.source.name}</SourceText>
                </SourceBadge>
                <DateContainer>
                  <Ionicons name="time" size={14} color="#cbd5e1" />
                  <DateText>{formatDate(news.publishedAt)}</DateText>
                </DateContainer>
              </ImageMetaContainer>
            )}

            <Description>{news.description}</Description>
            <Content>{news.content}</Content>

            <FooterContainer>
              <ReadFullButton
                onPress={handleReadFull}
                activeOpacity={0.8}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <>
                    <Ionicons name="flash" size={16} color="white" />
                    <ReadFullButtonText>
                      Ler notícia completa
                    </ReadFullButtonText>
                    <Ionicons name="open-outline" size={16} color="white" />
                  </>
                )}
              </ReadFullButton>

              <SourceInfo>
                <Ionicons
                  name="person"
                  size={14}
                  color={myTheme.colors.textMuted}
                />
                <SourceInfoText>Fonte: {news.source.name}</SourceInfoText>
              </SourceInfo>
            </FooterContainer>
          </ContentPadding>
        </ContentContainer>
      </ScrollView>
    </Container>
  );
}
