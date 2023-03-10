'use client'
import { HeadingDashboard } from './HeadingDashboard'
import MarkdownEditor from './MarkdownEditor'
import { useGetArticleById } from '@/src/hooks/useArticles1'
import { Article } from '@/src/interfaces/article'

interface Props {
  article: Article
}

export default function ArticleEditor(props: Props) {
  const { data: article } = useGetArticleById(props.article)
  return (
    <>
      <div className='mb-6'>
        <HeadingDashboard title={article?.data.name} article={article} />
      </div>
      <MarkdownEditor markdown={article?.data.content as string} id={props.article._id} />
      {/* <Modal /> */}
    </>
  )
}
