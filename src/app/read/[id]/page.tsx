"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sun,
  Moon,
  Coffee,
  Type,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  Highlighter,
  StickyNote,
  Menu,
  X,
} from "lucide-react";
import { MOCK_BOOKS } from "@/lib/mock-data";

type Theme = "light" | "dark" | "sepia";

export default function BookReader() {
  const params = useParams();
  const router = useRouter();
  const bookId = params.id as string;
  const book = MOCK_BOOKS.find((b) => b.id === bookId);

  const [theme, setTheme] = useState<Theme>("light");
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.8);
  const [showControls, setShowControls] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Book not found
          </h1>
          <button
            onClick={() => router.push("/")}
            className="mt-4 text-blue-600 hover:underline"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

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
              <span className={`font-medium ${currentStyle.text}`}>Back</span>
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
            <h3 className={`text-lg font-semibold ${currentStyle.text}`}>Table of Contents</h3>
            <button
              onClick={() => setShowSidebar(false)}
              className="md:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
            >
              <X className={`h-5 w-5 ${currentStyle.text}`} />
            </button>
          </div>
          <nav className="space-y-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((chapter) => (
              <button
                key={chapter}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  chapter === 1
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                } ${currentStyle.text}`}
              >
                Chapter {chapter}
              </button>
            ))}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${currentStyle.text}`}
          >
            <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
            <p className="text-lg opacity-75 mb-12">by {book.author}</p>

            <article
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: lineHeight,
              }}
              className="font-serif"
            >
              <p className="mb-6">
                {book.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="mb-6">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="mb-6">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              <p className="mb-6">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
              </p>
              <h2 className="text-2xl font-bold mt-12 mb-6">Chapter One</h2>
              <p className="mb-6">
                It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him.
              </p>
              <p className="mb-6">
                The hallway smelt of boiled cabbage and old rag mats. At one end of it a coloured poster, too large for indoor display, had been tacked to the wall. It depicted simply an enormous face, more than a metre wide: the face of a man of about forty-five, with a heavy black moustache and ruggedly handsome features.
              </p>
            </article>
          </motion.div>
        </div>
      </main>

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
                onClick={() => setFontSize(Math.max(14, fontSize - 1))}
                className={`p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${currentStyle.text}`}
              >
                <Minus className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2 px-3">
                <Type className={`h-5 w-5 ${currentStyle.text}`} />
                <span className={`font-medium ${currentStyle.text}`}>{fontSize}px</span>
              </div>
              <button
                onClick={() => setFontSize(Math.min(28, fontSize + 1))}
                className={`p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${currentStyle.text}`}
              >
                <Plus className="h-5 w-5" />
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
            <div className="flex items-center gap-2">
              <button
                className={`p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${currentStyle.text}`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className={`font-medium ${currentStyle.text}`}>1 / {book.pages}</span>
              <button
                className={`p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${currentStyle.text}`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
