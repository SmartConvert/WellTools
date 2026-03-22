const fs = require('fs');
const path = require('path');

// 1. Delete Affiliate files
try { fs.unlinkSync('src/components/AffiliateBlock.jsx'); console.log('Deleted AffiliateBlock.jsx'); } catch(e){}
try { fs.unlinkSync('src/data/affiliateProducts.json'); console.log('Deleted affiliateProducts.json'); } catch(e){}

// 2. Remove AffiliateBlock imports and JSX tags from all components
const componentsDir = 'src/components';
const files = fs.readdirSync(componentsDir);

files.forEach(file => {
    if(file.endsWith('.jsx')) {
        const filePath = path.join(componentsDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        // Remove import
        content = content.replace(/import\s+AffiliateBlock\s+from\s+['"]\.\/AffiliateBlock['"];?\s*\n?/g, '');
        
        // Remove JSX `<AffiliateBlock ... />`
        content = content.replace(/\s*<AffiliateBlock[^>]*\/?>/g, '');
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content);
            console.log('Cleaned affiliate code from: ' + file);
        }
    }
});

// Also check and clean EditorialPolicyPage.jsx since it mentions Affiliate Links
const editorialPath = path.join(componentsDir, 'EditorialPolicyPage.jsx');
if (fs.existsSync(editorialPath)) {
    let content = fs.readFileSync(editorialPath, 'utf8');
    content = content.replace(/<li>\s*<strong>Affiliate Links:[^<]*<\/li>/g, '');
    fs.writeFileSync(editorialPath, content);
}

console.log('Affiliate cleanup complete.');
