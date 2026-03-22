const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../src/data/posts.json');
const topicsPath = path.join(__dirname, 'topics.json');

let postsData = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
let topicsData = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));

let deletedCount = 0;
let resetCount = 0;

if (postsData.en) {
    // Audit all posts
    const validPosts = [];
    postsData.en.forEach(post => {
        const wordCount = (post.content || '').split(/\\s+/).length;
        if (!post.content || wordCount < 50) {
            console.log(`Deleting corrupted post: '${post.title}'`);
            deletedCount++;
            
            // Search for the corresponding topic in topics.json and reset it
            const matchedTopic = topicsData.topics.find(t => 
                t.title.toLowerCase().includes(post.title.toLowerCase()) || 
                post.title.toLowerCase().includes(t.title.toLowerCase())
            );
            
            if (matchedTopic) {
                matchedTopic.completed = false;
                delete matchedTopic.completedDate;
                resetCount++;
            }
        } else {
            validPosts.push(post);
        }
    });

    postsData.en = validPosts;
}

if (deletedCount > 0) {
    fs.writeFileSync(postsPath, JSON.stringify(postsData, null, 4), 'utf8');
    fs.writeFileSync(topicsPath, JSON.stringify(topicsData, null, 4), 'utf8');
}

console.log(`\\nSuccessfully deleted ${deletedCount} corrupted posts.`);
console.log(`Successfully reset ${resetCount} topics in the queue for regeneration.`);
