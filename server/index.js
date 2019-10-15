const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');

const proxy = express();
const port = 8080;

proxy.use(bodyParser.json());
proxy.use(bodyParser.urlencoded({extended: true}));

proxy.use(express.static(path.join(__dirname, '../')));

proxy.get('/images', (req, res)=> {
  var id = req.query.id;
  request(`http://localhost:3003/images?id=${id}`, function(error, response, body) {
      if(response.statusCode === 200) {
          res.status(200).send(body);
      }
  })
});
proxy.get('/reviews', (req, res)=> {
  var id = req.query.prod_id;
  request(`http://localhost:3004/reviews?prod_id=${id}`, function(error, response, body) {
      if(response.statusCode === 200) {
          res.status(200).send(body);
      }
  })
});
proxy.listen(port, ()=>{
  console.log('Server is running on port ', port);
});

