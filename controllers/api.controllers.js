import SibApiV3Sdk from 'sib-api-v3-sdk';


SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = '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';

new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({

    "sender": { "email": "sendinblue@sendinblue.com", "name": "Sendinblue" },
    "subject": "This is my default subject line",
    "htmlContent": "<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>",
    "params": {
        "greeting": "This is the default greeting",
        "headline": "This is the default headline"
    },
    "messageVersions": [
        //Definition for Message Version 1 
        {
            "to": [{
                    "email": "bob@example.com",
                    "name": "Bob Anderson"
                },
                {
                    "email": "anne@example.com",
                    "name": "Anne Smith"
                }
            ],
            "htmlContent": "<!DOCTYPE html><html><body><h1>Modified header!</h1><p>This is still a paragraph</p></body></html>",
            "subject": "We are happy to be working with you"
        }
    ]

}).then(function(data) {
    console.log(data);
}, function(error) {
    console.error(error);
});