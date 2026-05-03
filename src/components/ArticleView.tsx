import React, { useState } from "react";
import { ArrowLeft, ChevronRight, ThumbsUp, ThumbsDown, MessageSquare, Send, Clock, BookOpen, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Article, CATEGORIES } from "../constants";

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  onSubmitTicket: () => void;
  relatedArticles: Article[];
}

export const ArticleView: React.FC<ArticleViewProps> = ({ 
  article, 
  onBack, 
  onSubmitTicket,
  relatedArticles 
}) => {
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const category = CATEGORIES.find(c => c.id === article.category);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <button onClick={onBack} className="hover:text-blue-600 transition-colors">Home</button>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span>{category?.title || "Topic"}</span>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-900 line-clamp-1 max-w-[200px]">{article.title}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 items-start">
        {/* Main Content */}
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-6 mb-10 pb-10 border-b border-slate-100">
              <div className="flex-grow">
                <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight tracking-tight">
                  {article.title}
                </h1>
                <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Updated 3 days ago
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-200" />
                  <span>{article.readingTime}</span>
                </div>
              </div>
            </div>

            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content || `<p>${article.description}</p><p>Technical documentation and full guide content is being populated. Please check back shortly for the complete documentation.</p>` }}
            />

            {/* Feedback Block */}
            <div className="mt-24 pt-12 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-8 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20">
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Was this helpful?</h3>
                  <p className="text-sm text-slate-400">Your feedback helps us improve.</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setFeedback('yes')}
                    className={`flex items-center justify-center w-14 h-14 rounded-2xl transition-all ${feedback === 'yes' ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'bg-slate-50 text-slate-400 hover:bg-green-50 hover:text-green-600 border border-transparent hover:border-green-100'}`}
                  >
                    <ThumbsUp className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => setFeedback('no')}
                    className={`flex items-center justify-center w-14 h-14 rounded-2xl transition-all ${feedback === 'no' ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-100'}`}
                  >
                    <ThumbsDown className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {feedback === 'no' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 text-center p-12 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <h3 className="font-display text-2xl font-bold mb-3 relative z-10">Still need help?</h3>
                    <p className="text-slate-400 text-sm mb-10 relative z-10 mx-auto max-w-sm">
                      Our product experts can help you resolve unique challenges or platform issues.
                    </p>
                    <button 
                      onClick={onSubmitTicket}
                      className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-500 transition-all flex items-center gap-3 mx-auto shadow-xl shadow-blue-600/20 relative z-10 transform active:scale-95"
                    >
                      <MessageSquare className="w-5 h-5" />
                      Create a Support Ticket
                    </button>
                  </motion.div>
                )}
                {feedback === 'yes' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-center"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full text-xs font-bold">
                      <CheckCircle className="w-4 h-4" />
                      Thanks for your feedback!
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <aside className="sticky top-24 space-y-12">
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 mb-6">Related Content</h4>
            <div className="space-y-4">
              {relatedArticles.map((rel) => (
                <button 
                  key={rel.id}
                  className="flex text-left font-bold text-slate-600 hover:text-blue-600 transition-colors text-xs leading-relaxed group"
                >
                  <ChevronRight className="w-3.5 h-3.5 mt-0.5 mr-2 text-slate-300 group-hover:text-blue-500 transition-colors shrink-0" />
                  {rel.title}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 bg-indigo-50/50 border border-indigo-100/50 rounded-[2rem]">
            <h4 className="font-bold text-slate-900 mb-2">Can't find it?</h4>
            <p className="text-[10px] text-slate-500 mb-6 leading-relaxed">
              Browse our full catalog of topics or contact our specialist directly.
            </p>
            <button 
              onClick={onBack}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-indigo-200 rounded-xl text-[10px] font-bold text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm"
            >
              Browse All Topics
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
