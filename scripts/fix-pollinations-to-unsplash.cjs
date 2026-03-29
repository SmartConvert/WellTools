/**
 * fix-pollinations-to-unsplash.cjs
 * Scans all posts in posts.json and replaces pollinations.ai image URLs
 * with relevant Unsplash images based on keyword matching.
 */
const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');

const topicImages = {
    'inflammation': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200',
    'microbiome':   'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200',
    'muscle':       'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200',
    'protein':      'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=1200',
    'aging':        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
    'sleep':        'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=1200',
    'weight':       'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200',
    'water':        'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=1200',
    'hydration':    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=1200',
    'calories':     'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200',
    'fasting':      'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=1200',
    'gut':          'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200',
    'stress':       'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
    'diet':         'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200',
    'fitness':      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200',
    'nutrition':    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200',
    'vitamin':      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200',
    'exercise':     'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200',
    'heart':        'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=1200',
    'hormone':      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
    'cortisol':     'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
    'default':      'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=1200'
};

function getUnsplashForKeywords(keywords) {
    const kw = keywords.toLowerCase().replace(/[-_+]/g, ' ');
    for (const [topic, url] of Object.entries(topicImages)) {
        if (topic !== 'default' && kw.includes(topic)) return url;
    }
    // Fallback to Unsplash source API
    const encoded = encodeURIComponent(kw.split(' ').slice(0, 3).join(','));
    return `https://source.unsplash.com/1200x800/?${encoded}`;
}

function replacePollinations(content) {
    if (!content || !content.includes('pollinations.ai')) return { content, count: 0 };
    let count = 0;
    const result = content.replace(
        /!\[([^\]]*)\]\(https?:\/\/image\.pollinations\.ai\/prompt\/([^?")\s]+)[^)]*\)/g,
        (match, altText, promptRaw) => {
            const decoded = decodeURIComponent(promptRaw);
            const unsplashUrl = getUnsplashForKeywords(decoded);
            count++;
            return `![${altText}](${unsplashUrl})`;
        }
    );
    // Also catch any remaining raw pollinations URLs not inside markdown images
    const cleaned = result.replace(/https?:\/\/image\.pollinations\.ai\/[^\s)"]+/g, (url) => {
        count++;
        return topicImages.default;
    });
    return { content: cleaned, count };
}

// --- Main ---
console.log('🔍 Scanning posts.json for pollinations.ai URLs...\n');
const data = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
const posts = data.en || [];

let totalReplaced = 0;
let postsFixed = 0;

posts.forEach(post => {
    if (!post.content) return;
    const { content, count } = replacePollinations(post.content);
    if (count > 0) {
        post.content = content;
        totalReplaced += count;
        postsFixed++;
        console.log(`  ✅ Fixed ${count} image(s) in: "${post.title}"`);
    }
});

if (totalReplaced === 0) {
    console.log('✨ No pollinations.ai URLs found. posts.json is clean!');
} else {
    fs.writeFileSync(postsPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`\n🎉 Done! Replaced ${totalReplaced} pollinations.ai image(s) across ${postsFixed} post(s).`);
    console.log('💾 posts.json saved successfully.');
}
