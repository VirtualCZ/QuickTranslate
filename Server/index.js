const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

// const { translate } = await import('@william5553/translate-google-api');
// const result = await translate('What time is it?', {
//   to: 'fr'
// });
// console.log(result)

app.post("/api/translate", async (req, res) => {
    const { text, langs } = req.body;

    try {
        const { translate } = await import('@william5553/translate-google-api');
        const result = await translate(text, to);
        res.json({ translatedText: result });
    } catch (error) {
        console.error("Translation error:", error);
        res.status(500).json({ error: "Translation failed" });
    }
});

app.listen(3030, ()=> {
    console.log("running on port 3030");
})  