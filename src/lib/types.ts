export interface Book {
  id: string;
  title: string;
  author: string;
  authorId: string;
  description: string;
  coverImage: string;
  category: string;
  rating: number;
  reviews: number;
  pages: number;
  publishYear: number;
  isFeatured: boolean;
  isTrending: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  books: number;
}

export interface Review {
  id: string;
  userId: string;
  bookId: string;
  rating: number;
  comment: string;
  date: Date;
  user: {
    name: string;
    avatar: string;
  };
}
