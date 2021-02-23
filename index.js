const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const app = express();
var request = require("request");

var Publishable_Key =
    "pk_test_51HyzFwBYJ6atGlFKHSXnvfHr9aiXcR8vpVt3G3avkhmHi46xBoLGWoxQaLhhHEf2VGbNOk5zU5GDM6jMRgHHRJUX00Sl8yrH9E";

const stripe = require("stripe")(
    "sk_test_51HyzFwBYJ6atGlFKsB9dKGrzhfhQLHuFlEgYn9adQveF0qt5FiFfyBQ0usRpbqblwQObcTacJxvl9dCU0prFv20L00STXu55Ov"
);

const port = 3000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("Home", {
        key: Publishable_Key,
    });
});

app.post("/success", function (req, res) {
    console.log("qetu erdh");
    res.status(200).json({
        message: "Qetu erdh",
    });
});

app.listen(port, function (error) {
    if (error) throw error;
    console.log("Server created Successfully");
});
