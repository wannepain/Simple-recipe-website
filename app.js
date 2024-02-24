import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
// const config = 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.render("index.ejs")
})
//when a user makes a post request, fetch a recipe 
app.post("/recipe", async (req, res)=>{
    console.log(req.body.input);
    let userInput = req.body.input;
    try {
        let response = await axios.get("https://api.edamam.com/api/recipes/v2", {
            params: {
                type: "public",
                app_id: "0db26880",
                app_key: "467e7616fb48e52b6f2d89d4a0825e4b",
                q: userInput.toLowerCase()
            }   
        });
        // let randomRec = ;
        let randomNum = Math. round(Math. random()*19)
        res.render("index.ejs", {randomRec: response.data.hits[randomNum], userInput: userInput});
        console.log(response.data.hits.length, randomNum)
    } catch (error) {
        console.log(error.response.data);
    }
})

app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`);
})