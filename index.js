import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "";
const yourPassword = "";
const yourAPIKey = "";
const yourBearerToken = "";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + 'random');
    // console.log(result.data);
    // const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: JSON.stringify(result.data)})
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
   try {
    const result = await axios.get(API_URL + "all?page=2", 
    {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    console.log(JSON.stringify(result.data));
    res.render('index.ejs', { content: JSON.stringify(result.data)})
   } catch (error) {
    res.status(404).send(error.message);
   }
});

app.get("/apiKey", async (req, res) => {
  try {
    const result = await axios.get(API_URL + 'filter',
    {
      params: {
        emScore: 2,
        apiKey: yourAPIKey
      }
    });

    res.render('index.ejs', { content: JSON.stringify(result.data)})
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get(API_URL + 'secrets/42', {
      headers: { 
        Authorization: `Bearer ${yourBearerToken}` 
      },
    });
    
    res.render('index.ejs', {
      content: JSON.stringify(result.data)
    })

  } catch (error) {
    res.status(404).send(error.message)
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
