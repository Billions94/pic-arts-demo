export interface Photo {
  id: string;
  urls: {
    thumb?: string;
    regular?: string;
  };
  alt_description?: string | null;
}

export interface PhotoDetails extends Photo {
  description: string;
  user: {
    name: string;
  };
  created_at: string;
}
