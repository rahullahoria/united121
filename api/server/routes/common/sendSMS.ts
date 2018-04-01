
var http = require('http');


  function callback(response) {
    var str = '';
    console.log(response);
    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function(chunk) {
        str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function() {

        var textlocalResponse = str;

        
    });
}
export const sendSMS = function ( recievers, message ){
    
var options = {
    host: 'www.smsjust.com',
    path: '/blank/sms/user/urlsms.php?username=rajnish90&pass=Redhat@123&senderid=LIVCHK&dest_mobileno=' + recievers + '&msgtype=TXT&response=Y&message='+message,
    method: 'GET'
};
http.request(options, callback).end();
}

export const stringGen = function (len) {
    var text = "";
    var charset = "123456789";
    for (var i = 0; i < len; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
}