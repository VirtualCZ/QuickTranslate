const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.post("/api/translate", async (req, res) => {

//     try {
//         const { translate } = await import('@william5553/translate-google-api');
//         const translations = [];
//         const result = await translate('What time is it?', {
//             to: 'fr'
//           });
//         res.send(translations);
//         console.log(result);
//     } catch (error) {
//         console.error("Translation error:", error);
//         res.status(500).json({ error: "Translation failed" });
//     }
// });

app.post("/api/translate", async (req, res) => {
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

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
