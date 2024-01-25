const express = require('express');
const axios = require('axios');

const tvRouter = express.Router();

const getTvData = async () => {
    try {
        const response = await axios.get('http://fs1.co.il/bus/tv.php');
        return response.data
    }
    catch {
        return [];
    }
}

tvRouter.get('/', async (req, res) => {
    const tvData = await getTvData();
    if (tvData.length > 0){
        res.json(tvData);
    }
    else {
        res.status(404).send('No Shows Found');
    }
});

tvRouter.get('/search', async (req, res) => {
    const tvData = await getTvData();
    const search = req.query.s.toLowerCase();
    const results = tvData.filter((show) =>
      show.name?.toLowerCase().includes(search) ||
      show.genere?.toLowerCase().includes(search) ||
      show.descrption?.toLowerCase().includes(search)
    );
    if (results.length > 0){
        res.json(results);
    }
    else {
        res.status(404).send('Show not found');
    }
  });

  tvRouter.get('/single/:index', async (req, res) => {
    const tvData = await getTvData();
    const index = parseInt(req.params.index);
    const show = tvData[index];
    if (show) {
      res.json(show);
    } else {
      res.status(404).send('Show not found');
    }
  });

module.exports = tvRouter;
