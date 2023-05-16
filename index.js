const express = require("express");
var cors = require("cors");
const app = express();
const StockTrack_Routes = require("./routes/StockTrack_Routes.js");

//configuration
require('dotenv').config();
const PORT = process.env.PORT || 8080;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/", StockTrack_Routes);

app.listen(PORT, function() {
    console.log(`Server is running on ${PORT}`);
})