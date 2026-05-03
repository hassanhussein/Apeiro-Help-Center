import React, { useState, useRef, useEffect } from "react";
import { 
  Search, 
  X, 
  HelpCircle, 
  ChevronRight, 
  FileText, 
  ExternalLink, 
  Send, 
  ArrowRight, 
  Sparkles, 
  History, 
  MessageSquare,
  ArrowLeft,
  CheckCircle,
  Paperclip,
  Loader2,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SupportWidgetProps {
  productName?: string;
  onViewHelpCenter: () => void;
  onArticleClick: (id: string) => void;
  onPortalClick: () => void;
  popularArticles: any[];
  externalTicketTrigger?: number; // Counter to trigger open
}

type WidgetView = 'home' | 'search' | 'ticket' | 'success' | 'chat';

export const SupportWidget: React.FC<SupportWidgetProps> = ({ 
  productName = "Apeiro", 
  onViewHelpCenter, 
  onArticleClick,
  onPortalClick,
  popularArticles,
  externalTicketTrigger = 0
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<WidgetView>('home');
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string, action?: 'ticket' }[]>([
    { role: 'assistant', content: "Hi! I'm the Apeiro AI assistant. I can help search our resources or help you open a ticket. What's on your mind?", action: 'ticket' }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Trigger from outside
  useEffect(() => {
    if (externalTicketTrigger > 0) {
      setIsOpen(true);
      setView('ticket');
    }
  }, [externalTicketTrigger]);
  const [ticketForm, setTicketForm] = useState({
    email: "design@apeiro.digital",
    subject: "",
    category: "",
    description: ""
  });
  
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle Search Result Logic
  const filteredArticles = popularArticles
    .filter(a => 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 3);

  const bestMatch = filteredArticles[0];

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatInput("");
    setIsTyping(true);

    // Simulate AI response based on keywords
    setTimeout(() => {
      let response = "I'm sorry, I don't have specific information on that topic in my current resources. Would you like to check our full Knowledge Base or open a support ticket for more help?";
      let action: 'ticket' | undefined = 'ticket';
      
      const input = userMsg.toLowerCase();
      
      // Extensive keyword matching
      if (input.includes("api") || input.includes("connect") || input.includes("developer")) {
        response = "The Apeiro API uses standard RESTful patterns and JSON. You can find your Bearer token in 'Developer Settings' to authenticate your requests. We support endpoints for shipment data, team roles, and system notifications.";
        action = undefined;
      } else if (input.includes("dashboard") || input.includes("set up") || input.includes("widget")) {
        response = "To set up your dashboard, navigate to the 'Dashboard' tab. You can add widgets like the Real-time Map, KPI Counter, and Alert Feed. Pro tip: you can save multiple views for different regions!";
        action = undefined;
      } else if (input.includes("role") || input.includes("team") || input.includes("permission")) {
        response = "Apeiro offers several permission levels: Owner (full access), Admin (can manage users and billing), and Viewer (read-only). You can manage these in the 'Account & Access' section of your settings.";
        action = undefined;
      } else if (input.includes("claim") || input.includes("refund") || input.includes("damage")) {
        response = "Shipping claims for delayed or damaged packages can be filed under the 'Billing & Claims' section. Make sure to have your tracking number and photo evidence (if applicable) ready.";
        action = undefined;
      } else if (input.includes("password") || input.includes("login") || input.includes("reset")) {
        response = "If you've forgotten your password, use the 'Forgot Password' link on the login page. For common login errors like 401 or 403, try clearing your browser cache or contact your workspace admin to verify your permissions.";
        action = undefined;
      } else if (input.includes("invoice") || input.includes("billing") || input.includes("pay")) {
        response = "You can view your invoice history and manage payment methods in 'Billing & Claims'. We offer both monthly and yearly billing cycles. You can also update your billing email there.";
        action = undefined;
      } else if (input.includes("report") || input.includes("compliance") || input.includes("export")) {
        response = "Compliance reports can be exported in CSV, PDF, or JSON formats from the 'Reports' section. You can filter by date range, region, or carrier status. Large reports may take a few minutes to generate and will be emailed to you.";
        action = undefined;
      } else if (input.includes("slack") || input.includes("notification") || input.includes("webhook")) {
        response = "You can integrate Apeiro with Slack to receive real-time alerts. We also support webhooks for push notifications on every shipment milestone. Check the 'Service Issues' category for configuration guides.";
        action = undefined;
      } else if (input.includes("mobile") || input.includes("app") || input.includes("ios") || input.includes("android")) {
        response = "The Apeiro mobile app is available for both iOS and Android. It allows you to track shipments and receive push notifications on the go. You can find the setup guide in 'Getting Started'.";
        action = undefined;
      } else if (input.includes("ticket") || input.includes("support") || input.includes("help") || input.includes("talk to human")) {
        response = "I'm here to help, but if you need a human agent, I can help you open a support ticket. Our team typically responds within 10-20 minutes during business hours.";
        action = 'ticket';
      }

      setChatMessages(prev => [...prev, { role: 'assistant', content: response, action }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setView('success');
    }, 1500);
  };

  const resetWidget = () => {
    setView('home');
    setSearchQuery("");
    setChatMessages([{ role: 'assistant', content: "Hi! I'm the Apeiro AI assistant. I can help search our resources or help you open a ticket. What's on your mind?", action: 'ticket' }]);
    setTicketForm({
      email: "design@apeiro.digital",
      subject: "",
      category: "",
      description: ""
    });
  };

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(resetWidget, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 25, stiffness: 300 } },
    exit: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]" ref={widgetRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-20 right-0 w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-140px)] bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden border border-slate-100"
          >
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="flex items-center gap-4 relative z-10">
                {view !== 'home' ? (
                  <button onClick={() => setView('home')} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-400" />
                  </button>
                ) : (
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                )}
                <div>
                  <h3 className="font-display font-bold text-lg leading-none mb-1">
                    {view === 'ticket' ? 'Submit Ticket' : 'How can we help?'}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    AI-Assisted Support
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors relative z-10"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow overflow-y-auto custom-scrollbar p-6">
              <AnimatePresence mode="wait">
                {view === 'home' && (
                  <motion.div
                    key="home"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-8"
                  >
                    {/* Search Section */}
                    <div className="space-y-3">
                      <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input 
                          type="text" 
                          placeholder="Describe your issue..."
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            if (e.target.value.length > 0) setView('search');
                          }}
                          className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium px-1 italic">
                        "Try: How do I export my invoice? or Tracking delayed"
                      </p>
                    </div>

                    {/* Quick FAQs */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between px-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Top Questions</span>
                        <HelpCircle className="w-3 h-3 text-slate-300" />
                      </div>
                      <div className="space-y-2">
                        {popularArticles.slice(0, 4).map((article) => (
                          <button 
                            key={article.id}
                            onClick={() => onArticleClick(article.id)}
                            className="w-full flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 hover:shadow-sm transition-all group text-left"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
                                <FileText className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors line-clamp-1">{article.title}</h4>
                                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">{article.category}</span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-blue-500 transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {view === 'search' && (
                  <motion.div
                    key="search"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-2">
                       <button onClick={() => {setView('home'); setSearchQuery("");}} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400"><ArrowLeft className="w-4 h-4" /></button>
                       <div className="flex-grow h-11 px-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-3">
                         <Search className="w-3.5 h-3.5 text-blue-500" />
                         <input 
                           autoFocus
                           className="bg-transparent border-none outline-none text-sm font-medium text-slate-900 w-full"
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                         />
                       </div>
                    </div>

                    {/* AI Suggested Section */}
                    {bestMatch && (
                      <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-5 space-y-4">
                        <div className="flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-widest">
                          <Sparkles className="w-3.5 h-3.5" />
                          Suggested Solution
                        </div>
                        <div 
                          onClick={() => onArticleClick(bestMatch.id)}
                          className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm hover:border-blue-400 transition-all cursor-pointer group"
                        >
                          <h4 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600">{bestMatch.title}</h4>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{bestMatch.description}</p>
                        </div>
                        <button 
                          onClick={() => setIsOpen(false)}
                          className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1 mx-auto"
                        >
                          <CheckCircle className="w-3 h-3" />
                          This solved my issue
                        </button>
                      </div>
                    )}

                    {/* Other Results */}
                    <div className="space-y-2">
                       <span className="px-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">More Results</span>
                       <div className="divide-y divide-slate-100">
                          {filteredArticles.slice(1).map(article => (
                            <button 
                              key={article.id}
                              onClick={() => onArticleClick(article.id)}
                              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 rounded-xl transition-all group"
                            >
                              <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">{article.title}</span>
                              <ArrowRight className="w-4 h-4 text-slate-200 group-hover:text-blue-500" />
                            </button>
                          ))}
                       </div>
                    </div>

                    {filteredArticles.length === 0 && (
                      <div className="py-12 text-center space-y-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                          <Search className="w-8 h-8 text-slate-200" />
                        </div>
                        <p className="text-sm text-slate-400 font-medium">No direct matches. Try a broader search or talk to an agent.</p>
                        <button onClick={() => setView('chat')} className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">Chat with Support</button>
                      </div>
                    )}
                  </motion.div>
                )}

                {view === 'chat' && (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex flex-col h-full"
                  >
                    <div className="flex-grow space-y-4 mb-4 overflow-y-auto px-1 custom-scrollbar min-h-[300px]">
                      {chatMessages.map((msg, i) => (
                        <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                          <div className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed ${
                            msg.role === 'user' 
                              ? 'bg-blue-600 text-white rounded-tr-none' 
                              : 'bg-slate-100 text-slate-700 rounded-tl-none border border-slate-200'
                          }`}>
                            {msg.content}
                          </div>
                          {msg.action === 'ticket' && (
                            <button 
                              onClick={() => setView('ticket')}
                              className="mt-2 text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-100 transition-all active:scale-95"
                            >
                              <MessageSquare className="w-3 h-3" />
                              Open Support Ticket
                            </button>
                          )}
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none border border-slate-200">
                            <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                          </div>
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleChatSubmit} className="relative mt-auto border-t border-slate-100 pt-4 bg-white">
                      <input 
                        type="text"
                        placeholder="Type a message..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        className="w-full h-12 pl-4 pr-12 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:bg-white focus:border-blue-500 transition-all"
                      />
                      <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:text-blue-600 text-slate-400 transition-colors mt-2">
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </motion.div>
                )}

                {view === 'ticket' && (
                  <motion.div
                    key="ticket"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <form onSubmit={handleTicketSubmit} className="space-y-4 pb-4">
                       <div className="space-y-1.5">
                         <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                         <input 
                           disabled
                           type="email"
                           value={ticketForm.email}
                           className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium text-slate-400 cursor-not-allowed"
                         />
                       </div>

                       <div className="space-y-1.5">
                         <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">What's the issue?</label>
                         <select 
                           required
                           value={ticketForm.category}
                           onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                           className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all"
                         >
                           <option value="" disabled>Select category</option>
                           <option value="billing">Billing & Payments</option>
                           <option value="account">Account Access</option>
                           <option value="technical">Technical Support</option>
                           <option value="other">Other</option>
                         </select>
                       </div>

                       <div className="space-y-1.5">
                         <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                         <input 
                           required
                           type="text"
                           placeholder="Summarize the core issue"
                           value={ticketForm.subject}
                           onChange={(e) => {
                             setTicketForm({...ticketForm, subject: e.target.value});
                             setSearchQuery(e.target.value);
                           }}
                           className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all"
                         />
                       </div>

                       {ticketForm.subject.length > 5 && bestMatch && (
                         <motion.div 
                           initial={{ opacity: 0, height: 0 }}
                           animate={{ opacity: 1, height: 'auto' }}
                           className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3"
                         >
                            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                               <p className="text-[10px] font-bold text-amber-700 leading-tight mb-1">Wait! Does this help?</p>
                               <span onClick={() => onArticleClick(bestMatch.id)} className="text-xs font-medium text-slate-800 hover:text-blue-600 underline cursor-pointer">{bestMatch.title}</span>
                            </div>
                         </motion.div>
                       )}

                       <div className="space-y-1.5">
                         <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Detailed Description</label>
                         <textarea 
                           required
                           rows={4}
                           placeholder="Tell us more about what's happening..."
                           value={ticketForm.description}
                           onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                           className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all resize-none"
                         />
                       </div>

                       <button 
                         disabled={isSubmitting}
                         className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2"
                       >
                         {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Send Request</>}
                       </button>
                    </form>
                  </motion.div>
                )}

                {view === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">Ticket Submitted</h3>
                    <p className="text-sm text-slate-500 mb-4 px-4 leading-relaxed">
                      Ticket submitted! We've logged your request <span className="font-bold text-slate-900">#CD-9283-XK</span>. Our team will reach out to you at the earliest.
                    </p>
                    <div className="space-y-3 pt-6">
                      <button onClick={() => setView('home')} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg hover:bg-slate-800 transition-all">Back to Support Home</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sticky Actions Footer (only on Home) */}
            {view === 'home' && (
              <div className="p-6 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-3">
                 <button 
                  onClick={() => setView('ticket')}
                  className="flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-slate-800 shadow-lg shadow-slate-900/10 transition-all group"
                 >
                   <MessageSquare className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                   New Ticket
                 </button>
                 <button 
                  onClick={() => setView('chat')}
                  className="flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl text-xs font-bold hover:bg-slate-50 hover:border-slate-300 transition-all group"
                 >
                   <Sparkles className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                   Chat with Support
                 </button>
                 <div className="col-span-2 text-center mt-1">
                    <span className="text-[10px] font-medium text-slate-400 flex items-center justify-center gap-2">
                       <Clock className="w-3 h-3" />
                       Avg. response: <span className="text-slate-600 font-bold">~10 min</span>
                    </span>
                 </div>
              </div>
            )}

            {/* Footer Brand Info (on ticket form) */}
            {view === 'ticket' && (
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                 <p className="text-[10px] text-slate-400 font-medium">Your data is secured by Apeiro Enterprise Shield</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-[0_10px_40px_rgba(37,99,235,0.25)] flex items-center justify-center z-50 border-4 border-white transition-all duration-500 relative group overflow-hidden ${isOpen ? "bg-slate-800" : "bg-blue-600"}`}
      >
        <div className={`absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isOpen ? 'hidden' : ''}`} />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-7 h-7 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative z-10"
            >
              <HelpCircle className="w-7 h-7 text-white" />
              {/* Pulsing Glow */}
              <div className="absolute -inset-2 bg-white/20 rounded-full animate-ping opacity-20 pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

