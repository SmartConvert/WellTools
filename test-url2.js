import https from 'https';

const urls = [
    "https://pollinations.ai/p/blue%20cat",
    "https://image.pollinations.ai/prompt/blue%20cat"
];

let i = 0;
function testNext() {
    if (i >= urls.length) process.exit(0);
    const url = urls[i++];
    console.log(`Testing: ${url}`);
    https.get(url, (res) => {
        console.log(`  -> Status Code: ${res.statusCode}`);
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            console.log(`  -> Redirects to: ${res.headers.location}`);
        }
        testNext();
    }).on('error', (e) => {
        console.error(`  -> Error: ${e.message}`);
        testNext();
    });
}
testNext();
