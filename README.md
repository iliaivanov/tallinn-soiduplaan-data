# Tallinn soiduplaan data fetcher
Simple node.js library to fetch Tallinn public transportation data.   

This library will fetch text-format data from soiduplaan.tallinn.ee and parse it using source javascript code (see lib/original-source).   

## Available interface

### getParsedData(forceFilesUpdate)
Main function that returns parsed data as a json.

@param _forceFilesUpdate_ *bool* wipe all cached files   
@return _Promise_ instance with json _filesContent_

## Examples

```javascript   
const tsp = require('tallinn-soiduplaan-data');

tsp.getParsedData(false).then((filesContent) => {
	console.log(filesContent);
}, (error) => {
	console.log(error);
});
```
