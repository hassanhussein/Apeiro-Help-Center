import React, { useState, useEffect } from "react";
import { ChevronRight, Search, FileText, Clock, ArrowRight, MessageSquare, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CATEGORIES, ALL_ARTICLES, Article } from "../constants";

interface AllArticlesViewProps {
  onBack: () => void;
  onArticleClick: (id: string) => void;
  onSubmitTicket: () => void;
  initialMode?: 'faq' | 'kb';
}

export const AllArticlesView: React.FC<AllArticlesViewProps> = ({ 
  onBack, 
  onArticleClick,
  onSubmitTicket,
  initialMode = 'faq'
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | "all">("all");
  const [activeTab, setActiveTab] = useState<'faq' | 'kb'>(initialMode);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Sync activeTab with initialMode if it changes externally
  useEffect(() => {
    setActiveTab(initialMode);
    setExpandedId(null);
  }, [initialMode]);

  const filteredArticles = ALL_ARTICLES.filter(article => {
    const matchesTab = article.type === activeTab;
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Search Header */}
      <div className="mb-12 border-b border-slate-200 pb-12">
        <div className="flex items-center gap-4 text-slate-400 mb-8 font-bold text-[10px] uppercase tracking-widest">
          <button onClick={onBack} className="hover:text-blue-600 transition-colors">Home</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900">{activeTab === 'faq' ? "FAQ's" : "Knowledge Base"}</span>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors w-6 h-6" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab === 'faq' ? "FAQ's" : "knowledge base"}...`}
            className="w-full bg-transparent border-none py-4 pl-10 text-2xl font-bold placeholder:text-slate-200 outline-none focus:ring-0"
          />
        </div>
      </div>

      <div className="space-y-12">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-1">
          <button 
            onClick={() => setActiveTab('faq')}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-widest relative transition-all ${activeTab === 'faq' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            FAQ's
            {activeTab === 'faq' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
          </button>
          <button 
            onClick={() => setActiveTab('kb')}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-widest relative transition-all ${activeTab === 'kb' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Knowledge Base
            {activeTab === 'kb' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
          </button>
        </div>

        {/* Topic Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${selectedCategory === "all" ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/10' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400'}`}
          >
            All Topics
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${selectedCategory === cat.id ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/10' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400'}`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Articles List */}
        <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/40">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + searchQuery + selectedCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="divide-y divide-slate-100"
            >
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => {
                  const isExpanded = expandedId === article.id;
                  const isFaq = article.type === 'faq';

                  return (
                    <div key={article.id} className="transition-all">
                      <div
                        onClick={() => isFaq ? toggleExpand(article.id) : onArticleClick(article.id)}
                        className={`p-8 hover:bg-slate-50 transition-all cursor-pointer group flex items-center justify-between ${isExpanded ? 'bg-blue-50/30' : ''}`}
                      >
                        <div className="flex gap-6 items-center">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-white transition-all shadow-sm ${isExpanded ? 'bg-blue-600 text-white shadow-blue-200' : 'bg-slate-50 text-slate-400 group-hover:text-blue-500'}`}>
                            <BookOpen className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className={`font-bold transition-colors text-lg tracking-tight ${isExpanded ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'}`}>
                              {article.title}
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl line-clamp-1">
                              {article.description}
                            </p>
                            <div className="mt-3 flex items-center gap-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                              <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {article.readingTime}</span>
                              <span>&bull;</span>
                              <span>{CATEGORIES.find(c => c.id === article.category)?.title}</span>
                            </div>
                          </div>
                        </div>
                        {isFaq ? (
                          <ChevronRight className={`w-5 h-5 text-slate-200 transition-all ${isExpanded ? 'rotate-90 text-blue-500' : 'group-hover:text-blue-500 group-hover:translate-x-1'}`} />
                        ) : (
                          <ArrowRight className="w-5 h-5 text-slate-200 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                        )}
                      </div>
                      
                      <AnimatePresence>
                        {isFaq && isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-8 pb-8 pl-26">
                              <div className="bg-white rounded-3xl border border-blue-100 p-8 shadow-sm">
                                <div className="article-content text-slate-600 text-sm leading-relaxed" 
                                     dangerouslySetInnerHTML={{ __html: article.content || `<p>${article.description}</p>` }} 
                                />
                                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                  <span>Was this helpful?</span>
                                  <div className="flex gap-2">
                                    <button className="px-4 py-2 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors border border-transparent hover:border-slate-100">Yes</button>
                                    <button className="px-4 py-2 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors border border-transparent hover:border-slate-100">No</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              ) : (
                <div className="p-32 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-8 h-8 text-slate-200" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">No matches found</h3>
                  <p className="text-slate-400 mb-8">Try adjusting your search or filtering by a different topic.</p>
                  <button 
                    onClick={() => {setSearchQuery(""); setSelectedCategory("all");}}
                    className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
