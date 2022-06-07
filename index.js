const axios = require('axios');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/search", (req, res) => {
    const data = req.body;
    console.log(data);
    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        params: { q: data.text, type: 'tracks', offset: '0', limit: '20', numberOfTopResults: '5' },
        headers: {
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
            'X-RapidAPI-Key': 'c903f70099msh988b286513ae78cp1872c4jsn0e872559cc15',

        }
    };
    axios.request(options).then(function (response) {
        console.log(response.data);
        var songs = response.data.tracks.items;
        res.send(songs);
    }).catch(function (error) {
        console.error(error);
    });
})
app.listen(process.env.PORT || 4000, () => {
    console.log(`running on port ${process.env.PORT}`);
});