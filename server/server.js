// Load .env
require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/home.routes");

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/checkout", router);

const CONNECTION_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connect`));
// const express = require("express");
// const router = require("./routes/home.routes");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();
// const port = 8000;

// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use("/checkout", router);
// app.listen(port, () => {
//   console.log(`Listening on Port ${port}`);
// });
