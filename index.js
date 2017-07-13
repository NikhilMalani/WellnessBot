'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

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
    
    var speech = finalScore ? "Thanks " + firstName + "! Your wellness score out of 100 is " + finalScore + ". Please check your inbox for some custom feedback - be sure to monitor your spam folder and please mark email as 'Not Spam'." : "Sorry, something seems to have gone wrong";

    // client mailgun key & domain name
    var api_key = 'key-dfed82d5fc390d4092d066c02542c4a5';
    var domain = 'sandbox1a6a6686cad74e5880d94f7bf969406d.mailgun.org';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

    var data = {
    from: emailAddress,
    to: 'info@therapy.coach',
    subject: 'Response from '+ firstName + " "+ lastName,
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
