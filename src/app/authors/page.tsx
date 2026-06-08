'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import BookCard from '@/components/BookCard';
import { MOCK_AUTHORS, MOCK_BOOKS } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export default function AuthorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);

  const filteredAuthors = MOCK_AUTHORS.filter(author =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const authorBooks = selectedAuthor
    ? MOCK_BOOKS.filter(book => book.authorId === selectedAuthor)
    : [];

  const selectedAuthorData = selectedAuthor
    ? MOCK_AUTHORS.find(author => author.id === selectedAuthor)
    : null;

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
            Mualliflar
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sevimli mualliflaringizni kashf eting va ularni kuzating
          </p>
        </motion.div>

        {!selectedAuthor ? (
          <>
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Mualliflarni qidiring..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAuthors.map((author, index) => (
                <motion.button
                  key={author.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setSelectedAuthor(author.id)}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-left hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {author.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {author.books} {author.books === 1 ? 'kitob' : 'kitob'} nashr etilgan
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                        {author.bio}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </>
        ) : (
          <div>
            <button
              onClick={() => setSelectedAuthor(null)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6"
            >
              ← Mualliflarga qaytish
            </button>
            {selectedAuthorData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <img
                    src={selectedAuthorData.avatar}
                    alt={selectedAuthorData.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedAuthorData.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {selectedAuthorData.books} {selectedAuthorData.books === 1 ? 'kitob' : 'kitob'} nashr etilgan
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 max-w-2xl">
                      {selectedAuthorData.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {selectedAuthorData?.name} ning kitoblari
              </h3>
              {authorBooks.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {authorBooks.map((book, index) => (
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
                    Kitob topilmadi
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Bu muallif hali hech qanday kitob nashr etmagan
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
