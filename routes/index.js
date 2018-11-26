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
  const resolves = await Promise.all(rrtypes.map(async rrtype => {
    try {
      const records = await dnsPromises.resolve(req.params.ip, rrtype)
      return { records, rrtype }
    } catch (error) {
      console.log(error)
      return { records: "NO RECORD FOUND", rrtype }
    }
  }))
  res.send(resolves)
})

module.exports = router;
