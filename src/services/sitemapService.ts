import { getBlogs, getAchievements, getProjects } from './firebaseService';

import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export const getSitemapSettings = async () => {
  try {
    const docRef = doc(db, 'settings', 'sitemap');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    }
    
    // Return default settings if none exist
    const defaultSettings = {
      enabled: true,
      baseUrl: 'https://qbrain.in',
      includeBlogs: true,
      includeAchievements: true,
      changeFrequency: 'weekly',
      priority: {
        homepage: '1.0',
        about: '0.8',
        team: '0.8',
        achievements: '0.9',
        blog: '0.9',
        contact: '0.7',
        join: '0.8'
      }
    };
    
    return { success: true, data: defaultSettings };
  } catch (error) {
    return { success: false, error };
  }
};

export const updateSitemapSettings = async (settings: any) => {
  try {
    const docRef = doc(db, 'settings', 'sitemap');
    await setDoc(docRef, {
      ...settings,
      updatedAt: Timestamp.now()
    }, { merge: true });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const generateSitemap = async (settings: any) => {
  try {
    const staticPages = [
      { url: '/', priority: settings.priority.homepage, changefreq: settings.changeFrequency },
      { url: '/about', priority: settings.priority.about, changefreq: settings.changeFrequency },
      { url: '/team', priority: settings.priority.team, changefreq: settings.changeFrequency },
      { url: '/achievements', priority: settings.priority.achievements, changefreq: settings.changeFrequency },
      { url: '/blog', priority: settings.priority.blog, changefreq: settings.changeFrequency },
      { url: '/contact', priority: settings.priority.contact, changefreq: settings.changeFrequency },
      { url: '/join', priority: settings.priority.join, changefreq: settings.changeFrequency }
    ];

    let urls = [...staticPages];

    // Add blogs if enabled
    if (settings.includeBlogs) {
      const blogsResult = await getBlogs();
      if (blogsResult.success) {
        const blogUrls = blogsResult.data
          .filter((blog: any) => blog.status === 'published')
          .map((blog: any) => ({
            url: `/blog/${blog.slug || blog.id}`,
            priority: '0.8',
            changefreq: 'monthly',
            lastmod: blog.updatedAt?.toDate()?.toISOString() || blog.createdAt?.toDate()?.toISOString()
          }));
        urls = [...urls, ...blogUrls];
      }
    }

    // Add achievements if enabled
    if (settings.includeAchievements) {
      const achievementsResult = await getAchievements();
      if (achievementsResult.success) {
        const achievementUrls = achievementsResult.data.map((achievement: any) => ({
          url: `/achievements/${achievement.slug || achievement.id}`,
          priority: '0.7',
          changefreq: 'monthly',
          lastmod: achievement.updatedAt?.toDate()?.toISOString() || achievement.createdAt?.toDate()?.toISOString()
        }));
        urls = [...urls, ...achievementUrls];
      }
    }

    // Add projects
    const projectsResult = await getProjects();
    if (projectsResult.success) {
      const projectUrls = projectsResult.data.map((project: any) => ({
        url: `/projects/${project.slug || project.id}`,
        priority: '0.8',
        changefreq: 'monthly',
        lastmod: project.updatedAt?.toDate()?.toISOString() || project.createdAt?.toDate()?.toISOString()
      }));
      urls = [...urls, ...projectUrls];
    }

    // Generate XML
    const sitemap = generateSitemapXML(settings.baseUrl, urls);
    
    // Save sitemap settings with generation timestamp
    await updateSitemapSettings({
      ...settings,
      lastGenerated: Timestamp.now(),
      generatedSitemap: sitemap
    });
    
    return { success: true, sitemap };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return { success: false, error };
  }
};

const generateSitemapXML = (baseUrl: string, urls: any[]) => {
  const urlEntries = urls.map(url => `
  <url>
    <loc>${baseUrl}${url.url}</loc>
    <lastmod>${url.lastmod || new Date().toISOString()}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};