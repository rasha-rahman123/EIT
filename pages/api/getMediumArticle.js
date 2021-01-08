import axios from 'axios';

var convert = require('xml-js')

export default async (req, res) => {
  axios('https://www.apa.org/news/psycport/psycport-rss.xml').then(data => data.data, err => console.log(err)).then(data => {

      var result1 = convert.xml2json(data, {compact: true, spaces: 4});
      res.send(result1);
  })



};
