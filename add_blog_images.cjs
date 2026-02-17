const fs = require('fs');
const path = require('path');

// Topic-based image mappings from Unsplash
const topicImages = {
    // Body Preservation & Health
    'chronic inflammation': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200',
    'gut microbiome': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200',
    'muscle mass': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200',
    'protein intake': 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=1200',
    'aging': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',

    // Calculators & Tools
    'sleep': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=1200',
    'ideal weight': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200',
    'water intake': 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=1200',
    'calories': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200',
    'bmi': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200',

    // Nutrition & Diet
    'intermittent fasting': 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=1200',
    'hydration': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=1200',
    'nutrition': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200',

    // Default fallback
    'default': 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=1200'
};

// Function to get relevant image based on post title/content
function getRelevantImage(post) {
    const searchText = (post.title + ' ' + post.excerpt).toLowerCase();

    for (const [topic, imageUrl] of Object.entries(topicImages)) {
        if (searchText.includes(topic)) {
            return imageUrl;
        }
    }

    return topicImages.default;
}

// Function to insert image into content after first section
// Function to insert image into content after first section
function insertImageIntoContent(content, imageUrl, altText) {
    const lines = content.split('\n');
    let insertIndex = -1;

    // Find the first ## heading (after the main title)
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('## ') && i > 5) {
            insertIndex = i;
            break;
        }
    }

    // If no ## heading found, insert after first paragraph block
    if (insertIndex === -1) {
        for (let i = 5; i < lines.length; i++) {
            if (lines[i].trim() === '' && lines[i + 1] && lines[i + 1].trim() !== '') {
                insertIndex = i + 1;
                break;
            }
        }
    }

    if (insertIndex > 0) {
        const imageMarkdown = `\n![${altText}](${imageUrl})\n`;
        lines.splice(insertIndex, 0, imageMarkdown);
    }

    return lines.join('\n');
}

// Main function to update posts
async function addImagesToAllPosts() {
    const postsPath = path.join(__dirname, 'src', 'data', 'posts.json');
    const postsData = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

    let updatedCount = 0;

    // Process each language
    for (const lang in postsData) {
        const posts = postsData[lang];

        posts.forEach(post => {
            // Skip if already has inline images
            if (post.content && post.content.includes('![')) {
                console.log(`Skipping "${post.title}" - already has images`);
                return;
            }

            // Get relevant image
            const imageUrl = getRelevantImage(post);
            const altText = post.imageAlt || `Illustration for ${post.title}`;

            // Insert image into content
            if (post.content) {
                post.content = insertImageIntoContent(post.content, imageUrl, altText);
                updatedCount++;
                console.log(`✅ Added image to: "${post.title}"`);
            }
        });
    }

    // Save updated posts
    fs.writeFileSync(postsPath, JSON.stringify(postsData, null, 2));
    console.log(`\n🎉 Successfully added images to ${updatedCount} blog posts!`);
}

// Run the script
addImagesToAllPosts().catch(console.error);

module.exports = { addImagesToAllPosts };
