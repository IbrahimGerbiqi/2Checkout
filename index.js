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

const port = process.env.PORT || 3000;

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

app.get("/success", function (req, res) {
    res.render("success");
});

app.post("/payment", function (req, res) {
    // Moreover you can take more details from user
    // like Address, Name, etc from form
    stripe.customers
        .create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken,
            name: "Ibrahim Gerbiqi",
            address: {
                line1: "Manush Berisha nr.6",
                postal_code: "20000",
                city: "Prizren",
                country: "Kosovo",
            },
        })
        .then((customer) => {
            return stripe.charges.create({
                amount: 2500,
                description: "Web Development Product",
                currency: "EUR",
                customer: customer.id,
            });
        })
        .then((charge) => {
            res.send("Success"); // If no error occurs
        })
        .catch((err) => {
            res.send(err); // If some error occurs
        });
});

app.post("/create-checkout-session1", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        customer: "cus_IaZjrypd7sq8LL",
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: "5 credits",
                    },
                    unit_amount: 1000,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: "https://example.com/success",
        cancel_url: "https://example.com/cancel",
    });

    res.json({ id: session.id });
});

app.post("/create-checkout-session2", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        customer: "cus_IaZjrypd7sq8LL",
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: "15 credits",
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: "https://example.com/success",
        cancel_url: "https://example.com/cancel",
    });

    res.json({ id: session.id });
});

app.post("/create-checkout-session3", async (req, res) => {
    // const session = await stripe.checkout.sessions.create({
    //     customer: "cus_IaZjrypd7sq8LL",
    //     payment_method_types: ["card"],
    //     line_items: [
    //         {
    //             price_data: {
    //                 currency: "eur",
    //                 product_data: {
    //                     name: "50 credits",
    //                 },
    //                 unit_amount: 3500,
    //             },
    //             quantity: 1,
    //         },
    //     ],
    //     mode: "payment",
    //     success_url: "https://example.com/success",
    //     cancel_url: "https://example.com/cancel",
    // });
    console.log("API CALLED");
    res.json({ id: session.id });
});

request(
    {
        method: "GET",
        url: "https://api.2checkout.com/rest/5.0/orders/140343459/",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Avangate-Authentication":
                "code='250589678645' date='2020-12-24 09:52:28' hash='bba65bf3f9a8d12c6d4aff7f53b480af'",
        },
    },
    function (error, response, body) {
        console.log("Status:", response);
        // console.log("Headers:", JSON.stringify(response.headers));
        console.log("Response:", body);
    }
);

app.listen(port, function (error) {
    if (error) throw error;
    console.log("Server created Successfully");
});
