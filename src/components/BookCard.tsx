"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Book } from "@/lib/types";
import { Star, Heart, BookOpen } from "lucide-react";
import { useState } from "react";

interface BookCardProps {
  book: Book;
  onRead?: () => void;
}

export default function BookCard({ book, onRead }: BookCardProps) {
  const router = useRouter();
  
  // Check localStorage for initial favorite state
  const [isFavorite, setIsFavorite] = useState(() => {
    if (typeof window !== 'undefined') {
      const favorites = localStorage.getItem('favoriteBooks');
      return favorites ? JSON.parse(favorites).includes(book.id) : false;
    }
    return false;
  });

  // Toggle favorite and update localStorage
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking favorite
    let favorites: string[] = [];
    if (typeof window !== 'undefined') {
      const storedFavorites = localStorage.getItem('favoriteBooks');
      favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    }

    if (isFavorite) {
      favorites = favorites.filter(id => id !== book.id);
    } else {
      favorites.push(book.id);
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('favoriteBooks', JSON.stringify(favorites));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('favoriteChanged'));
    }
    setIsFavorite(!isFavorite);
  };

  const handleRead = () => {
    router.push(`/read/${book.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl">
        <Image
          src={book.coverImage}
          alt={book.title}
          width={240}
          height={360}
          className="h-[300px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Top-right favorite button */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
            isFavorite
              ? "bg-red-500/90 text-white hover:bg-red-600"
              : "bg-black/50 text-white hover:bg-black/70"
          }`}
        >
          <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button
              onClick={handleRead}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <BookOpen size={16} />
              O'qish
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 dark:text-white">
          {book.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{book.author}</p>
        <div className="mt-1 flex items-center gap-1">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {book.rating}
          </span>
          <span className="text-xs text-gray-400">({book.reviews})</span>
        </div>
      </div>
    </motion.div>
  );
}
