const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
//const host = "0.0.0.0";
const PORT = process.env.PORT || 30068;
const url = 'mongodb://127.0.0.1:27017'
const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));
mongoose.connect(
 process.env.MONGODB_URI || "mongodb://localhost/budget",{
   useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(err=>console.log("CONNECTION ERROR: ",err))

// routes
app.use(require("./routes/api.js"));



app.listen(PORT,() => {
  console.log(`App running on port ${PORT}!`);
});