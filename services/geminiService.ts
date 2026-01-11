
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private static async getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  static async checkApiKeySelected(): Promise<boolean> {
    if (typeof window !== 'undefined' && (window as any).aistudio?.hasSelectedApiKey) {
      return await (window as any).aistudio.hasSelectedApiKey();
    }
    return !!process.env.API_KEY;
  }

  static async openKeySelector() {
    if (typeof window !== 'undefined' && (window as any).aistudio?.openSelectKey) {
      await (window as any).aistudio.openSelectKey();
    }
  }

  static async generateVideo(prompt: string, onProgress?: (msg: string) => void) {
    const ai = await this.getAI();
    onProgress?.("Iniciando o motor de sonhos...");

    try {
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '9:16'
        }
      });

      onProgress?.("Tecendo os pixels da realidade...");

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
        onProgress?.("Renderizando sua visão cinematográfica...");
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) throw new Error("Falha ao obter o link do vídeo");

      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Erro na geração do vídeo:", error);
      throw error;
    }
  }
}
