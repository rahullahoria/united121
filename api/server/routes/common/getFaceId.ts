
var http = require('http');


function callback(response) {
    return response;
}
export const getFaceId = function (faceUrl) {

    var options = {
        host: 'jessica.livechek.com',
        path: '/api/find_face/?faceUrl='+encodeURIComponent(faceUrl),
        method: 'POST'
    };
    http.request(options, callback);
}
