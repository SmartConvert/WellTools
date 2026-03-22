const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
let content = fs.readFileSync(postsPath, 'utf8');

// Catch any markdown image containing pollinations.ai
content = content.replace(/!\\[([^]*?)\\]\\([^)]*pollinations\\.ai[^)]*\\)/gi, '');

// Catch any raw URL containing pollinations.ai
content = content.replace(/https?:\\/\\/[^\\s)]*pollinations\\.ai[^\\s)]*/gi, '');

// Also fix the local image for the cortisol post globally just in case
content = content.split('/images/blog/cortisol-weight.png').join('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200');

fs.writeFileSync(postsPath, content, 'utf8');
console.log('Purge completed using regex fallback.');
