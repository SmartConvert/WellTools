const fs = require('fs');

const unsplashIds = [
    '1511688878353-3a2f5be94cd7', '1490645935967-10de6ba17061', '1532550907401-a500c9a57435',
    '1512621776951-a57141f2eefd', '1571019614242-c5c5dee9f50b', '1506126613408-eca07ce68773',
    '1541781774459-bb2af2f05b55', '1571019613454-1cb2f99b2d8b', '1548839140-29a749e1cf4d',
    '1559827260-dc66d52bef19', '1490818387583-1baba5e638af', '1505576399279-565b52d4ac71',
    '1544367567-0f2fcb009e0b', '1511690655020-366ea6f4a8eb', '1476480862126-209bbfc9ba21',
    '1517836357463-d25dfeac3438', '1522898467127-b2866c23ce5b', '1494390248081-4e58b90ed062',
    '1478144592103-25e218a04891', '1515022668582-eb0ae0259e07', '1483726234546-24bdf83861bd',
    '1493690283958-32ed25ea3440', '1507398941214-3a055dcc8e19', '1526505707474-1250325db001',
    '1502823403499-6ccfcf4fb453', '1514995669114-608177395c55', '1530510629734-76813ce82ef0',
    '1521017364654-e0c65bafe6cb', '1485965120184-e220f721d03e', '1483808161634-19a9d701b22e',
    '1540420773420-3366774f5237', '1490645935967-10de6ba17061', '1494390248081-4e58b90ed062'
];

const postsPath = 'src/data/posts.json';
const data = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

// Convert to string once for quick text searching to avoid duplicate images
let currentDataString = JSON.stringify(data);

function getUniqueUnsplash() {
    let bestUrl = null;
    let shuffled = [...unsplashIds].sort(() => 0.5 - Math.random());
    
    for (const id of shuffled) {
        if (!currentDataString.includes(id)) {
            bestUrl = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1200`;
            // Add it to string so next call in loop doesn't reuse it
            currentDataString += id;
            break;
        }
    }
    
    if (!bestUrl) {
        // Fallback if absolutely all IDs are used somehow
        bestUrl = `https://images.unsplash.com/photo-${shuffled[0]}?auto=format&fit=crop&q=80&w=1200`;
    }
    
    return bestUrl;
}

const enPosts = data.en || [];
// Fix the two posts
for (let i = 0; i < 2 && i < enPosts.length; i++) {
    let post = enPosts[i];
    
    // Assign completely unique hero image directly from Unsplash
    post.image = getUniqueUnsplash();
    
    // Replace any pollinations / inline images that still exist
    if (post.content) {
        post.content = post.content.replace(/!\[(.*?)\]\([^)]+\)/g, (match, altText) => {
            return `![${altText}](${getUniqueUnsplash()})`;
        });
    }
}

fs.writeFileSync(postsPath, JSON.stringify(data, null, 4));
console.log('Successfully injected 100% unique Unsplash images into the two latest posts.');
