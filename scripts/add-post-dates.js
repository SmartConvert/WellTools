import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsPath = path.resolve(__dirname, '../src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

const updateDate = "2026-02-11";

Object.keys(posts).forEach(lang => {
    posts[lang] = posts[lang].map(post => ({
        ...post,
        lastUpdated: updateDate
    }));
});

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 4));
console.log(`Updated ${Object.keys(posts).reduce((acc, lang) => acc + posts[lang].length, 0)} posts with lastUpdated date: ${updateDate}`);
