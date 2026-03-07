import https from 'https';

const urls = [
    "https://image.pollinations.ai/prompt/blue%20cat?width=1200&height=630&nologo=true",
    "https://image.pollinations.ai/prompt/blue%20cat?width=1200&height=630&nologo=true&seed=123",
    "https://image.pollinations.ai/prompt/blue%20cat?width=1200&height=630&nologo=true&model=flux",
    "https://image.pollinations.ai/prompt/blue%20cat?width=1200&height=630&nologo=true&seed=123&model=flux"
];

let i = 0;
function testNext() {
    if (i >= urls.length) process.exit(0);
    const url = urls[i++];
    console.log(`Testing: ${url}`);
    https.get(url, (res) => {
        console.log(`  -> Status Code: ${res.statusCode}`);
        testNext();
    }).on('error', (e) => {
        console.error(`  -> Error: ${e.message}`);
        testNext();
    });
}
testNext();
