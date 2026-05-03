/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CATEGORIES, POPULAR_ARTICLES, ALL_ARTICLES } from "./constants";
import { 
  Header, 
  Hero, 
  CategoryGrid, 
  PopularArticles, 
  Footer 
 } from "./components/MainComponents";
import { SupportWidget } from "./components/SupportWidget";
import { ArticleView } from "./components/ArticleView";
import { CategoryView } from "./components/CategoryView";
import { AllArticlesView } from "./components/AllArticlesView";
import { useState, useEffect } from "react";

export default function App() {
  const [view, setView] = useState<'home' | 'category' | 'article' | 'all-articles'>('home');
  const [articleListMode, setArticleListMode] = useState<'faq' | 'kb'>('faq');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [ticketTrigger, setTicketTrigger] = useState(0);

  const selectedArticle = ALL_ARTICLES.find(a => a.id === selectedArticleId);
  const selectedCategory = CATEGORIES.find(c => c.id === selectedCategoryId);
  const relatedArticles = ALL_ARTICLES.filter(a => a.id !== selectedArticleId).slice(0, 3);

  const handleArticleClick = (id: string) => {
    setSelectedArticleId(id);
    setView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (id: string) => {
    setSelectedCategoryId(id);
    setView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    setView('home');
    setSelectedArticleId(null);
    setSelectedCategoryId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFAQsClick = () => {
    setArticleListMode('faq');
    setView('all-articles');
    setSelectedArticleId(null);
    setSelectedCategoryId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKBClick = () => {
    setArticleListMode('kb');
    setView('all-articles');
    setSelectedArticleId(null);
    setSelectedCategoryId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-blue-100 selection:text-slate-900 overflow-x-hidden relative text-slate-900">
      {/* Decorative Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[120px]" />
      </div>

      <Header 
        onLogoClick={handleHomeClick} 
        onFAQsClick={handleFAQsClick} 
        onKBClick={handleKBClick}
      />
      
      <main className="flex-grow relative z-10 pt-16">
        {view === 'home' && (
          <>
            <Hero product="Apeiro" onArticleClick={handleArticleClick} />
            <CategoryGrid categories={CATEGORIES} onCategoryClick={handleCategoryClick} />
            <PopularArticles 
              articles={POPULAR_ARTICLES} 
              onSubmitTicket={() => setTicketTrigger(prev => prev + 1)} 
              onArticleClick={handleArticleClick}
              onAllArticlesClick={handleFAQsClick}
            />
          </>
        )}

        {view === 'category' && selectedCategory && (
          <CategoryView 
            category={selectedCategory}
            onBack={handleHomeClick}
            onArticleClick={handleArticleClick}
            categories={CATEGORIES}
            onCategoryClick={handleCategoryClick}
            onSubmitTicket={() => setTicketTrigger(prev => prev + 1)}
          />
        )}

        {view === 'all-articles' && (
          <AllArticlesView 
            onBack={handleHomeClick}
            onArticleClick={handleArticleClick}
            onSubmitTicket={() => setTicketTrigger(prev => prev + 1)}
            initialMode={articleListMode}
          />
        )}

        {view === 'article' && selectedArticle && (
          <ArticleView 
            article={selectedArticle}
            onBack={handleHomeClick}
            onSubmitTicket={() => setTicketTrigger(prev => prev + 1)}
            relatedArticles={relatedArticles}
          />
        )}
      </main>

      <Footer />
      
      <SupportWidget 
        productName="Apeiro"
        onViewHelpCenter={handleHomeClick}
        onArticleClick={handleArticleClick}
        onPortalClick={() => {}}
        popularArticles={POPULAR_ARTICLES}
        externalTicketTrigger={ticketTrigger}
      />
    </div>
  );
}
