const puppeteer = require('puppeteer');

const launch = async () => {
    const browser = await puppeteer.launch({
        devtools: false,
        defaultViewport: { // --window-size in args
            width: 1280,
            height: 882
        },
        args: [
            '--no-sandbox',
            '--proxy-server="direct://"',
            '--proxy-bypass-list=*',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-2d-canvas-clip-aa',
            '--disable-gl-drawing-for-tests',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu',
            '--disable-canvas-aa',
            '--use-gl=swiftshader',
            '--enable-webgl',
            '--user-data-dir=./chromeData'
        ]
    });

    const page = await browser.newPage();

    // ignore specific resources
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
            req.abort();
        } else {
            req.continue();
        }
    });

    return {
        browser: browser,
        page: page
    };
};

exports.marketCondition = async () => {
    const pup = await launch();
    await pup.page.goto('https://www.benzinga.com/markets', {waitUntil: 'networkidle2'});

    const tickers = await pup.page.evaluate(() => {
        const marketBlocks = document.querySelectorAll('#market-overview-block > div');
        const stocks = [];
        marketBlocks.forEach((block) => {
            const ticker = block.querySelector('.market-overview-field-name').innerText;
            const closing = block.querySelector('.market-overview-field-lasttrade').innerText;
            const change = block.querySelector('.market-overview-field-changedec').innerText;
            const changePercent = block.querySelector('.market-overview-field-changeper').innerText;
            stocks.push({
                ticker: ticker,
                closing: closing,
                change: change,
                changePercent: changePercent
            });
        });
        return stocks;
    });

    pup.browser.close();

    return tickers;
};
