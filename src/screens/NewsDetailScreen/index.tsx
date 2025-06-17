import FavoriteButton from '@/components/FavoriteButton';
import Header from '@/components/Header';
import type { News } from '@/types/News';
import { formatDate } from '@/utils/dateUtils';
import { Ionicons } from '@expo/vector-icons';
import {
  Dimensions,
  Linking,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useState } from 'react';
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

const { width } = Dimensions.get('window');

interface NewsDetailScreenProps {
  route: {
    params: {
      news: News;
    };
  };
}

export default function NewsDetailScreen({ route }: NewsDetailScreenProps) {
  const { news } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const handleReadFull = async () => {
    try {
      setIsLoading(true);
      const supported = await Linking.canOpenURL(news.url);

      if (supported) {
        await Linking.openURL(news.url);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Falha ao abrir a notícia. Verifique a URL.',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Falha ao abrir a notícia. Tente novamente mais tarde.',
      });
    } finally {
      setIsLoading(false);
    }
  };

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
              <FavoriteButton newsId={news.id} title={news.title} />
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
                <Ionicons name="person" size={14} color="#64748b" />
                <SourceInfoText>Fonte: {news.source.name}</SourceInfoText>
              </SourceInfo>
            </FooterContainer>
          </ContentPadding>
        </ContentContainer>
      </ScrollView>
    </Container>
  );
}
