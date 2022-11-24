const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const mainRouter = require("./routers/mainRouter");

app.listen(port, (req, res) => {
    console.log("Server has been started");
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("images"));
app.use(express.urlencoded({extended: true}));

app.use(mainRouter);
