require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// [ Static ]
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));
// [ Routes ]
app.use(require("./routes"));

app.listen(process.env.PORT || port, () => {
    console.log("express listening on port", port);
});
