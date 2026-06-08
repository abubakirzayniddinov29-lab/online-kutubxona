'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import BookCard from '@/components/BookCard';
import { MOCK_BOOKS } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Clock, TrendingUp } from 'lucide-react';

type Tab = 'reading' | 'favorites' | 'recent' | 'wishlist';

export default function MyBooksPage() {
  const [activeTab, setActiveTab] = useState<Tab>('reading');

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'reading', label: "O'qishni davom ettirish", icon: <BookOpen className="w-5 h-5" /> },
    { id: 'favorites', label: 'Sevimlilar', icon: <Heart className="w-5 h-5" /> },
    { id: 'recent', label: "Yaqinda ko'rilgan", icon: <Clock className="w-5 h-5" /> },
    { id: 'wishlist', label: "Istaklar ro'yxati", icon: <TrendingUp className="w-5 h-5" /> },
  ];

  const displayBooks = MOCK_BOOKS.slice(0, 6);

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
            Mening kitoblarim
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            O'qish sayohatingizni kuzating va kutubxonangizni boshqaring
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          {displayBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {displayBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Bu ro'yxatda hali kitob yo'q
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Kuzatishni boshlang va kutubxonangizga kitob qo'shing
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
