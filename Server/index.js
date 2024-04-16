const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post("/api/translate", async (req, res) => {
    const toLanguages = req.body.to.split(',');
    const text = req.body.text;

    try {
        const { translate } = await import('@william5553/translate-google-api');
        const translations = [];

        for (const to of toLanguages) {
            const result = await translate(text, {
                to: to.trim()
            });
            translations.push(result.text);
        }
        
        res.send({ translatedTexts: translations });
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
