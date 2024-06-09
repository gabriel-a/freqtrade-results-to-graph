const puppeteer = require('puppeteer');

describe('Trade Data Visualization App', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
        await page.goto('http://localhost:3000');
    });

    afterAll(async () => {
        if (page) {
            await page.close();
        }
        if (browser) {
            await browser.close();
        }
    });

    it('should load the page and display the title', async () => {
        await page.waitForSelector('h1');
        const title = await page.$eval('h1', e => e.textContent);
        expect(title).toBe('Trade Data Visualization');
    });

    it('should list available JSON files', async () => {
        await page.waitForSelector('#file-list button');
        const files = await page.$$eval('#file-list button', buttons => buttons.map(b => b.textContent));
        expect(files.length).toBeGreaterThan(0);
    });

    it('should load a file and display the chart', async () => {
        await page.waitForSelector('#file-list button');
        await page.click('#file-list button');

        await page.waitForSelector('#tradeChart');
        const chart = await page.$('#tradeChart');
        expect(chart).toBeDefined();
    });

    it('should enable the Apply Date Zoom button after selecting a file', async () => {
        await page.waitForSelector('#apply-date-zoom:not([disabled])');
        const isDisabled = await page.$eval('#apply-date-zoom', button => button.disabled);
        expect(isDisabled).toBe(false);
    });
});
