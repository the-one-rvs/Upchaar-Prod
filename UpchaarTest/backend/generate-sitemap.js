import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define base URLs of your website
const baseUrls = ['https://www.upchaar.live', 'http://www.upchaar.live'];

// Manually define __dirname for ES modules
const __dirname = path.resolve();

// Define the path for saving the sitemap.xml in the dist directory
const sitemapPath = path.join(__dirname, '/upchaarvone/dist/sitemap.xml');

async function generateSitemap() {
  try {
    // Initialize the XML structure
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // List of static URLs to include in the sitemap
    const staticUrls = [
      { url: '/', changefreq: 'monthly', priority: 1.0 },
      { url: '/features', changefreq: 'monthly', priority: 1.0 },
      { url: '/login', changefreq: 'monthly', priority: 0.7 },
      { url: '/virtualvaidhya', changefreq: 'monthly', priority: 0.7 },
      { url: '/register', changefreq: 'monthly', priority: 0.8 },
      { url: '/faq', changefreq: 'monthly', priority: 0.6 },
      { url: '/aboutus', changefreq: 'monthly', priority: 0.6 },
      // Add more URLs here
    ];

    // Add static URLs for both base URLs
    baseUrls.forEach((baseUrl) => {
      staticUrls.forEach(({ url, changefreq, priority }) => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}${url}</loc>\n`;
        xml += `    <changefreq>${changefreq}</changefreq>\n`;
        xml += `    <priority>${priority}</priority>\n`;
        xml += `  </url>\n`;
      });
    });

    // Close the XML structure
    xml += `</urlset>`;

    // Write XML to file
    fs.writeFileSync(sitemapPath, xml);
    console.log('Sitemap generated at ' + sitemapPath);
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

// Export the generateSitemap function as the default export
export default generateSitemap;
