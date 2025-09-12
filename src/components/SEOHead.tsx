import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOProps } from '../utils/seo';
import { getSEOSettings } from '../services/firebaseService';

interface SEOHeadProps extends SEOProps {
  children?: React.ReactNode;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Qbrain Team - Elite B.Tech Student Technology Team',
  description = 'Join Qbrain Team, an elite B.Tech student team specializing in AI, IoT, and cutting-edge technology solutions for hackathons and competitions. AUAT Techfest 2025 Winners.',
  keywords = 'qbrain, hackathon team, AI, IoT, technology, B.Tech students, smart india hackathon, tech competition, innovation, BWU',
  image = 'https://qbrain.in/social.jpg',
  url = 'https://qbrain.in',
  type = 'website',
  author = 'Team Qbrain',
  publishedTime,
  modifiedTime,
  children
}) => {
  const [seoSettings, setSeoSettings] = React.useState<any>(null);

  React.useEffect(() => {
    const loadSEOSettings = async () => {
      const result = await getSEOSettings();
      if (result.success && result.data) {
        setSeoSettings(result.data);
      }
    };
    loadSEOSettings();
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Qbrain Team",
    "description": description,
    "url": url,
    "logo": "https://qbrain.in/favicon.png",
    "sameAs": [
      "https://linkedin.com/company/qbrain",
      "https://github.com/qbrain",
      "https://instagram.com/qbrain"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-869-5205-637",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "398, Ramkrishnapur Rd, near Jagadighata Market",
      "addressLocality": "Barasat",
      "addressRegion": "West Bengal",
      "postalCode": "700125",
      "addressCountry": "IN"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />

      {/* SEO Settings */}
      {seoSettings?.googleSearchConsoleCode && (
        <meta name="google-site-verification" content={seoSettings.googleSearchConsoleCode} />
      )}
      {seoSettings?.facebookAppId && (
        <meta property="fb:app_id" content={seoSettings.facebookAppId} />
      )}

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={seoSettings?.siteName || "Qbrain Team"} />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />
      {seoSettings?.twitterHandle && (
        <meta name="twitter:site" content={seoSettings.twitterHandle} />
      )}

      {/* Additional SEO Tags */}
      <link rel="canonical" href={url} />
      <meta name="theme-color" content="#00D4FF" />
      <meta name="msapplication-TileColor" content="#00D4FF" />

      {/* Google Analytics */}
      {seoSettings?.googleAnalyticsId && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${seoSettings.googleAnalyticsId}`} />
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${seoSettings.googleAnalyticsId}');
            `}
          </script>
        </>
      )}

      {/* Facebook Pixel */}
      {seoSettings?.facebookPixelId && (
        <script>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${seoSettings.facebookPixelId}');
            fbq('track', 'PageView');
          `}
        </script>
      )}

      {/* Custom Header Scripts */}
      {seoSettings?.headerScripts && (
        <div dangerouslySetInnerHTML={{ __html: seoSettings.headerScripts }} />
      )}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {children}
      
      {/* Custom Footer Scripts */}
      {seoSettings?.footerScripts && (
        <div dangerouslySetInnerHTML={{ __html: seoSettings.footerScripts }} />
      )}
    </Helmet>
  );
};

export default SEOHead;