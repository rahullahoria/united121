
//var http = require('http');
var request = require('request');


export const getFaceId = function (faceUrl) {
    var t = -1;
    request('http://jessica.livechek.com/api/find_face/?faceUrl='+encodeURIComponent(faceUrl), function (error, response, body) {
     // console.log('error:', error); // Print the error if one occurred and handle it
      console.log('body:',body); // Print the response status code if a response was received
      t = body;
    });

    console.log("t:========>",t);
    return t;

}
