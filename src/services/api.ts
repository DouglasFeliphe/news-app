import axios from 'axios';
import { News } from '@/types/News';
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
  page: number = 1
): Promise<{ articles: News[]; totalResults: number }> {
  try {
    const params = {
      country: 'us',
      // language: 'pt',
      pageSize: 5,
      page,
      ...(category !== 'all' ? { category } : {}),
    };

    const response = await api.get<NewsAPIResponse>('/top-headlines', {
      params,
    });

    console.table('response :', response.data);

    const articles = response.data.articles.map((article, index) => ({
      id: `${article.publishedAt}-${index}`,
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
};
