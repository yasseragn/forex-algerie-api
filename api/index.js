HEAD
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  try {
    const response = await axios.get('http://www.forexalgerie.com/');
    const html = response.data;
    const $ = cheerio.load(html);

    const data = [];
    const rows = $('.tabCoursDevise table tr');

    rows.each((i, row) => {
      const cols = $(row).find('td');
      if (cols.length === 3) {
        const name = $(cols[0]).text().trim();
        const buy = $(cols[1]).text().trim();
        const sell = $(cols[2]).text().trim();

        if (name && buy && sell) {
          data.push({ name, buy, sell });
        }
      }
    });


const puppeteer = require('puppeteer');

module.exports = async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: 'new',
    });
    const page = await browser.newPage();
    await page.goto('http://www.forexalgerie.com/', { waitUntil: 'networkidle2' });

    const data = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('.tabCoursDevise table tr'));
      const result = [];

      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length === 3) {
          const name = cells[0].innerText.trim();
          const buy = cells[1].innerText.trim();
          const sell = cells[2].innerText.trim();
          if (name && buy && sell && name !== "Devise") {
            result.push({ name, buy, sell });
          }
        }
      });

      return result;
    });

    await browser.close();

188c3cb (install puppeteer and fix data extraction)
    const updated_at = new Date().toLocaleString('fr-DZ', {
      timeZone: 'Africa/Algiers',
      hour12: false
    });

    res.status(200).json({ updated_at, data });
 HEAD
  } catch (error) {
    res.status(500).json({ error: 'Échec du chargement des données.' });


  } catch (error) {
    res.status(500).json({ error: 'Échec du chargement via Puppeteer', details: error.message });
>>>>>>> 188c3cb (install puppeteer and fix data extraction)
  }
};
