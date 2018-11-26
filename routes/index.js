var express = require('express');
const dns = require('dns');
const dnsPromises = dns.promises;
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/lookup/:ip', async (req, res) => {
  const rrtypes = ['A', 'AAAA', 'CNAME', 'MX', 'NAPTR', 'NS', 'PTR', 'SOA', 'SRV', 'TXT']
  const resolves = await Promise.all(rrtypes.map(async rrtype => {
    try {
      const data = await dnsPromises.resolve(req.params.ip, rrtype)
      return { data, rrtype }
    } catch (error) {
      console.log(error)
      return { data: "NO RECORD FOUND", rrtype }
    }
  }))
  res.send(resolves)
})

module.exports = router;
