import React, { useState } from "react";
import { Search, ChevronRight, Rocket, CreditCard, Activity, UserCircle, LifeBuoy, Globe, Terminal, MessageSquare, Layout, FileText, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CATEGORIES, Category, Article, ALL_ARTICLES } from "../constants";
import * as LucideIcons from "lucide-react";

// Header Component
export const Header = ({ onLogoClick, onFAQsClick, onKBClick, onPortalClick }: { 
  onLogoClick?: () => void,
  onFAQsClick?: () => void,
  onKBClick?: () => void,
  onPortalClick?: () => void
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-header">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onLogoClick}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <Layout className="text-white w-4 h-4" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-slate-800">Apeiro.support</span>
        </div>
        
        <nav className="flex items-center gap-6">
          <button 
            onClick={onFAQsClick}
            className="text-[10px] font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest"
          >
            FAQ'S
          </button>
          <button 
            onClick={onKBClick}
            className="text-[10px] font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest"
          >
            Knowledge Base
          </button>
        </nav>
      </div>
    </header>
  );
};

// Hero Component
export const Hero = ({ product, onArticleClick }: { 
  product: string,
  onArticleClick?: (id: string) => void 
}) => {
  const [query, setQuery] = useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Filter articles based on query
  const searchResults = query.length > 1 
    ? ALL_ARTICLES.filter(a => 
        a.title.toLowerCase().includes(query.toLowerCase()) || 
        a.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  // Keyboard shortcut handler
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.2em] uppercase text-blue-600 bg-blue-50/50 rounded-full border border-blue-100 ring-4 ring-blue-500/5">
          {product} Help Center
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 drop-shadow-sm">
          How can we help you?
        </h1>
        <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          Search the knowledge base or get support from our team
        </p>

        <div className="max-w-2xl mx-auto relative group">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, guides, or issues..."
              className="w-full px-8 py-5 md:py-6 bg-white border border-slate-200 rounded-[2rem] shadow-xl shadow-slate-200/40 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-slate-600 text-lg transition-all pr-32"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-400">
                <span className="text-xs font-mono">CMD</span> K
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                <Search className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Search Result Dropdown */}
          <AnimatePresence>
            {query.length > 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 5 }}
                className="absolute left-0 right-0 top-full mt-4 bg-white border border-slate-200 rounded-[2rem] shadow-2xl shadow-slate-900/10 z-20 overflow-hidden"
              >
                {searchResults.length > 0 ? (
                  <div className="p-4">
                    <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-2">
                      Articles Found
                    </div>
                    {searchResults.map((article) => (
                      <button
                        key={article.id}
                        onClick={() => {
                          onArticleClick?.(article.id);
                          setQuery("");
                        }}
                        className="w-full text-left p-4 hover:bg-blue-50 rounded-2xl transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-50 group-hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors">
                            <FileText className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 leading-none mb-1">{article.title}</div>
                            <div className="text-xs text-slate-500 line-clamp-1">{article.description}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-slate-200" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">No results found</h3>
                    <p className="text-sm text-slate-500 mb-6">We couldn't find any articles matching your search.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Suggestion Chips */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Suggestions:</span>
          {[
            { label: "Track shipment", id: "11" },
            { label: "Billing issue", id: "12" },
            { label: "Login problem", id: "19" },
            { label: "API Access", id: "13" }
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => onArticleClick?.(chip.id)}
              className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-slate-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 rounded-full text-xs font-medium text-slate-500 transition-all shadow-sm active:scale-95"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// Category Card Component
export const CategoryGrid = ({ categories, onCategoryClick }: { 
  categories: Category[], 
  onCategoryClick?: (id: string) => void 
}) => {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => {
          const IconComponent = (LucideIcons as any)[cat.icon] || LifeBuoy;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              onClick={() => onCategoryClick?.(cat.id)}
              className="glass-card p-8 rounded-[2rem] border border-slate-200/50 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer group flex flex-col h-full transition-all"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm group-hover:bg-blue-50 group-hover:ring-1 group-hover:ring-blue-100">
                <IconComponent className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{cat.title}</h3>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed line-clamp-2 flex-grow">
                {cat.description}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <FileText className="w-3 h-3" />
                    {cat.articleCount} articles
                  </span>
                  <span className="text-[9px] font-medium text-slate-300 mt-0.5">Updated {cat.updatedAt}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

// Popular Articles Component
export const PopularArticles = ({ articles, onSubmitTicket, onArticleClick, onAllArticlesClick }: { 
  articles: Article[], 
  onSubmitTicket?: () => void,
  onArticleClick?: (id: string) => void,
  onAllArticlesClick?: () => void
}) => {
  return (
    <section className="pb-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h2 className="font-display text-2xl font-bold text-slate-900">Popular Articles</h2>
          <button 
            onClick={onAllArticlesClick}
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            View all
          </button>
        </div>
        
        <div className="space-y-3">
          {articles.map((article, idx) => {
            const category = CATEGORIES.find(c => c.id === article.category);
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * idx }}
                onClick={() => onArticleClick?.(article.id)}
                className="group flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 transition-all cursor-pointer"
              >
                <div className="flex flex-col gap-1 mb-2 md:mb-0">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md ring-1 ring-blue-100">
                      {category?.title || "Update"}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 flex items-center gap-1.5 line-clamp-1">
                      <Clock className="w-3 h-3" />
                      {article.readingTime}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {article.title}
                  </h4>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <aside className="space-y-8 self-start">
        <div className="p-10 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all" />
          <h3 className="font-display text-2xl font-bold mb-4 leading-tight">Still need help?</h3>
          <p className="text-slate-400 text-sm mb-10 leading-relaxed">
            Can't find what you're looking for? Our support specialists are available 24/7.
          </p>
          <div className="space-y-3">
            <button 
              onClick={onSubmitTicket}
              className="w-full flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold shadow-lg shadow-blue-600/20 transition-all transform active:scale-95 px-6"
            >
              <MessageSquare className="w-5 h-5 flex-shrink-0" />
              Open Support Widget
            </button>
            <button 
              onClick={onAllArticlesClick}
              className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all"
            >
              Browse all topics
            </button>
          </div>
        </div>
      </aside>
    </section>
  );
};

// Footer Component
export const Footer = () => {
  return (
    <footer className="py-20 border-t border-slate-200/60 mt-20 bg-slate-50/50 backdrop-blur-sm px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-2 grayscale group hover:grayscale-0 transition-all">
            <div className="w-8 h-8 bg-slate-900 group-hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
              <Layout className="text-white w-4 h-4" />
            </div>
            <span className="font-display font-bold text-slate-900 tracking-tight text-lg">Apeiro.support</span>
          </div>
          <p className="text-sm text-slate-400 font-medium">Empowering developers with real-time logistics data.</p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-6 text-sm">
          <div className="text-slate-400 text-xs font-medium">
            © {new Date().getFullYear()} Apeiro.digital
          </div>
        </div>
      </div>
    </footer>
  );
};
