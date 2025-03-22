export interface Author {
  _id: string;
  name: string;
  image: string;
  bio?: string;
}

export interface Startup {
  _id: string;
  _createdAt: string;
  title: string;
  description: string;
  image: string;
  views: number;
  category: string;
  content: any;
  author: Author;
}
