var express = require('express');
var execa = require('execa');
var dns = require('dns');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dig/:url', async(req, res) => {
  const result = await execa.shell('dig ' + req.params.url)
  res.send(result.stdout)
})

router.get('/lookup/:url', async(req, res) => {
  dns.lookup(req.params.url, {all: true} ,(err, addresses) => {
    res.send(addresses)
  });
})

router.get('/reverse/:ip', async(req, res) => {
  dns.reverse(req.params.ip, {all: true} ,(err, hostnames) => {
    res.send(JSON.stringify(hostnames, null, 2))    
  });
})

module.exports = router;
