"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sun,
  Moon,
  Coffee,
  ChevronLeft,
  ChevronRight,
  Highlighter,
  StickyNote,
  Menu,
  X,
} from "lucide-react";
import { MOCK_BOOKS } from "@/lib/mock-data";

type Theme = "light" | "dark" | "sepia";

// Generate sample pages content
const generatePages = (pageCount: number, title: string, author: string) => {
  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push({
      pageNumber: i,
      content: `
        <h2 class="text-2xl font-bold mt-12 mb-6">${i === 1 ? "Birinchi bob" : `${Math.ceil(i / 10)}-bob`}</h2>
        <p class="mb-6">
          ${title} kitobining ${i}-beti. Muallif: ${author}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p class="mb-6">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p class="mb-6">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
        <p class="mb-6">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
        </p>
        ${i % 3 === 0 ? `
          <p class="mb-6">
            Aprel oyining yorqin sovuq kuni edi va soatlar o'n uchta uriyapti. Vinston Smit yomon shamoldan qochish uchun jag'ini ko'kragiga siqib, Yutuq uyalarining shisha eshiklaridan tez o'tdi, ammo uning yoniga dumaloq chang kiritishini oldini olmadi.
          </p>
          <p class="mb-6">
            Koridor qaynatilgan karam va eski g'ildiraklar yostiqlarining xushbo'y hidini chiqardi. Uning bir chetida ichki namoyish uchun juda katta bo'lgan rangli poster devorga yopishtirilgan edi. U erda juda katta yuz tasvirlangan edi: bir metr kenglikda, taxminan qirq besh yoshli, qalin qora mo'ylovi va chidamli chiroyli xususiyatlari odam.
          </p>
        ` : ""}
      `,
    });
  }
  return pages;
};

export default function BookReader() {
  const params = useParams();
  const router = useRouter();
  const bookId = params.id as string;
  const book = MOCK_BOOKS.find((b) => b.id === bookId);

  const [theme, setTheme] = useState<Theme>("light");
  const [showControls, setShowControls] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Kitob topilmadi
          </h1>
          <button
            onClick={() => router.push("/")}
            className="mt-4 text-blue-600 hover:underline"
          >
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    );
  }

  const pages = generatePages(Math.min(book.pages, 100), book.title, book.author);
  const currentPageData = pages[currentPage - 1];

  const themeStyles = {
    light: {
      bg: "bg-white",
      text: "text-gray-900",
    },
    dark: {
      bg: "bg-gray-900",
      text: "text-gray-100",
    },
    sepia: {
      bg: "bg-amber-50",
      text: "text-amber-900",
    },
  };

  const currentStyle = themeStyles[theme];

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const goToNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className={`min-h-screen ${currentStyle.bg} transition-colors duration-300`}>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : -20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          theme === "dark" ? "glassmorphism bg-gray-900/80" : "glassmorphism"
        }`}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className={`h-5 w-5 ${currentStyle.text}`} />
              <span className={`font-medium ${currentStyle.text}`}>Orqaga</span>
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <Menu className={`h-5 w-5 ${currentStyle.text}`} />
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTheme("light")}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === "light" ? "bg-blue-100 text-blue-600" : "hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  <Sun className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setTheme("sepia")}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === "sepia" ? "bg-amber-100 text-amber-600" : "hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  <Coffee className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === "dark" ? "bg-gray-700 text-white" : "hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  <Moon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <aside
        className={`fixed left-0 top-16 bottom-0 w-72 z-40 transition-transform duration-300 ${
          theme === "dark" ? "bg-gray-800 border-r border-gray-700" : "bg-white border-r border-gray-200"
        } ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${currentStyle.text}`}>Mundarija</h3>
            <button
              onClick={() => setShowSidebar(false)}
              className="md:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
            >
              <X className={`h-5 w-5 ${currentStyle.text}`} />
            </button>
          </div>
          <nav className="space-y-2">
            {Array.from({ length: Math.min(Math.ceil(pages.length / 10), 10) }).map((_, index) => {
              const chapter = index + 1;
              const startPage = (chapter - 1) * 10 + 1;
              return (
                <button
                  key={chapter}
                  onClick={() => {
                    setCurrentPage(startPage);
                    setShowSidebar(false);
                    window.scrollTo(0, 0);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    currentPage >= startPage && currentPage < startPage + 10
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  } ${currentStyle.text}`}
                >
                  {chapter}-bob
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      <main
        className={`pt-24 pb-24 transition-all duration-300 ${
          showSidebar ? "md:ml-72" : ""
        }`}
        onClick={() => setShowControls(!showControls)}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className={`${currentStyle.text}`}
          >
            {currentPage === 1 && (
              <>
                <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
                <p className="text-lg opacity-75 mb-12">Muallif: {book.author}</p>
                <p className="mb-12">{book.description}</p>
              </>
            )}

            <article
              style={{
                fontSize: "18px",
                lineHeight: 1.8,
              }}
              className="font-serif"
              dangerouslySetInnerHTML={{ __html: currentPageData.content }}
            />
          </motion.div>
        </div>
      </main>

      {/* Left page turn area */}
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`fixed left-0 top-16 bottom-0 w-1/4 flex items-center justify-center transition-all duration-200 ${
          currentPage === 1 ? "opacity-0 cursor-not-allowed" : "opacity-0 hover:opacity-100"
        }`}
      >
        <div className={`p-4 rounded-full ${currentStyle.bg} shadow-lg`}>
          <ChevronLeft className={`h-8 w-8 ${currentStyle.text}`} />
        </div>
      </button>

      {/* Right page turn area */}
      <button
        onClick={goToNextPage}
        disabled={currentPage === pages.length}
        className={`fixed right-0 top-16 bottom-0 w-1/4 flex items-center justify-center transition-all duration-200 ${
          currentPage === pages.length ? "opacity-0 cursor-not-allowed" : "opacity-0 hover:opacity-100"
        }`}
      >
        <div className={`p-4 rounded-full ${currentStyle.bg} shadow-lg`}>
          <ChevronRight className={`h-8 w-8 ${currentStyle.text}`} />
        </div>
      </button>

      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
          theme === "dark" ? "glassmorphism bg-gray-900/80" : "glassmorphism"
        }`}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${currentStyle.text} ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className={`font-medium ${currentStyle.text}`}>
                {currentPage} / {pages.length}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === pages.length}
                className={`p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${currentStyle.text} ${
                  currentPage === pages.length ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button
                className={`p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${currentStyle.text}`}
              >
                <Highlighter className="h-5 w-5" />
              </button>
              <button
                className={`p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${currentStyle.text}`}
              >
                <StickyNote className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
