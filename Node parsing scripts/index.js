#! /usr/bin/env node

console.log('filesearch');

var fs = require('fs');

var _ = require('underscore');

var userArgs = process.argv.slice(2);

var fileName = userArgs[0];

var output = userArgs[1];

var content = fs.readFileSync(fileName).toString();

var obj = JSON.parse(content);

var keysToRemove = ["ListEntry", "LegacyUID", "NGR", "CaptureSca"];

var averageOfCoordinates = function(coordinateArray){
	var len = coordinateArray.length
	var sum = _.reduce(coordinateArray, function(accumumator, item) {
		return [accumumator[0] + item[0], accumumator[1] + item[1]];
	}, [0, 0])
	return [sum[0]/len, sum[1]/len];
};

var isMultiPolygon = function(entry){

}


var initialParse = JSON.stringify(obj, function(key, value) {
	if(key === "geometry") {
		return {"type" : "Point", 
				"coordinates" : averageOfCoordinates(value["coordinates"][0])
			}
	}
	return !_.contains(keysToRemove, key) ? value : undefined;
});

fs.writeFile(output, initialParse, function(err) {
	if(err) {
		return console.log(err);
	}

	console.log("Saved");
});