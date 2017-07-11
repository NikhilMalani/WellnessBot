'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function(req, res) {
    // var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "100"
    let q1 = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText;
    let q2 = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText1;
    var add = +q1 + +q2;
    var speech = add ? add : "100"
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-echo-sample'
    });
});

/*
restService.post('/slack-test', function(req, res) {

    var slack_message = {
        "text": "Details of JIRA board for Browse and Commerce",
        "attachments": [{
            "title": "JIRA Board",
            "title_link": "http://www.google.com",
            "color": "#36a64f",

            "fields": [{
                "title": "Epic Count",
                "value": "50",
                "short": "false"
            }, {
                "title": "Story Count",
                "value": "40",
                "short": "false"
            }],

            "thumb_url": "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
        }, {
            "title": "Story status count",
            "title_link": "http://www.google.com",
            "color": "#f49e42",

            "fields": [{
                "title": "Not started",
                "value": "50",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }]
        }]
    }
    return res.json({
        speech: "speech",
        displayText: "speech",
        source: 'webhook-echo-sample',
        data: {
            "slack": slack_message
        }
    });
});

*/

// bot service for health description
restService.post('/health', function(req, res) {
    // var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "100"
    let firstName = req.body.result && req.body.result.parameters && req.body.result.parameters.firstname;
    let lastName = req.body.result && req.body.result.parameters && req.body.result.parameters.lastname;
    let emailAddress = req.body.result && req.body.result.parameters && req.body.result.parameters.email;

    let q1 = req.body.result && req.body.result.parameters && req.body.result.parameters.q1;
    let q2 = req.body.result && req.body.result.parameters && req.body.result.parameters.q2;
    let q3 = req.body.result && req.body.result.parameters && req.body.result.parameters.q3;
    let q4 = req.body.result && req.body.result.parameters && req.body.result.parameters.q4;
    let q5 = req.body.result && req.body.result.parameters && req.body.result.parameters.q5;
    let q6 = req.body.result && req.body.result.parameters && req.body.result.parameters.q6;
    let q7 = req.body.result && req.body.result.parameters && req.body.result.parameters.q7;
    let q8 = req.body.result && req.body.result.parameters && req.body.result.parameters.q8;
    let q9 = req.body.result && req.body.result.parameters && req.body.result.parameters.q9;
    let q10 = req.body.result && req.body.result.parameters && req.body.result.parameters.q10;
    var add = ((+q1 + +q2 + +q3 + +q4 + +q5 + +q6 + +q7 + +q8 + +q9 + +q10)/55)*100;
	var finalScore = add.toFixed(2);
    var speech = finalScore ? "Thanks " + firstName + "! Your wellness score out of 100 is " + finalScore + ". Please check your inbox for some custom feedback - be sure to monitor your spam folder and mark as 'Not Spam'." : "Sorry, some error occurred.";
    var api_key = 'key-d84d2750326f0a79dc52b95bff98fd61';
    var domain = 'sandbox163f50fc3f2840f5a6e316f198b386e5.mailgun.org';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

    var data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'info@therapy.coach',
    subject: 'Response from '+ firstName + " "+ lastName,
    // text: 'These are the responses from ' 
    //         + "' , '"
    //         + firstName + "' , '"
    //         + lastName + "' , '" 
    //         + emailAddress + "' , '" 
    //         + q1 +"' , '"
    //         + q2 + "' , '" 
    //         + q3 + "' , '" 
    //         + q4 + "' , '" 
    //         + q5 + "' , '" 
    //         + q6 + "' , '" 
    //         + q7 + "' , '" 
    //         + q8 + "' , '" 
    //         + q9 + "' , '" 
    //         + q10+ "' , '",
    html : "<html>These are the responses. <br><br> FirstName: '"+firstName+"'<br><br>LastName: '"+lastName+"'<br><br>Email: '"+emailAddress+"'<br><br>I am physically healthy: (1) Strongly Disagree (2) Disagree (3) Neutral (4) Agree (5) Strongly Agree: '"+q1+"'<br><br>My diet/nutrient intake is balanced: (1) Strongly Disagree (2) Disagree (3) Neutral (4) Agree (5) Strongly Agree: '"+q2+"'<br><br>I take good care of myself: (1) Strongly Disagree (2) Disagree (3) Neutral (4) Agree (5) Strongly Agree: '"+q3+"'<br><br>Overall, I feel safe: (1) Strongly Disagree (2) Disagree (3) Neutral (4) Agree (5) Strongly Agree: '"+q4+"'<br><br>My work/home environments suit my needs: (1) Strongly Disagree (2) Disagree (3) Neutral (4) Agree (5) Strongly Agree: '"+q5+"'<br><br>I can love and feel loved: (1) Strongly Disagree (2) Disagree (3) Neutral (4) Agree (5) Strongly Agree: '"+q6+"'<br><br>I feel stimulated and engaged in life: (1) Strongly Disagree (2) Disagree (3) Neutral (4) Agree (5) Strongly Agree: '"+q7+"'<br><br>My daily activities are meaningful: (1) Strongly Disagree (2) Disagree (3) Neutral (4) Agree (5) Strongly Agree: '"+q8+"'<br><br>I take time to meditate and connect with nature: (1) Strongly Disagree (2) Disagree (3) Neutral (4) Agree (5) Strongly Agree: '"+q9+"'<br><br>Rate your health overall out of 10: '"+q10+"' </html>"
    };

    mailgun.messages().send(data, function (error, body) {
    console.log(body);
    });
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-echo-sample'
    });
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});