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
  const [isFavorite, setIsFavorite] = useState(false);

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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button
              onClick={handleRead}
              className="mb-2 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <BookOpen size={16} />
              Read Now
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all ${
                isFavorite
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-white/20 hover:bg-white/30"
              }`}
            >
              <Heart
                size={16}
                fill={isFavorite ? "currentColor" : "none"}
              />
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
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
