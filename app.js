const express = require("express");
const bodyParser = require("body-parser"); // parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const path = require("path");   // return the path of the file or directory
const axios = require("axios");
const PORT = process.env.PORT || 3000;

const app = express();

// Set static folder using path module to ensure the path is correct for any OS when hosting
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let receivedQuote = "";
let receivedQuoteType = "";

app.get("/", (req, res) => {
    res.render("index", { 
        quote: receivedQuote,
        type: receivedQuoteType
    });
});

app.post("/", (req, res) => {
    // console.log(req.params);
    // const parameter = req.body.param;
    const apiURL = `https://hindi-quotes.vercel.app/random/`;
    axios.get(apiURL)
        .then((response) => {
            // handle success
            receivedQuote = response.data.quote;
            receivedQuoteType = response.data.type;
            res.render("index", { 
                quote: receivedQuote,
                type: receivedQuoteType
            });
        })
        .catch((error) => {
            // handle error
            console.log(error);
        })
        .finally(() => {
            // always executed
        });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));