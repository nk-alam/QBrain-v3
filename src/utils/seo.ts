import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const generateSEOTags = ({
  title = 'Qbrain Team - Elite B.Tech Student Technology Team',
  description = 'Join Qbrain Team, an elite B.Tech student team specializing in AI, IoT, and cutting-edge technology solutions for hackathons and competitions. AUAT Techfest 2025 Winners.',
  keywords = 'qbrain, hackathon team, AI, IoT, technology, B.Tech students, smart india hackathon, tech competition, innovation, BWU',
  image = 'https://qbrain.in/social.jpg',
  url = 'https://qbrain.in',
  type = 'website',
  author = 'Team Qbrain',
  publishedTime,
  modifiedTime
}: SEOProps) => ({
  title,
  description,
  keywords,
  image,
  url,
  type,
  author,
  publishedTime,
  modifiedTime
});

export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const generateBreadcrumbs = (pathname: string) => {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs = [
    { name: 'Home', href: '/' }
  ];

  let currentPath = '';
  paths.forEach((path, index) => {
    currentPath += `/${path}`;
    const name = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    breadcrumbs.push({
      name,
      href: currentPath
    });
  });

  return breadcrumbs;
};