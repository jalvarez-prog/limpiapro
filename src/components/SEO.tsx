import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const SEO = ({
  title = 'Clean Solutions - Servicios de Limpieza Profesional en Santiago',
  description = 'Empresa líder en servicios de limpieza profesional para empresas, oficinas y departamentos en Santiago. Personal certificado, productos ecológicos y más de 10 años de experiencia.',
  keywords = 'limpieza profesional, limpieza empresas, limpieza oficinas, limpieza departamentos, servicios limpieza Santiago, Clean Solutions, limpieza corporativa, desinfección, sanitización',
  image = 'https://cleansolutions.cl/og-image.jpg',
  url = 'https://cleansolutions.cl',
  type = 'website',
  author = 'Clean Solutions',
  publishedTime,
  modifiedTime,
  section,
  tags = []
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (selector: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        const attributes = selector.match(/\[([^=]+)="([^"]+)"\]/);
        if (attributes) {
          element.setAttribute(attributes[1], attributes[2]);
        }
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Update primary meta tags
    updateMetaTag('meta[name="title"]', title);
    updateMetaTag('meta[name="description"]', description);
    updateMetaTag('meta[name="keywords"]', keywords);
    updateMetaTag('meta[name="author"]', author);

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', title);
    updateMetaTag('meta[property="og:description"]', description);
    updateMetaTag('meta[property="og:image"]', image);
    updateMetaTag('meta[property="og:url"]', url);
    updateMetaTag('meta[property="og:type"]', type);

    // Update Twitter Card tags
    updateMetaTag('meta[property="twitter:title"]', title);
    updateMetaTag('meta[property="twitter:description"]', description);
    updateMetaTag('meta[property="twitter:image"]', image);
    updateMetaTag('meta[property="twitter:url"]', url);

    // Article specific tags (for blog posts in the future)
    if (type === 'article') {
      if (publishedTime) {
        updateMetaTag('meta[property="article:published_time"]', publishedTime);
      }
      if (modifiedTime) {
        updateMetaTag('meta[property="article:modified_time"]', modifiedTime);
      }
      if (section) {
        updateMetaTag('meta[property="article:section"]', section);
      }
      if (tags.length > 0) {
        tags.forEach(tag => {
          const tagElement = document.createElement('meta');
          tagElement.setAttribute('property', 'article:tag');
          tagElement.content = tag;
          document.head.appendChild(tagElement);
        });
      }
    }

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = url;

  }, [title, description, keywords, image, url, type, author, publishedTime, modifiedTime, section, tags]);

  return null;
};

export default SEO;