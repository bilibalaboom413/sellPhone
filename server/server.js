// Load .env
// require("dotenv").config();
// const express = require("express");
// const path = require("path");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const router = require("./routes/home.routes");

// const app = express();

// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors());
// app.use("/", router);

// const CONNECTION_URL = process.env.MONGO_URL;
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//         console.log(`Listening on Port http://localhost:${PORT}`);
//     })
//     mongoose
//       .connect(CONNECTION_URL)
//       .then(() =>
//         app.listen(PORT, () =>
//           console.log(`Server Running on Port: `)
//         )
//       )
//       .catch((error) => console.log(`${error} did not connect`));

const express = require("express");
const router = require("./routes/home.routes");

const app = express();
const port = 8000;

app.use("/", router);
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

// Routes
// app.get("/helloworld", (req, res) => {
//   res.send({ express: "Your express backend is connected to react." });
// });

// module.exports = app;
