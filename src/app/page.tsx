"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import BookCard from "@/components/BookCard";
import { MOCK_BOOKS, CATEGORIES } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Star, BookOpen } from "lucide-react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();

  const featuredBooks = MOCK_BOOKS.filter((book) => book.isFeatured);
  const trendingBooks = MOCK_BOOKS.filter((book) => book.isTrending);
  const filteredBooks = selectedCategory
    ? MOCK_BOOKS.filter((book) => book.category === selectedCategory)
    : MOCK_BOOKS;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="pt-24 pb-16">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 p-8 md:p-12">
            <div className="relative z-10 max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              >
                Keyingi ajoyib
                <br />
                kitobingiz shu yerd
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-blue-100 mb-8"
              >
                BookVerse bilan minglab kitoblarni kashf eting, onlayn o'qing va shaxsiy kutubxonangizni yarating
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                onClick={() => router.push("/explore")}
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Kutubxonani ko'rish
                <ArrowRight size={20} />
              </motion.button>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block">
              <div className="absolute right-10 top-10 h-80 w-60 rounded-2xl bg-white/10 backdrop-blur-sm rotate-6 shadow-2xl" />
              <div className="absolute right-20 top-20 h-80 w-60 rounded-2xl bg-white/10 backdrop-blur-sm -rotate-3 shadow-2xl" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Trenddagi kitoblar
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {trendingBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BookCard book={book} />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Bo'limlar
          </h2>
          <div className="grid grid-cols-5 sm:grid-cols-11 gap-2">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0 }}
              onClick={() => setSelectedCategory(null)}
              className={`flex flex-col items-center gap-1 rounded-xl p-3 transition-all ${
                selectedCategory === null
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md"
              }`}
            >
              <span className="text-2xl">📚</span>
              <span className="text-xs font-medium">Hammasi</span>
            </motion.button>
            {CATEGORIES.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: (index + 1) * 0.05 }}
                onClick={() => {
                  setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  );
                }}
                className={`flex flex-col items-center gap-1 rounded-xl p-3 transition-all ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md"
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-xs font-medium">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </section>

        {selectedCategory ? (
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
            </h2>
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {filteredBooks.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <BookCard book={book} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">📖</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Bu bo'limda hali kitob yo'q
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Tez orada yangi qo'shilishlarini kuting!
                </p>
              </div>
            )}
          </section>
        ) : (
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Tanlangan kitoblar
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {featuredBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="h-10 w-10 text-blue-600" />,
                title: "Istagan joyingizda o'qing",
                description:
                  "Kutubxonangizga istalgan qurilmadan, istalgan vaqtda kirish. O'qish jarayoniz avtomatik ravishda sinxronlanadi.",
              },
              {
                icon: <Star className="h-10 w-10 text-purple-600" />,
                title: "Shaxsiy tavsiyalar",
                description:
                  "Aqlli tavsiya tizimi bilan ta'mmopingizga mos keladigan kitoblarni kashf eting.",
              },
              {
                icon: <TrendingUp className="h-10 w-10 text-orange-600" />,
                title: "O'qish maqsadlari",
                description:
                  "O'qish maqsadlarini belgilang, taraqqiyotingizni kuzating va yutuq belgilari oling.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  BookVerse
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Adabiyot dunyosiga eshiklaringiz. BookVerse bilan o'qing, kashf eting va rivojlaning.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Izlash</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Kitoblarni ko'rish</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Bo'limlar</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Yangi chiqishlar</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Sotuvdagi kitoblar</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Kompaniya</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Biz haqimizda</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Ish o'rinlari</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Aloqa</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Maxfiylik siyosati</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Bog'lanish</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 BookVerse. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
