
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';
import { X, Wand2, Sparkles, Loader2, Play } from 'lucide-react';

interface CreateVideoModalProps {
  onClose: () => void;
  onSuccess: (videoUrl: string, prompt: string) => void;
}

const CreateVideoModal: React.FC<CreateVideoModalProps> = ({ onClose, onSuccess }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const hasKey = await GeminiService.checkApiKeySelected();
      if (!hasKey) {
        await GeminiService.openKeySelector();
      }

      const videoUrl = await GeminiService.generateVideo(prompt, (msg) => setProgressMsg(msg));
      onSuccess(videoUrl, prompt);
    } catch (err: any) {
      if (err.message?.includes("Requested entity was not found")) {
        setError("Chave de API inválida ou expirada. Selecione uma nova.");
        await GeminiService.openKeySelector();
      } else {
        setError("Ocorreu um erro ao gerar seu vídeo. Tente um prompt diferente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-violet-600 rounded-2xl shadow-lg shadow-violet-500/20">
              <Wand2 size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Gerador de Reel IA</h2>
              <p className="text-zinc-400 text-sm">Transforme texto em vídeos cinematográficos</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Descreva sua cena</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Um astronauta dançando em Marte com luzes neon de fundo, estilo cinematográfico..."
                className="w-full h-32 bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-white placeholder-zinc-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none resize-none transition-all"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-violet-600/20"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>{progressMsg || 'Gerando...'}</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  <span>Gerar Vídeo Mágico</span>
                </>
              )}
            </button>
            
            <p className="text-[10px] text-zinc-500 text-center uppercase tracking-widest">
              Powered by Gemini Veo 3.1 AI Technology
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVideoModal;
