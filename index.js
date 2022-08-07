require ('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const { json } = require("express");
const authRoute = require("./routes/authRoute");
const flightRoute = require("./routes/flightRoute");

const app = express();

app.use(json());

app.use('/', flightRoute)
app.use("/auth", authRoute);

const port = process.env.PORT || 3000;


//connect to db
mongoose.connect(process.env.ConnectDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//Check for proper DB connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to MongoDB successfully");
});






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
