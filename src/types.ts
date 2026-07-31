export interface PortalSite {
  id: string;
  title: string;
  category: string;
  url: string;
  previewGif: string;
  thumbnail: string;
  description: string;
  tags: string[];
  clientOrType: 'Client' | 'Personal' | 'Curated';
  year: string;
}

export interface ProjectCardData {
  id: string;
  number: string;
  title: string;
  category: 'Client' | 'Personal';
  type: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
  liveUrl: string;
  description?: string;
  techStack?: string[];
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
}
