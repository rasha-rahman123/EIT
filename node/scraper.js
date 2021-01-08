const puppeteer = require("puppeteer");

async function scrapeArticles(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [el] = await page.$x(
    '//*[@id="root"]/div/div[4]/div/div/div[2]/div/div[9]/div[2]/article/div[2]/a'
  );
  const el_ = await el.getProperty("href");
  const elText = await el_.jsonValue();

  const [el2] = await page.$x(
    '//*[@id="root"]/div/div[4]/div/div/div[2]/div/div[9]/div[2]/article/div[1]/div[1]/a/div/h4'
  );
  const el2_ = await el2.getProperty("textContent");
  const el2Text = await el2_.jsonValue();

  const [el3] = await page.$x(
    '//*[@id="root"]/div/div[4]/div/div/div[2]/div/div[9]/div[2]/article/div[1]/div[2]/span'
  );
  const el3_ = await el3.getProperty("textContent");
  const el3Text = await el3_.jsonValue();

  const [el4] = await page.$x(
    '//*[@id="root"]/div/div[4]/div/div/div[2]/div/div[9]/div[3]/article/div[2]/a'
  );
  const el4_ = await el4.getProperty("href");
  const el4Text = await el4_.jsonValue();

  const [el5] = await page.$x(
    '//*[@id="root"]/div/div[4]/div/div/div[2]/div/div[9]/div[3]/article/div[1]/div[1]/a/div/h4'
  );
  const el5_ = await el5.getProperty("textContent");
  const el5Text = await el5_.jsonValue();

  const [el6] = await page.$x(
    '//*[@id="root"]/div/div[4]/div/div/div[2]/div/div[9]/div[3]/article/div[1]/div[2]/span'
  );
  const el6_ = await el6.getProperty("textContent");
  const el6Text = await el6_.jsonValue();

  await console.log([
    { link: elText, headline: el2Text, time: el3Text },
    { link: el4Text, headline: el5Text, time: el6Text },
  ]);
}

scrapeArticles("https://medium.com/topic/mental-health");
