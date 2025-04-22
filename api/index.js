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

    const updated_at = new Date().toLocaleString('fr-DZ', {
      timeZone: 'Africa/Algiers',
      hour12: false
    });

    res.status(200).json({ updated_at, data });
  } catch (error) {
    res.status(500).json({ error: 'Échec du chargement des données.' });
  }
};
