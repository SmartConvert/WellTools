const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
const postsData = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

const unsplashImages = [
    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200', // healthy food
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200', // salad
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200', // gym ropes
    'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=1200', // gym weights
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200', // yoga outdoor
    'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=1200', // sleeping
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200', // measuring tape fitness
    'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=1200', // water pouring
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=1200', // water bottle gym
    'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=1200', // healthy bowl
    'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=1200', // lifestyle wellness
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200', // gym workout
    'https://images.unsplash.com/photo-1526506114631-c42b322964fd?auto=format&fit=crop&q=80&w=1200', // woman jumping rope
    'https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&q=80&w=1200'  // fresh fruit
];

// Helper to get exactly N unique random images not matching the hero URL
function getRandomImages(count, excludeUrl) {
    const pool = unsplashImages.filter(url => url !== excludeUrl);
    const shuffled = pool.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

let modifiedCount = 0;

for (const lang in postsData) {
    postsData[lang].forEach(post => {
        if (!post.content) return;
        
        // Skip if there are already markdown images (to avoid duplicates if run multiple times)
        if (post.content.includes('![')) return;

        let lines = post.content.split('\\n');
        
        // Find H2 indices
        const h2Indices = [];
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('## ')) {
                h2Indices.push(i);
            }
        }

        // We want to insert 2 images, roughly after the 2nd H2 and 5th H2
        if (h2Indices.length >= 4) {
            const img1Index = h2Indices[1];
            const img2Index = h2Indices[Math.min(4, h2Indices.length - 1)];

            const imgUrls = getRandomImages(2, post.image);
            
            // Insert img2 first so it doesn't mess up img1Index
            lines.splice(img2Index + 1, 0, `\\n![Health and Wellness Illustration](${imgUrls[1]})\\n`);
            lines.splice(img1Index + 1, 0, `\\n![Fitness and Nutrition Illustration](${imgUrls[0]})\\n`);

            post.content = lines.join('\\n');
            modifiedCount++;
        }
    });
}

if (modifiedCount > 0) {
    fs.writeFileSync(postsPath, JSON.stringify(postsData, null, 4));
    console.log(`Successfully injected licensed Unsplash images into ${modifiedCount} posts!`);
} else {
    console.log('No posts needed image injection.');
}
