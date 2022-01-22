const express = require("express");
const { MongoClient } = require("mongodb");
const client = new MongoClient(
  "mongodb+srv://aadhil:aadhil%40123@cluster0.hjc4l.mongodb.net/test"
);

client.connect().then((a) => console.log("connection established"));

const db = client.db("SurgePOC");
const userCollection = db.collection("Users");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const fullName = req.body.fullName;
  const email = req.body.email;

  console.log("Username : ", username);
  console.log("Password : ", password);
  console.log("fullName : ", fullName);
  console.log("email : ", email);

  const userObj = req.body;

  userCollection.insertOne(userObj, function (err, response) {
    if (err) {
      console.log("Error : ", err);
      res.send({ message: "Failed" });
    } else {
      console.log("Res: ", response);
      res.send({ message: "Success" });
    }
  });
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log("Username : ", username);
  console.log("Password : ", password);

  const userDetail = await getUserDetail(username, password);
  console.log(userDetail);
  if (userDetail) {
    res.send({ data: userDetail, message: "Success" });
  } else {
    res.send({ message: "Failed" });
  }
});

app.listen(3001, () => {
  console.log("Running server");
});

const getUserDetail = async (username, password) => {
  const userDetail = await userCollection.findOne({
    username: username,
    password: password,
  });

  return userDetail;
};
