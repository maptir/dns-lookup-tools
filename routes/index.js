var express = require('express');
const dns = require('dns');
const dnsPromises = dns.promises;
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'DNS Lookup tools' });
});

router.get('/lookup/:ip', async (req, res) => {
  const rrtypes = ['A', 'AAAA', 'CNAME', 'MX', 'NAPTR', 'NS', 'PTR', 'SOA', 'SRV', 'TXT']
  const types = ['IPv4', 'IPv6', 'Canonical Name', 'Mail Exchange', 
                  'Name Authority Pointer', 'Name Server', 'Pointer', 
                  'Start Of Authority', 'Service', 'Text']
  const resolves = await Promise.all(rrtypes.map(async (rrtype,index) => {
    try {
      const records = await dnsPromises.resolve(req.params.ip, rrtype)
      return { records, rrtype, type: types[index] }
    } catch (error) {
      console.log(error)
      return { records: "NO RECORD FOUND", rrtype, type: types[index] }
    }
  }))
  res.send(resolves)
})

module.exports = router;
