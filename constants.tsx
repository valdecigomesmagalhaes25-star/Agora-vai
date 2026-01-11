
import { Video } from './types';

export const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-lighting-in-the-city-at-night-21243-large.mp4',
    user: {
      name: 'Cyber Maya',
      handle: '@cybermaya',
      avatar: 'https://picsum.photos/seed/maya/100/100'
    },
    description: 'Explorando as luzes de Neo-Tokyo ⚡ #cyberpunk #neon #future',
    likes: 12400,
    comments: 450,
    shares: 890,
    music: 'Original Audio - Cyber Maya'
  },
  {
    id: '2',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-shore-at-sunset-22442-large.mp4',
    user: {
      name: 'Nature Vibes',
      handle: '@nature_vibes',
      avatar: 'https://picsum.photos/seed/nature/100/100'
    },
    description: 'Pôr do sol perfeito hoje. A paz que eu precisava. 🌊✨',
    likes: 8500,
    comments: 120,
    shares: 230,
    music: 'Chill Waves - Lofi Girl'
  },
  {
    id: '3',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-a-street-light-at-night-39902-large.mp4',
    user: {
      name: 'Dance King',
      handle: '@dance_king',
      avatar: 'https://picsum.photos/seed/dance/100/100'
    },
    description: 'Sinta o ritmo da noite. Noites de SP são únicas! 🕺🔥',
    likes: 45000,
    comments: 1200,
    shares: 5600,
    music: 'Phonk Night - Drft'
  }
];
