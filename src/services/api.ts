import axios from 'axios';
import { News } from '@/types/News';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NEWS_API_KEY } from '@env';

const api = axios.create({
  baseURL: 'https://newsapi.org/v2',
  params: {
    // apiKey: NEWS_API_KEY,
    apiKey: 'e73e3fa6f3094da4aed15b891f6fcf44',
  },
});

interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: Array<{
    source: {
      id: string | null;
      name: string;
    };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
  }>;
}

export async function getNews(
  category: string = 'all',
  page: number = 1,
  searchQuery?: string
): Promise<{ articles: News[]; totalResults: number }> {
  try {
    let endpoint = '/top-headlines';
    let params: any = {
      country: 'us',
      pageSize: 10,
      page,
    };

    if (searchQuery) {
      endpoint = '/everything';
      params = {
        q: searchQuery,
        pageSize: 10,
        page,
        sortBy: 'publishedAt',
      };
    } else if (category !== 'all') {
      params.category = category;
    }

    const response = await api.get<NewsAPIResponse>(endpoint, { params });

    console.table('response :', response.data);

    // Add unique IDs to each article
    const articles = response.data.articles.map((article, index) => ({
      id: article.url
        ? encodeURIComponent(article.url)
        : `${article.publishedAt}-${index}`,
      title: article.title,
      description: article.description || '',
      content: article.content || '',
      url: article.url,
      urlToImage:
        article.urlToImage ||
        'https://via.placeholder.com/400x200?text=Notícia',
      publishedAt: article.publishedAt,
      author: article.author || 'Desconhecido',
      source: article.source,
    }));

    return {
      articles,
      totalResults: response.data.totalResults,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Erro ao carregar notícias: ${
          error.response?.data?.message || error.message
        }`
      );
    }
    throw error;
  }
}

export async function getNewsById(id: string): Promise<News | null> {
  try {
    // Since NewsAPI doesn't provide a single article endpoint,
    // we'll get it from localStorage if it exists
    const favorites = await AsyncStorage.getItem('@NewsApp:favorites');
    if (favorites) {
      const parsedFavorites = JSON.parse(favorites);
      const found = parsedFavorites.find((item: News) => item.id === id);
      if (found) return found;
    }
    return null;
  } catch (error) {
    console.error('Error fetching news by id:', error);
    return null;
  }
}

export const getCategories = () => [
  { id: 'all', name: 'Todas' },
  { id: 'general', name: 'Geral' },
  { id: 'business', name: 'Negócios' },
  { id: 'entertainment', name: 'Entretenimento' },
  { id: 'health', name: 'Saúde' },
  { id: 'science', name: 'Ciência' },
  { id: 'sports', name: 'Esportes' },
  { id: 'technology', name: 'Tecnologia' },
];

export default {
  getNews,
  getCategories,
  getNewsById,
};
