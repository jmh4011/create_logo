import { SitemapStream } from 'sitemap';
import { createWriteStream } from 'fs';
import path from 'path';
import routes from './src/routes.js'; 

const generateSitemap = () => {
  const sitemap = new SitemapStream({ hostname: 'https://logohub.shop' });
  const writeStream = createWriteStream(path.resolve('./public/sitemap.xml'));

  routes.forEach((route) => {
    sitemap.write({
      url: route.path,
      changefreq: route.changefreq,
      priority: route.priority,
    });
  });

  sitemap.end();
  sitemap.pipe(writeStream);
};

generateSitemap();
