import https from 'https';

const url = "https://pollinations.ai/p/blue%20cat?width=1200&height=630&nologo=true&seed=123&model=flux";

console.log(`Testing: ${url}`);
https.get(url, (res) => {
    console.log(`  -> Status Code: ${res.statusCode}`);
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log(`  -> Redirects to: ${res.headers.location}`);
    }
    process.exit(0);
}).on('error', (e) => {
    console.error(`  -> Error: ${e.message}`);
    process.exit(1);
});
