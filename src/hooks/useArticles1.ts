
import { createPortfolioArticle } from "@/lib/articles/create";
import { getPortfolioArticleById, getPortfolioArticlesByParentId, getPortfolioArticlesWithCursorByParentId } from "@/lib/articles/read";
import { updatePortfolioArticleById, updatePortfolioArticleContentById } from "@/lib/articles/update";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Article, CreateArticle, ListArticle, UpdateArticle, UpdateContentArticle } from "../interfaces/article";
import { Error } from "../interfaces/error";
import { useUI } from "../providers/UIProvider";
import { SwalMessage, SwalMessageError, SwalMessageSiteCreateError, SwalMessageTime } from "../utils";

export const useCreateArticle1 = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateArticle) => await createPortfolioArticle(input),

    onSuccess: async (data) => {
      queryClient.setQueryData<Article[]>(['portfolio-get-articles1-by-id', data.parentId], (old) => [...old!, data])
      
      await SwalMessage('Article Created');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}
export const useCreateArticle2 = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateArticle) => await createPortfolioArticle(input),

    onSuccess: async (data) => {
      queryClient.setQueryData<Article[]>(['portfolio-get-articles2-by-id', data.parentId], (old) => [...old!, data])

      await SwalMessage('Article Created');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}

export const useUpdateArticle = () => {
  const {
    toggleSlideOversForm: {
      value,
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateArticle) => await updatePortfolioArticleById(input),

    onSuccess: async (data) => {
      queryClient.setQueryData<Article>(['portfolio-get-article', data._id], data);
      queryClient.setQueryData<Article>(['article', data.slug], data);
      await SwalMessageTime('Article Updated', 2000);
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}
export const useGetArticleById = (article: Article) => {
  return useQuery<Article>({
    queryKey: ['portfolio-get-article-by-id', article._id ],
    queryFn: () => getPortfolioArticleById( article._id ),
    initialData: article
  });
} 

export const useGetArticles1ByParentId = (parentId: string, articles: Article[]) => {
  return useQuery<Article[]>({
    queryKey: ['portfolio-get-articles1-by-id', parentId],
    queryFn: () => getPortfolioArticlesByParentId(parentId),
    initialData: articles
  });
}
export const useGetArticles2ByParentId = (parentId: string, articles: Article[]) => {
  return useQuery<Article[]>({
    queryKey: ['portfolio-get-articles2-by-id', parentId],
    queryFn: () => getPortfolioArticlesByParentId(parentId),
    initialData: articles
  });
}
export const useUpdateArticleContentById = () => {
  const {
    toggleSlideOversForm: {
      value,
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateContentArticle) => await updatePortfolioArticleContentById(input),

    onSuccess: async (data) => {
      queryClient.setQueryData<Article>(['portfolio-get-article-by-id', data._id], data);
      await SwalMessageTime('Content Updated', 1500);

      // toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}