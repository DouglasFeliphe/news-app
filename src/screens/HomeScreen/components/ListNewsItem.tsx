import NewsCard from '@/components/NewsCard';
import { News } from '@/types/News';
import { MotiView } from 'moti';

type NewsItemProps = {
  item: News;
  index: number;
};

export function NewsItem({ item, index }: NewsItemProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: 'timing',
        duration: 500,
        delay: index * 50,
      }}
      exitTransition={{
        type: 'timing',
        duration: 400,
      }}
    >
      <NewsCard news={item} />
    </MotiView>
  );
}
