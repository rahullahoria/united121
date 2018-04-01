var nodemailer      = require('nodemailer');

function sendmail( recievers, subject, message ) {

    //var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  
    var maillist = recievers.toString();
    console.log(message, subject, recievers);
  
    var mailContent = "<center><table class='body-wrap' style='text-align:center;width:86%;font-family:arial,sans-serif;border:12px solid rgba(126, 122, 122, 0.08);border-spacing:4px 20px;'>\
            <tr><img src='https://s3.ap-south-1.amazonaws.com/lccbucket/logo.png' style='width:36%;'></tr>\
            <tr>\
                <td>\
                    <center>\
                        <table bgcolor='#FFFFFF' width='80%'' border='0'>\
                            <tbody>\
                                <tr style='text-align:center;color:#575252;font-size:14px;'>\
                                    <td>\
                                        <span><h3>"+decodeURIComponent(message)+"<h3></span>\
                                    </td>\
                                </tr>\
                            </tbody>\
                        </table>\
                    </center>\
                </td>\
            </tr>\
        </table></center>";
  
    var smtpTransport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            XOAuth2: {
                user: "no_reply@livechek.com", // Your gmail address.
                // Not @developer.gserviceaccount.com
                clientId: "418419214912-cl08oopqas4p0a2selbv5vvaoqfkvr5s.apps.googleusercontent.com",
                clientSecret: "XcUl7BEKka3xGs3WeEQMkUxr",
                refreshToken: "1/OFp2lt3Ffs0AHpHwIuzOmaM3Yisk-aa3GE10moiDg88"
            }
        }
    });
  
    var mailOptions = {
        from: "meLivemedia@noreply.com",
        // to: "ashubham.1994@gmail.com",
        to: maillist,
        subject: decodeURIComponent(subject),
        generateTextFromHTML: true,
        html: mailContent
        // attachments: [{ 'filename': req.body.randomName, 'contents': file }]
    }
  
    smtpTransport.sendMail(mailOptions, function(error, response) {
        smtpTransport.close();
    });
  }

  module.exports = sendmail;