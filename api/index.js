const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async (req, res) => {
  try {
    const url = "http://www.forexalgerie.com/";
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const result = [];

    $("table tr").each((i, row) => {
      const tds = $(row).find("td");
      if (tds.length >= 3) {
        const name = $(tds[0]).text().trim();
        const buy = $(tds[1]).text().trim();
        const sell = $(tds[2]).text().trim();
        result.push({ name, buy, sell });
      }
    });

    res.status(200).json({
      updated_at: new Date().toLocaleString("fr-FR", { timeZone: "Africa/Algiers" }),
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: "فشل في جلب البيانات", message: error.message });
  }
};
