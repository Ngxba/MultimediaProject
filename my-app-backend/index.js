const express = require("express");
const app = express();
const port = 4001;
const axios = require("axios");
var cors = require("cors");
const imageToBase64 = require("image-to-base64");
var userService = require("./domain/services/userService");

var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

app.get("/", (req, res) => res.send("Hello World!"));

// CANNY EDGE DETECTION
app.post("/CannyEdgeDetection/handleBase64Image", async (req, res) => {
  var user_id = req.body.user_id;
  var base64Image = req.body.base64Image;
  let ret;
  try {
    ret = await axios.post("http://localhost:5000/CannyEdgeDetection", {
      base64Image: base64Image
    });
    res.send(ret.data);
  } catch {
    res.status(500).send({ error: "ket noi api fail" });
  }
});

app.post("/CannyEdgeDetection/handleURLImage", async (req, res) => {
  var URLImage = req.body.URLImage;
  var user_id = req.body.user_id;
  try {
    let base64Image = await imageToBase64(URLImage);
    let ret = await axios.post("http://localhost:5000/CannyEdgeDetection", {
      base64Image: "data:image/jpeg;base64," + base64Image
    });
    res.send(ret.data);
  } catch(err) {
    console.log(err)
    res.status(500).send({ error: "convert base 64 fail :(" });
  }
});

// USER
app.post("/api/user/signup", async (req, res) => {
  let { firstName, lastName, email, password, userPlan } = req.body;
  if(userPlan === undefined){
    userPlan = "free"
  }
  try {
    const newUser = await userService.signUp(firstName, lastName, email, password, userPlan);
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

app.post("/api/user/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const fecthedUser = await userService.signIn(email, password);
    res.json(fecthedUser);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
