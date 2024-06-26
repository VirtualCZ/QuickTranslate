/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const app = express()

app.use(express.json());
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.post('/translate', async function(req, res) {
  const toLanguages = req.body.to;
  const text = req.body.text;
  try {
    const { translate } = await import('@william5553/translate-google-api');
    const translations = [];
    for (const lang of toLanguages) {
      // Extract text between <> and </>
      const regex = /<([^>\s]+)([^>]*)>(.*?)<\/\1>/g;
      let match;
      const translatedTexts = [];
      while ((match = regex.exec(text)) !== null) {
        // Translate the text extracted between <> and </>
        const translatedText = await translate(match[3], { to: lang });
        // Reconstruct the translated text with XML tags and attributes
        const translatedWithTag = `<${match[1]}${match[2]}>${translatedText.text}</${match[1]}>`;
        translatedTexts.push(translatedWithTag);
        console.log(translatedText)
      }
      translations.push({ language: lang, text: translatedTexts });
    }
    res.send(translations);
    console.log(translations);
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Translation failed" });
  }
});


app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
