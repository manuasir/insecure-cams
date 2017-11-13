
(async () => {
	const Crawler = require('node-iceberg')
	const _ = require('lodash')
	const fs = require('fs')
	// Root URL
	 const url = 'http://www.insecam.org/en/byrating/'
     let conf = { iteratorElement: { url: url, iterator: '?page=', maxPage: 500 }, selector: { element: 'img', attrib: 'src' } }
      const crawl = new Crawler(url)
        
	try{
		await crawl.start(conf)
        const wholeTree = crawl.treeToObject()
		
		let payloads = _.flattenDeep(_.map(wholeTree.children, 'selector'))
		// Write the JSON to disc
		fs.writeFile('allCameras.json', JSON.stringify(payloads,null,4), 'utf8',() => {
		  return 0
		});
		
	} catch(err) {
		throw err
	}
})();
