// server.js
import express from 'express';
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();

// Serve index.html
app.use('/', express.static(path.join(__dirname)));

// Purple ASCII banner
const asciiArt = `
__  ___              __            __   __  __     __   __         __
/  |/  /__ ___ ____ _/ /  ___ _____/ /__/ / / /__  / /  / /__  ____/ /_____ ____
/ /|_/ / -_) _ \`/ _ \`/ _ \\/ _ \`/ __/  '_/ /_/ / _ \\/ _ \\/ / _ \\/ __/  '_/ -_) __/
/_/  /_/\\__/\\_, /\\_,_/_//_/\\_,_/\\__/_/\\_\\\\____/_//_/_.__/_/\\___/\\__/_/\\_\\\\__/_/
/___/
`;
console.log(chalk.hex('#6b21a8')(asciiArt));

// Puppeteer headless browser
let browser;
async function startBrowser() {
    if (!browser) {
        browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }
    return browser;
}

// Example route
app.get('/test', (req, res) => res.send('Proxy is running!'));

// Start Puppeteer in background
startBrowser();

// Start Express server
app.listen(PORT, () => {
});
