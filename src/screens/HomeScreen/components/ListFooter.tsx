import LoadingSpinner from '@/components/LoadingSpinner';

type ListFooterProps = {
  loadingMore: boolean;
};

export function ListFooter({ loadingMore }: ListFooterProps) {
  if (loadingMore) return null;
  return <LoadingSpinner text="Carregando mais notícias..." />;
}
