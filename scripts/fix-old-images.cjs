const fs = require('fs');
const postsPath = 'src/data/posts.json';
const data = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
const enPosts = data.en || [];

for (let i = 0; i < 2 && i < enPosts.length; i++) {
    let post = enPosts[i];
    
    // Replace hero image
    const safeTitle = post.title.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/\s+/g, '-');
    post.image = `https://image.pollinations.ai/prompt/${safeTitle}-realistic-professional-health-blog-cover?width=1200&height=800&nologo=true`;
    
    // Replace internal images based on their alt text
    if (post.content) {
        post.content = post.content.replace(/!\[(.*?)\]\([^)]+\)/g, (match, altText) => {
            const promptText = altText.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/\s+/g, '-');
            return `![${altText}](https://image.pollinations.ai/prompt/${promptText}-realistic-health-illustration?width=1200&height=800&nologo=true)`;
        });
    }
}

fs.writeFileSync(postsPath, JSON.stringify(data, null, 4));
console.log('Successfully updated the last 2 posts to use unique AI images via pollinations.ai');
