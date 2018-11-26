var express = require('express');
var execa = require('execa');
const dns = require('dns');
const dnsPromises = dns.promises;
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

router.get('/reverse/:ip', async (req, res) => {
  const rrtypes = [ 'A', 'AAAA', 'CNAME', 'MX', 'NAPTR', 'NS', 'PTR', 'SOA', 'SRV', 'TXT']
  const resolves = await Promise.all(rrtypes.map(async rrtype => {    
    try{ 
      const data = await dnsPromises.resolve(req.params.ip, rrtype)      
      return {data, rrtype}
    }catch(error) {
      console.log(error)
    }
  }))  
  res.send(resolves)
})

module.exports = router;
