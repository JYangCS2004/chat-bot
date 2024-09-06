const {OpenAI} = require('openai');
const Configuration = require('openai');
const express = require("express");
const cors = require("cors");
require('dotenv').config()


// const openai = new OpenAI(new Configuration({
//     apiKey: "sk-FXxS8tLaawlvYwcVUo4__BHE8SK60aAhO9gd10McbGT3BlbkFJfHEAr6hG38QPp3-4StX5XwgdERV_vvWJtD2pcpOZwA",
// }));

console.log(process.env.SECRET_KEY);

const openai = new OpenAI({
    apiKey: process.env.SECRET_KEY,
    baseURL: "https://api.aimlapi.com"
});

const app = express();
const port = 6969;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/data', async (req, res) => {
    console.log(req.body.msg);
    const msg = await onChatCompletion(req.body.msg);
    res.json({msg : msg});
});

async function onChatCompletion(input) {
    const chatCompletion = await openai.chat.completions.create({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        messages: [
          { role: "system", content: "You are a therapist. Be emphathetic and helpful" },
          { role: "user", content: input }
        ],
        temperature: 0.7,
        max_tokens: 128,
      });

      return chatCompletion.choices[0].message.content;
}

app.listen(port, () => {
    console.log('Server running on port ' + port);
})