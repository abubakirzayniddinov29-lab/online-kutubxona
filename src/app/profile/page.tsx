'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BookCard from '@/components/BookCard';
import { MOCK_BOOKS } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { User, Book, Heart, Clock, TrendingUp, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // Load favorites
  const loadFavorites = () => {
    if (typeof window !== 'undefined') {
      const storedFavorites = localStorage.getItem('favoriteBooks');
      setFavoriteIds(storedFavorites ? JSON.parse(storedFavorites) : []);
    }
  };

  useEffect(() => {
    loadFavorites();
    window.addEventListener('favoriteChanged', loadFavorites);
    return () => window.removeEventListener('favoriteChanged', loadFavorites);
  }, []);

  const favoriteBooks = MOCK_BOOKS.filter(book => favoriteIds.includes(book.id));
  const totalBooks = MOCK_BOOKS.length;
  const totalPages = MOCK_BOOKS.reduce((sum, book) => sum + book.pages, 0);

  const stats = [
    { 
      id: 'books', 
      value: favoriteBooks.length, 
      label: 'Sevimli kitoblar', 
      icon: <Book className="w-6 h-6" /> 
    },
    { 
      id: 'total', 
      value: totalBooks, 
      label: 'Jami kitoblar', 
      icon: <TrendingUp className="w-6 h-6" /> 
    },
    { 
      id: 'pages', 
      value: totalPages.toLocaleString(), 
      label: 'Jami sahifalar', 
      icon: <Clock className="w-6 h-6" /> 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Profil
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            O'qish aktivligingizni ko'ring va hisobingizni boshqaring
          </p>
        </motion.div>

        {/* Profile Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              U
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Foydalanuvchi
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Kitoblarni yoqtiradigan va o'qishni sevadigan inson
              </p>
              <div className="flex gap-3 justify-center sm:justify-start">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <User className="w-5 h-5" />
                  Tahrirlash
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <LogOut className="w-5 h-5" />
                  Chiqish
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Recent Favorites Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Sevimli kitoblar
            </h3>
            {favoriteBooks.length > 3 && (
              <a href="/my-books" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                Barchasini ko'rish →
              </a>
            )}
          </div>
          
          {favoriteBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {favoriteBooks.slice(0, 5).map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-200 dark:border-gray-700">
              <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Hali sevimli kitoblar yo'q
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Sevimli kitoblaringizni qo'shish uchun yurakcha tugmasini bosing
              </p>
              <a
                href="/explore"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Kitoblarni o'rganing
              </a>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
