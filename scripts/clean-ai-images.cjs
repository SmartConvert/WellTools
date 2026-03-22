const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
const postsData = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

// Topic-based image mappings from Unsplash
const topicImages = {
    'inflammation': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200',
    'microbiome': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200',
    'muscle': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200',
    'protein': 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=1200',
    'aging': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
    'sleep': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=1200',
    'weight': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200',
    'water': 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=1200',
    'hydration': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=1200',
    'calories': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200',
    'fasting': 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=1200',
    'default': 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=1200'
};

function getRelevantImage(text) {
    const t = text.toLowerCase();
    for (const [topic, url] of Object.entries(topicImages)) {
        if (t.includes(topic)) return url;
    }
    return topicImages.default;
}

let modified = 0;

for (const lang in postsData) {
    postsData[lang].forEach(post => {
        // 1. Clean the main image if it uses pollinations.ai
        if (post.image && post.image.includes('pollinations.ai')) {
            post.image = getRelevantImage(post.title || '');
            delete post.imagePrompt;
            modified++;
        }
        
        // 2. Remove all inline markdown images containing pollinations.ai
        if (post.content && post.content.includes('pollinations.ai')) {
            // Regex to remove: ![optional alt](url containing pollinations.ai)
            post.content = post.content.replace(/!\\[[^\\]]*\\]\\([^)]*pollinations\\.ai[^)]*\\)\\n?/g, '');
            modified++;
        }
    });
}

if (modified > 0) {
    fs.writeFileSync(postsPath, JSON.stringify(postsData, null, 4));
    console.log(`Successfully cleaned ${modified} posts of AI images.`);
} else {
    console.log('No AI images found to clean.');
}
