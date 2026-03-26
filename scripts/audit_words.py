import json
import re

def count_words(text):
    # Remove markdown formatting to get a cleaner word count
    text = re.sub(r'#+\s+', '', text)
    text = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', text)
    text = re.sub(r'!\[.*?\]\(.*?\)', '', text)
    text = re.sub(r'>\s*', '', text)
    text = re.sub(r'\|', '', text)
    text = re.sub(r'-', ' ', text)
    words = text.split()
    return len(words)

def audit_posts(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    posts = data.get('en', [])
    
    print(f"{'Post ID':<45} | {'Word Count':<10} | {'Status'}")
    print("-" * 75)
    
    total_expanded = 0
    for post in posts:
        count = count_words(post.get('content', ''))
        status = "[DONE] 2000+" if count >= 2000 else "[FAIL] Under 2000"
        title = post.get('title', 'No Title')[:30]
        print(f"{post['id']:<45} | {count:<10} | {status} | {title}")
        if count >= 2000:
            total_expanded += 1
            
    print("-" * 75)
    print(f"Total Posts: {len(posts)}")
    print(f"Posts > 2000 words: {total_expanded}")

if __name__ == "__main__":
    audit_posts('d:/BADISS/WellTools/src/data/posts.json')
