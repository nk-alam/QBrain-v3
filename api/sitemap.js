// Import Firebase Admin SDK for server-side operations
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Initialize Firebase Admin if not already initialized
    let app;
    if (getApps().length === 0) {
      // For Vercel, we'll use the service account from environment variables
      const serviceAccount = {
        type: "service_account",
        project_id: process.env.VITE_FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
      };
      
      app = initializeApp({
        credential: cert(serviceAccount)
      });
    } else {
      app = getApps()[0];
    }
    
    const db = getFirestore(app);
    
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
      const blogsSnapshot = await db.collection('blogs').where('status', '==', 'published').get();
      const blogUrls = blogsSnapshot.docs.map((doc) => {
        const blog = doc.data();
        return {
          url: `/blog/${blog.slug || doc.id}`,
          priority: '0.8',
          changefreq: 'monthly',
          lastmod: blog.updatedAt?.toDate()?.toISOString() || blog.createdAt?.toDate()?.toISOString()
        };
      });
      urls = [...urls, ...blogUrls];

      // Add achievements
      const achievementsSnapshot = await db.collection('achievements').get();
      const achievementUrls = achievementsSnapshot.docs.map((doc) => {
        const achievement = doc.data();
        return {
          url: `/achievements/${achievement.slug || doc.id}`,
          priority: '0.7',
          changefreq: 'monthly',
          lastmod: achievement.updatedAt?.toDate()?.toISOString() || achievement.createdAt?.toDate()?.toISOString()
        };
      });
      urls = [...urls, ...achievementUrls];

      // Add projects
      const projectsSnapshot = await db.collection('projects').get();
      const projectUrls = projectsSnapshot.docs.map((doc) => {
        const project = doc.data();
        return {
          url: `/projects/${project.slug || doc.id}`,
          priority: '0.8',
          changefreq: 'monthly',
          lastmod: project.updatedAt?.toDate()?.toISOString() || project.createdAt?.toDate()?.toISOString()
        };
      });
      urls = [...urls, ...projectUrls];
    } catch (error) {
      console.error('Error fetching dynamic content for sitemap:', error);
      // Continue with static pages only if Firebase fails
    }

    // Generate XML
    const sitemap = generateSitemapXML(baseUrl, urls);
    
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    
    // Fallback to static sitemap if dynamic generation fails
    const baseUrl = 'https://qbrain.in';
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
    
    const fallbackSitemap = generateSitemapXML(baseUrl, staticPages);
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(fallbackSitemap);
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