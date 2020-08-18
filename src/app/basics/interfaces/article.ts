import {ArticlePage} from './article-page';

export interface Article {
  id: number;
  name: string;
  url: string;
  article_pages: ArticlePage[];
}
