
export interface Video {
  id: string;
  url: string;
  user: {
    name: string;
    avatar: string;
    handle: string;
  };
  description: string;
  likes: number;
  comments: number;
  shares: number;
  music: string;
}

export type ViewType = 'feed' | 'create' | 'profile' | 'search';
