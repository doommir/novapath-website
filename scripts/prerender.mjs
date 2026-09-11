import fs from 'node:fs';
import { renderPage } from '../dist/prerender/entry-server.js';
const file = 'dist/public/index.html';
const template = fs.readFileSync(file, 'utf8');
const paths = ['/', '/about', '/cobuilder', '/blog'];
for (const file of fs.readdirSync('content/blog')) {
 if (file.endsWith('.md')) {const source = fs.readFileSync(`content/blog/${file}`, 'utf8');const slug = source.match(/^slug: (.+)$/m)?.[1];if(slug)paths.push(`/blog/${slug}`);}
}
const pages = {};
for (const path of paths) {
 const content=renderPage(path).replaceAll('opacity:0', 'opacity:1');
 if (content.length < 500) throw new Error(`Missing page content: ${path}`);
 pages[path]=template.replace('<div id="root"></div>',`<div id="root">${content}</div>`);
}
if(!pages['/'].includes('Stronger teams.'))throw new Error('Homepage incomplete');
fs.writeFileSync(file,pages['/']);
fs.writeFileSync('dist/public/rendered-pages.json',JSON.stringify(pages));
console.log(`Rendered ${paths.length} public pages into HTML.`);
