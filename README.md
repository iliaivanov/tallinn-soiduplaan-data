# Tallinn soidunplaan data fetcher
Simple node.js library to fetch Tallinn public transportation data.   

This library will fetch text-format data from soiduplaan.tallinn.ee and parse it using source javascript code (see lib/original-source).   

## Available interface

### getCachedData()
Main function that returns parsed data as a json.

@return _Promise_ instance with json _filesContent_

### cachier.cacheDataFiles()
Fetches files from the soiduplaan.tallinn.ee and stores locally in the _cache_ directory.   

@return _Promise_ instance  

### cachier.validateFilesExists()
Check if cache files exists.   

@return _bool_

### cachier.loadCachedFiles(createIfMissing)
Load cached file content.   

@return _Promise_ instance with _cachedFilesContent_

## Examples

```javascript   
const tsp = require('tallinn-soiduplaan-data');

tsp.getCachedData().then((data) => {
    console.log(data);
    console.log(data.stops);
    console.log(data.routes);
}, (error) => {
    console.log(error);
});

tsp.cachier.loadCachedFiles(true).then((data) => {
	console.log(data);
	console.log(data.stops);
	console.log(data.routes);
}, (error) => {
	console.log(error);
});
```
