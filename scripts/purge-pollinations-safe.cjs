const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
let content = fs.readFileSync(postsPath, 'utf8');

let data = JSON.parse(content);
let purged = 0;

if (data.en) {
    data.en.forEach(post => {
        if (!post.content) return;
        
        const originalContent = post.content;
        
        // Remove markdown image nodes safely using a proper RegExp object
        // Matches ![any text](https://image.pollinations.ai/...)
        const markdownImgRegex = new RegExp('!\\\\[[^\\\\]]*\\\\]\\\\(https://image\\\\.pollinations\\\\.ai/[^)]+\\\\)', 'g');
        post.content = post.content.replace(markdownImgRegex, '');
        
        // Catch any raw URL containing pollinations.ai completely safely
        const rawUrlRegex = new RegExp('https://image\\\\.pollinations\\\\.ai/[^\\\\s\\\\)]+', 'g');
        post.content = post.content.replace(rawUrlRegex, '');
        
        if (originalContent !== post.content) {
            purged++;
        }
    });
}

// Fix the image for cortisol post
const stringified = JSON.stringify(data, null, 4).replace('/images/blog/cortisol-weight.png', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200');

fs.writeFileSync(postsPath, stringified, 'utf8');
console.log(`Successfully purged lingering AI pollinations URLs from ${purged} articles without data loss.`);
