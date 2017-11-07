
(async () => {
	const Crawler = require('../NodeJS-WebCrawler/lib/classes/iceberg')
	const _ = require('lodash')
	const fs = require('fs')
	// Root URL
	const url = 'http://www.insecam.org/en/byrating/'
	// Selectors and iterators
	let conf = { iteratorElement: { url: url, iterator: '?page=', maxPage: 500 }, payload: { element: 'img', attrib: 'src' } }
	const crawl = new Crawler(url)
	try{

		await crawl.start(2, conf)
		const wholeTree = crawl.treeToObject()
		//console.log(wholeTree)
		
		let payloads = _.flattenDeep(_.map(wholeTree.children, 'payload'))
		// Write the JSON to disc
		console.log(payloads)
		fs.writeFile('myjsonfile.json', JSON.stringify(payloads,null,4), 'utf8',() => {
		  return 0
		});
		
	} catch(err) {
		throw err
	}
})();