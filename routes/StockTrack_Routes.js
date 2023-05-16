const express = require("express");
const fs = require("fs");
const router = express.Router();
const uniqid = require("uniqid");

router.use((req, res, next) => {
    next();
});

// GET command

// Get /
router.get("/", (req, res) => {
    res.send("Express Homepage");
});

// Get /allbuyindata
router.get("/allbuyindata", (req, res) => {
    let buyin_data = fs.readFileSync("data/BuyInData.json");
    let parse_buyin_data = JSON.parse(buyin_data);
    res.json(parse_buyin_data);
});

// Post /allbuyindata
router.post("/allbuyindata", (req, res) => {
    let new_data = (req.body);
    let buyin_data_data = fs.readFileSync("data/BuyInData.json");
    let parse_buyin_data_data = JSON.parse(buyin_data_data);
    parse_buyin_data_data.push(new_data);
    let stringify_buyin_data_data = JSON.stringify(parse_buyin_data_data);
    fs.writeFileSync('data/BuyInData.json', stringify_buyin_data_data);
    res.status(201).send("Created New Buy In Record Data!");
});

// Delete /allbuyindata/:buyinID
router.delete("/allbuyindata/:buyinID", (req, res) => {
    const buyinID = req.params.buyinID;
    let buyin_data_data = fs.readFileSync("data/BuyInData.json");
    let parse_buyin_data_data = JSON.parse(buyin_data_data);

    //find index of item we want to delete
    let currentBuyInData_Index = parse_buyin_data_data.findIndex(
        (buyindatarecord) => buyindatarecord.id === buyinID
    );

    //delete Item
    parse_buyin_data_data.splice(currentBuyInData_Index, 1);
    let stringify_buyin_data_data = JSON.stringify(parse_buyin_data_data);
    fs.writeFileSync("data/BuyInData.json", stringify_buyin_data_data);
    res
        .status(201)
        .json(stringify_buyin_data_data);
});

//exports the route to be used (similar to a component in react) on the server js index.js
module.exports = router;