import { useRef } from 'react';
import { useLongPress } from 'ahooks';
import Link from 'next/link';
import { Article } from '@/src/interfaces/article';
import { useSelection } from '@/src/providers/SelectionProvider';



interface Props {
  article?: Article;
}
export function CardArticle({ article }: Props) {
  const { selected, toggle, isSelected } = useSelection();
  const ref = useRef<HTMLDivElement>(null);
  useLongPress(() => toggle(article?._id!), ref, {
    moveThreshold: { x: 5, y: 5 },
  });
  return (
    <div className="card-dashboard group" >
      <input
        type="checkbox"
        className={`card-dashboard-input ${
          selected.length !== 0 && 'opacity-100'
        }`}
        onChange={() => toggle(article?._id!)}
        checked={isSelected(article?._id!)}
      />
      <div ref={ref} className="">
        <img
          className="h-[12rem] w-full object-cover"
          src={
            article?.data.thumbnailUrl! ||
            'https://res.cloudinary.com/dcpr6059h/image/upload/v1678700721/No-Photo_ryvjpx.jpg'
          }
          alt={
            article?.data.description! || 'image description'
          }
        />
        <Link
          href={`/dashboard/pages/articles/${article?._id}`}
          className="flex items-center h-[3rem] mx-2 cursor-pointer"
        >
          <h2 className=" text-sm tracking-wide truncate">
            {article?.data.name}
          </h2>
        </Link>
      </div>
    </div>
  );
}