export interface News {
  id?: string; // Make id optional since it might not exist initially
  title: string;
  description: string | null;
  content: string | null;
  author: string | null;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  url: string;
  urlToImage: string | null;
}
