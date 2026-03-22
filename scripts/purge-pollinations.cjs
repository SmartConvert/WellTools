const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
let content = fs.readFileSync(postsPath, 'utf8');

let data = JSON.parse(content);
if (data.en) {
    data.en.forEach(post => {
        if (!post.content) return;
        
        // Remove Markdown image links containing pollinations
        // Use split/join to avoid complex regex escaping
        let parts = post.content.split('![');
        for (let i = 1; i < parts.length; i++) {
            if (parts[i].includes('https://image.pollinations.ai/')) {
                // Find where the link ends
                const endIdx = parts[i].indexOf(')');
                if (endIdx !== -1) {
                    parts[i] = parts[i].substring(endIdx + 1);
                }
            } else {
                parts[i] = '![' + parts[i]; // restore if not pollinations
            }
        }
        post.content = parts.join('');

        // Remove any lingering raw URLs
        post.content = post.content.split('https://image.pollinations.ai/').map((part, index, arr) => {
            if (index === 0) return part;
            const spaceIdx = part.search(/[\\s\\n]/);
            if (spaceIdx !== -1) return part.substring(spaceIdx);
            return '';
        }).join('');
    });
}

// Fix the image for cortisol post
const stringified = JSON.stringify(data, null, 4).replace('/images/blog/cortisol-weight.png', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200');

fs.writeFileSync(postsPath, stringified, 'utf8');
console.log('Successfully purged all lingering AI pollinations URLs from JSON.');
