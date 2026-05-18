"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  ArrowRight, 
  Search, 
  Loader2, 
  User,
  MoreVertical,
  Phone,
  Video,
  Info,
  MessageCircle
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  doc, 
  updateDoc, 
  serverTimestamp 
} from "firebase/firestore";

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>}>
      <ChatContent />
    </Suspense>
  );
}

function ChatContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialChatId = searchParams.get("chatId");

  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(initialChatId);
  const [activeChatDetails, setActiveChatDetails] = useState(null);
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);

  // 1. Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const savedRole = localStorage.getItem("role") || "patient";
      setRole(savedRole.toLowerCase());

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("/api/user/profile", {
          headers: { "authorization": `${savedRole.toLowerCase()} ${token}` }
        });
        const data = await res.json();
        
        if (res.ok && data.user) {
          setCurrentUser(data.user);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  // 2. Listen to Chats List
  useEffect(() => {
    if (!currentUser) return;
    const userId = currentUser._id || currentUser.id;

    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", userId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Sort manually by updatedAt
      chatsList.sort((a, b) => {
        const dateA = new Date(a.updatedAt || 0).getTime();
        const dateB = new Date(b.updatedAt || 0).getTime();
        return dateB - dateA;
      });

      setChats(chatsList);

      // If there's an active chat, update its details
      if (activeChatId) {
        const currentActive = chatsList.find(c => c.id === activeChatId);
        if (currentActive) setActiveChatDetails(currentActive);
      }
    });

    return () => unsubscribe();
  }, [currentUser, activeChatId]);

  // 3. Listen to Active Chat Messages
  useEffect(() => {
    if (!activeChatId || !currentUser) return;

    const q = query(
      collection(db, "chats", activeChatId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
      scrollToBottom();
    });

    return () => unsubscribe();
  }, [activeChatId, currentUser]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChatId || !currentUser) return;

    const userId = currentUser._id || currentUser.id;
    const msgText = newMessage.trim();
    setNewMessage("");
    setSending(true);

    try {
      // Add message
      await addDoc(collection(db, "chats", activeChatId, "messages"), {
        senderId: userId,
        text: msgText,
        createdAt: serverTimestamp()
      });

      // Update chat last message
      await updateDoc(doc(db, "chats", activeChatId), {
        lastMessage: msgText,
        updatedAt: new Date().toISOString()
      });
      
      scrollToBottom();
    } catch (err) {
      console.error("Error sending message:", err);
      alert("فشل في إرسال الرسالة");
    } finally {
      setSending(false);
    }
  };

  const getOtherParticipant = (chat) => {
    if (!chat || !currentUser) return { name: "", avatar: "" };
    const isDoctor = role === "doctor";
    return {
      name: isDoctor ? chat.patientName : chat.doctorName,
      avatar: isDoctor ? chat.patientAvatar : chat.doctorAvatar
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  const filteredChats = chats.filter(chat => {
    const other = getOtherParticipant(chat);
    return other.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-slate-50 py-6 md:py-12" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 h-[calc(100vh-120px)] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 shrink-0">
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            الرسائل والمحادثات
          </h1>
          <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 font-bold hover:text-primary transition-all">
            <ArrowRight className="w-5 h-5 rotate-180" />
            عودة
          </button>
        </div>

        {/* Main Chat Layout */}
        <div className="flex-1 bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row relative">
          
          {/* Sidebar - Chats List */}
          <div className={`w-full md:w-96 border-l border-slate-100 flex flex-col bg-slate-50/50 ${activeChatId ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-6 shrink-0">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ابحث عن محادثة..." 
                  className="w-full pr-12 pl-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:outline-none font-bold"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 custom-scrollbar">
              {filteredChats.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-slate-400 font-bold text-sm">لا توجد محادثات سابقة.</p>
                </div>
              ) : (
                filteredChats.map(chat => {
                  const other = getOtherParticipant(chat);
                  const isActive = activeChatId === chat.id;
                  
                  return (
                    <button 
                      key={chat.id}
                      onClick={() => {
                        setActiveChatId(chat.id);
                        setActiveChatDetails(chat);
                      }}
                      className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all text-right ${
                        isActive 
                        ? "bg-primary text-white shadow-lg shadow-primary/20" 
                        : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-100"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 ${isActive ? 'border-white/30' : 'border-slate-100'}`}>
                        <img src={other.avatar || "/person1.png"} alt={other.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className={`font-black truncate ${isActive ? 'text-white' : 'text-slate-800'}`}>
                            {other.name}
                          </h4>
                          {chat.updatedAt && (
                            <span className={`text-[10px] font-bold shrink-0 ${isActive ? 'text-white/70' : 'text-slate-400'}`}>
                              {new Date(chat.updatedAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute:'2-digit' })}
                            </span>
                          )}
                        </div>
                        <p className={`text-xs truncate font-bold ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                          {chat.lastMessage}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className={`flex-1 flex flex-col bg-white relative ${!activeChatId ? 'hidden md:flex' : 'flex'}`}>
            {!activeChatId ? (
              <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                  <MessageCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">اختر محادثة للبدء</h3>
                <p className="text-slate-500 font-bold max-w-sm">قم باختيار محادثة من القائمة الجانبية للتواصل المباشر وتبادل الرسائل.</p>
              </div>
            ) : (
              <>
                {/* Chat Header */}
                {activeChatDetails && (
                  <div className="h-20 px-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                    <div className="flex items-center gap-4">
                      {/* Mobile Back Button */}
                      <button onClick={() => setActiveChatId(null)} className="md:hidden p-2 text-slate-500 bg-slate-50 rounded-xl">
                        <ArrowRight className="w-5 h-5 rotate-180" />
                      </button>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                          <img src={getOtherParticipant(activeChatDetails).avatar || "/person1.png"} alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-black text-slate-800">{getOtherParticipant(activeChatDetails).name}</h3>
                          <span className="text-[10px] text-green-500 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> متصل الآن
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                        <Phone className="w-5 h-5" />
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                        <Video className="w-5 h-5" />
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                        <Info className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/30">
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                      <p className="font-bold text-sm bg-slate-100 px-4 py-2 rounded-full">بدء محادثة جديدة</p>
                    </div>
                  ) : (
                    messages.map((msg, idx) => {
                      const isMe = msg.senderId === (currentUser._id || currentUser.id);
                      
                      // For time
                      let timeStr = "";
                      if (msg.createdAt?.toDate) {
                        timeStr = msg.createdAt.toDate().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
                      }

                      return (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          key={msg.id || idx} 
                          className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[75%] md:max-w-[60%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                            <div className={`p-4 rounded-3xl ${
                              isMe 
                              ? 'bg-primary text-white rounded-br-none shadow-md shadow-primary/20' 
                              : 'bg-white border border-slate-100 text-slate-800 rounded-bl-none shadow-sm'
                            }`}>
                              <p className="text-sm font-bold leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold mt-1 px-2">{timeStr}</span>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 md:p-6 bg-white border-t border-slate-100 shrink-0">
                  <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                    <input 
                      type="text" 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="اكتب رسالتك هنا..."
                      className="flex-1 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:outline-none font-bold text-slate-700"
                    />
                    <button 
                      type="submit" 
                      disabled={sending || !newMessage.trim()}
                      className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 hover:-translate-y-1 hover:shadow-xl transition-all disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                      {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 rotate-180" />}
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
