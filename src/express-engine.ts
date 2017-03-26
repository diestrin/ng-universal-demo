//hacky express wrapper thingy.

const fs = require('fs');
const path = require('path');
import {renderModule} from '@angular/platform-server';

const templateCache  = {};

export function ngExpressEngine(setupOptions){

	return function(filePath, options, callback){
		if(!templateCache[filePath]){
			let file = fs.readFileSync(filePath);
			templateCache[filePath] = file.toString();
		}
		renderModule(setupOptions.bootstrap[0], {
			document: templateCache[filePath],
			url: options.req.url
		})
		.then(string => {
			callback(null, string);
		});
	}
}
