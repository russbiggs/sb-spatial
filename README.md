## ScienceBase spatial querying

An experiment with spatial queries and the ScienceBase REST API.

Given a geojson feature collection returns a generator to access the each USGS Topo(s) that intersects each feature.


```js
const sb = require('./src/index.js');
const fs = require('fs');

function consoleIt(err, data) {
    console.log(data);
}

let data = fs.readFileSync('./map.geojson')
let geoData = JSON.parse(data);
let gen = sb(geoData.features, consoleIt);
gen.next().value;

```



