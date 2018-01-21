const https = require('https');

function callApi(query, callback) {
    let url = `https://www.sciencebase.gov/catalog/items/?q=&filter=spatialQuery=${query}&filter=tags%3DUS+Topo+Current&format=json`;
    https.get(url, (res) => {
        res.setEncoding('utf8');
        let body = '';
        res.on('data', data => {
            body += data;
        });
        res.on('end', () => {
            callback(JSON.parse(body))
        });
    });
}

function* featureGen(feats, yieldFunc, callback) {
    let i = 0
    let features = feats;
    while (i < features.length) {
        let geometry = features[i].geometry;
        yield yieldFunc(JSON.stringify(geometry), callback);
        i++;
    }
}

module.exports = function(features, callback) {
    let gen = featureGen(features, callback);
    return gen;
}