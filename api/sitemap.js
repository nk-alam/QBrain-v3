import { getBlogs, getAchievements, getProjects } from '../src/services/firebaseService.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const baseUrl = 'https://qbrain.in';
    
    // Static pages
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'weekly' },
      { url: '/about', priority: '0.8', changefreq: 'weekly' },
      { url: '/team', priority: '0.8', changefreq: 'weekly' },
      { url: '/achievements', priority: '0.9', changefreq: 'weekly' },
      { url: '/projects', priority: '0.9', changefreq: 'weekly' },
      { url: '/blog', priority: '0.9', changefreq: 'weekly' },
      { url: '/contact', priority: '0.7', changefreq: 'monthly' },
      { url: '/join', priority: '0.8', changefreq: 'weekly' },
      { url: '/donate', priority: '0.6', changefreq: 'monthly' }
    ];

    let urls = [...staticPages];

    try {
      // Add blog posts
      const blogsResult = await getBlogs();
      if (blogsResult.success) {
        const blogUrls = blogsResult.data
          .filter((blog) => blog.status === 'published')
          .map((blog) => ({
            url: `/blog/${blog.slug || blog.id}`,
            priority: '0.8',
            changefreq: 'monthly',
            lastmod: blog.updatedAt?.toDate()?.toISOString() || blog.createdAt?.toDate()?.toISOString()
          }));
        urls = [...urls, ...blogUrls];
      }

      // Add achievements
      const achievementsResult = await getAchievements();
      if (achievementsResult.success) {
        const achievementUrls = achievementsResult.data.map((achievement) => ({
          url: `/achievements/${achievement.slug || achievement.id}`,
          priority: '0.7',
          changefreq: 'monthly',
          lastmod: achievement.updatedAt?.toDate()?.toISOString() || achievement.createdAt?.toDate()?.toISOString()
        }));
        urls = [...urls, ...achievementUrls];
      }

      // Add projects
      const projectsResult = await getProjects();
      if (projectsResult.success) {
        const projectUrls = projectsResult.data.map((project) => ({
          url: `/projects/${project.slug || project.id}`,
          priority: '0.8',
          changefreq: 'monthly',
          lastmod: project.updatedAt?.toDate()?.toISOString() || project.createdAt?.toDate()?.toISOString()
        }));
        urls = [...urls, ...projectUrls];
      }
    } catch (error) {
      console.error('Error fetching dynamic content for sitemap:', error);
    }

    // Generate XML
    const sitemap = generateSitemapXML(baseUrl, urls);
    
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
}

const generateSitemapXML = (baseUrl, urls) => {
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