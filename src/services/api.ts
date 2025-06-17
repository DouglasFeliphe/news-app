import type { News } from "../types/News"

// Mock news data
const newsData: News[] = [
  {
    id: "1",
    title: "Nova tecnologia de bateria promete revolucionar carros elétricos",
    description:
      "Pesquisadores desenvolveram uma bateria que pode ser carregada em apenas 5 minutos e tem autonomia de 800km.",
    content:
      "Uma equipe de pesquisadores da Universidade de Stanford desenvolveu uma nova tecnologia de bateria que promete revolucionar o mercado de carros elétricos. A bateria utiliza um novo tipo de eletrólito que permite carregamento ultra-rápido e maior densidade energética.",
    url: "https://example.com/nova-tecnologia-bateria",
    urlToImage: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=300&fit=crop",
    publishedAt: "2023-06-15T09:30:00Z",
    source: {
      id: "tech-news",
      name: "Tech News",
    },
  },
  {
    id: "2",
    title: "Empresa brasileira de software é adquirida por gigante internacional",
    description: "Startup de São Paulo especializada em inteligência artificial foi comprada por US$ 500 milhões.",
    content:
      "A BrainTech, startup brasileira especializada em soluções de inteligência artificial para o setor financeiro, foi adquirida pela multinacional americana TechGiant por US$ 500 milhões.",
    url: "https://example.com/empresa-brasileira-adquirida",
    urlToImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    publishedAt: "2023-06-14T14:45:00Z",
    source: {
      id: "business-daily",
      name: "Business Daily",
    },
  },
  {
    id: "3",
    title: "Descoberta nova espécie de peixe em águas profundas da Amazônia",
    description: "Cientistas encontraram um peixe bioluminescente a 200 metros de profundidade no Rio Negro.",
    content:
      "Uma equipe de biólogos do Instituto Nacional de Pesquisas da Amazônia (INPA) descobriu uma nova espécie de peixe bioluminescente nas águas profundas do Rio Negro.",
    url: "https://example.com/nova-especie-peixe-amazonia",
    urlToImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    publishedAt: "2023-06-13T11:20:00Z",
    source: {
      id: "science-today",
      name: "Science Today",
    },
  },
  // Add more mock data as needed...
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getNews(query = "", page = 1, category = "") {
  await delay(800) // Simulate network delay

  const pageSize = 12

  // Filter news based on query and category
  let filteredNews = [...newsData]

  if (query) {
    const queryLower = query.toLowerCase()
    filteredNews = filteredNews.filter(
      (news) => news.title.toLowerCase().includes(queryLower) || news.description.toLowerCase().includes(queryLower),
    )
  }

  if (category) {
    // Simulate category filtering
    const categoryMap: Record<string, string[]> = {
      business: ["2"],
      technology: ["1"],
      science: ["3"],
      sports: [],
      health: [],
      entertainment: [],
    }

    if (categoryMap[category]) {
      filteredNews = filteredNews.filter((news) => categoryMap[category].includes(news.id))
    }
  }

  // Calculate pagination
  const totalResults = filteredNews.length
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedNews = filteredNews.slice(startIndex, endIndex)

  return {
    articles: paginatedNews,
    totalResults,
  }
}

export async function getNewsById(id: string): Promise<News | null> {
  await delay(500) // Simulate network delay

  const news = newsData.find((item) => item.id === id)
  return news || null
}
