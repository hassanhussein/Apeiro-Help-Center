import React, { useState } from "react";
import { ArrowLeft, ChevronRight, FileText, Clock, Search, BookOpen, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Category, Article, ALL_ARTICLES } from "../constants";

interface CategoryViewProps {
  category: Category;
  onBack: () => void;
  onArticleClick: (id: string) => void;
  categories: Category[];
  onCategoryClick: (id: string) => void;
  onSubmitTicket: () => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({ 
  category, 
  onBack, 
  onArticleClick,
  categories,
  onCategoryClick,
  onSubmitTicket 
}) => {
  const [localQuery, setLocalQuery] = useState("");
  const articles = ALL_ARTICLES.filter(a => a.category === category.id);
  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(localQuery.toLowerCase()) || 
    a.description.toLowerCase().includes(localQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-12">
        <button onClick={onBack} className="hover:text-blue-600 transition-colors">Home</button>
        <ChevronRight className="w-3 h-3 text-slate-300" />
        <span className="text-slate-900">{category.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
        {/* Category Header & Articles */}
        <div>
          <div className="mb-16">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              {category.title}
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mb-10">
              {category.description}
            </p>

            <div className="relative max-w-md group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
              <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder={`Search in ${category.title}...`}
                className="w-full h-14 pl-14 pr-6 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {filteredArticles.length} {localQuery ? "Results Found" : "Articles in this topic"}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article, idx) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    onClick={() => onArticleClick(article.id)}
                    className="group bg-white p-6 rounded-3xl border border-transparent hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/40 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                        <BookOpen className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-4">
                          <p className="text-xs text-slate-400 line-clamp-1">{article.description}</p>
                          <span className="w-1 h-1 rounded-full bg-slate-200 shrink-0" />
                          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest shrink-0">{article.readingTime}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </motion.div>
                ))
              ) : (
                <div className="py-20 text-center">
                  <p className="text-slate-400 italic">No articles matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-12">
          <div className="p-10 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all" />
            <h3 className="font-display text-2xl font-bold mb-4 relative z-10 leading-tight">Still need help?</h3>
            <p className="text-slate-400 text-sm mb-10 relative z-10 leading-relaxed">
              Our support team is available 24/7 to help with any platform issues.
            </p>
            <div className="space-y-3 relative z-10">
              <button 
                onClick={onSubmitTicket}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
              >
                Submit a Ticket
              </button>
              <button 
                onClick={onBack}
                className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all"
              >
                Return Home
              </button>
            </div>
          </div>

          <div className="p-8 bg-blue-50/30 rounded-[2.5rem] border border-blue-100/50">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-6">Explore Topics</h4>
            <div className="space-y-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => onCategoryClick(cat.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all text-xs font-bold ${cat.id === category.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'hover:bg-white text-slate-500 hover:text-blue-600 hover:shadow-sm'}`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
