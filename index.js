
const Crawler = require('node-iceberg')
const _ = require('lodash')
const fs = require('fs')
// Root URL
const url = 'http://www.insecam.org/en/byrating/'
let conf = { iteratorElement: { url: url, iterator: '?page=', maxPage: 500 }, selector: { element: 'img', attrib: 'src' } }
const crawl = new Crawler(url)

crawl.start(conf).then((wholeTree) => {
  let payloads = _.flattenDeep(_.map(wholeTree.children, 'selector'))
// Write the JSON to disc
  fs.writeFile('allCameras.json', JSON.stringify(payloads,null,4), 'utf8',() => {  return 0 })
}).catch((err) => { console.error("un error ",err)})



