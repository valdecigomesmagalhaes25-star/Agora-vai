
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_VIDEOS } from './constants';
import { ViewType, Video } from './types';
import VideoCard from './components/VideoCard';
import CreateVideoModal from './components/CreateVideoModal';
import { Home, Search, PlusCircle, User, Compass, TrendingUp } from 'lucide-react';

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>(MOCK_VIDEOS);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [activeView, setActiveView] = useState<ViewType>('feed');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollPos = e.currentTarget.scrollTop;
    const height = e.currentTarget.clientHeight;
    const index = Math.round(scrollPos / height);
    if (index !== activeVideoIndex) {
      setActiveVideoIndex(index);
    }
  };

  const handleCreateSuccess = (videoUrl: string, prompt: string) => {
    const newVideo: Video = {
      id: Date.now().toString(),
      url: videoUrl,
      user: {
        name: 'Você',
        handle: '@meu_avatar_ia',
        avatar: 'https://picsum.photos/seed/user/100/100'
      },
      description: prompt,
      likes: 0,
      comments: 0,
      shares: 0,
      music: 'AI Generated Soundscape'
    };
    setVideos([newVideo, ...videos]);
    setIsCreateModalOpen(false);
    setActiveVideoIndex(0);
    // Scroll to top to see the new video
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden relative">
      {/* Sidebar - Hidden on mobile */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-white/10 p-4 space-y-6">
        <div className="flex items-center gap-2 px-4 py-6">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center">
            <span className="font-black text-xl italic">N</span>
          </div>
          <h1 className="text-2xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            NOVAREELS
          </h1>
        </div>

        <nav className="space-y-1">
          <NavItem active={activeView === 'feed'} icon={<Home />} label="Para Você" onClick={() => setActiveView('feed')} />
          <NavItem active={activeView === 'search'} icon={<Compass />} label="Explorar" onClick={() => setActiveView('search')} />
          <NavItem active={false} icon={<TrendingUp />} label="Em Alta" />
        </nav>

        <div className="pt-6 border-t border-white/5">
          <p className="px-4 text-xs font-semibold text-zinc-500 mb-4 uppercase">Canais Recomendados</p>
          {[1,2,3].map(i => (
            <div key={i} className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-xl cursor-pointer transition-colors group">
              <img src={`https://picsum.photos/seed/${i+10}/100/100`} className="w-8 h-8 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-bold truncate">@user_prime_{i}</p>
                <p className="text-xs text-zinc-500">2.5M seguidores</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto p-4 bg-gradient-to-br from-violet-900/40 to-fuchsia-900/40 rounded-3xl border border-white/10">
          <h4 className="font-bold mb-2">Crie com IA</h4>
          <p className="text-xs text-zinc-400 mb-4">Use nossa tecnologia de ponta para criar vídeos incríveis do zero.</p>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full py-2 bg-white text-black font-bold rounded-xl text-sm hover:bg-zinc-200 transition-colors"
          >
            Começar agora
          </button>
        </div>
      </aside>

      {/* Main Video Feed Area */}
      <main className="flex-1 relative">
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="video-container scroll-smooth"
        >
          {videos.map((video, idx) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              active={idx === activeVideoIndex} 
            />
          ))}
        </div>

        {/* Floating Mobile/Tablet Header */}
        <header className="lg:hidden absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-gradient-to-b from-black/50 to-transparent">
          <h1 className="text-xl font-black italic tracking-tighter">NOVAREELS</h1>
          <div className="flex gap-4">
            <button className="p-2 bg-black/30 rounded-full backdrop-blur-md">
              <Search size={20} />
            </button>
          </div>
        </header>
      </main>

      {/* Bottom Nav for Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-20 glass border-t border-white/10 flex justify-around items-center px-4 z-[60]">
        <button onClick={() => setActiveView('feed')} className={`flex flex-col items-center ${activeView === 'feed' ? 'text-white' : 'text-zinc-500'}`}>
          <Home size={24} />
          <span className="text-[10px] mt-1 uppercase font-bold tracking-widest">Home</span>
        </button>
        <button onClick={() => setActiveView('search')} className={`flex flex-col items-center ${activeView === 'search' ? 'text-white' : 'text-zinc-500'}`}>
          <Search size={24} />
          <span className="text-[10px] mt-1 uppercase font-bold tracking-widest">Explorar</span>
        </button>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-white p-2 rounded-xl mb-6 shadow-xl shadow-white/20 active:scale-90 transition-transform"
        >
          <PlusCircle size={32} className="text-black" />
        </button>
        <button className="flex flex-col items-center text-zinc-500">
          <Compass size={24} />
          <span className="text-[10px] mt-1 uppercase font-bold tracking-widest">Live</span>
        </button>
        <button onClick={() => setActiveView('profile')} className={`flex flex-col items-center ${activeView === 'profile' ? 'text-white' : 'text-zinc-500'}`}>
          <User size={24} />
          <span className="text-[10px] mt-1 uppercase font-bold tracking-widest">Perfil</span>
        </button>
      </nav>

      {/* Create Video Modal */}
      {isCreateModalOpen && (
        <CreateVideoModal 
          onClose={() => setIsCreateModalOpen(false)} 
          onSuccess={handleCreateSuccess} 
        />
      )}
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; icon: React.ReactNode; label: string; onClick?: () => void }> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
      active 
        ? 'bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 text-white border-l-4 border-violet-500' 
        : 'text-zinc-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    {React.cloneElement(icon as React.ReactElement, { size: 24, strokeWidth: active ? 2.5 : 2 })}
    <span className={`font-semibold ${active ? 'text-white' : ''}`}>{label}</span>
  </button>
);

export default App;
