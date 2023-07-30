const express = require("express");
const cors = require("cors");
require("./models/connection")

const uploadRoute = require('./router/uploadRouter');
const userRouter = require("./router/userRouter.js");
const eventRouter = require("./router/eventRouter.js");
const homePageController = require("./controllers/homePageController");
const app = express();
app.use(express.json());

app.use(
    cors({
      origin: "*",
    })
);


app.use(uploadRoute);
app.use("/user", userRouter);
app.get("/", homePageController); // Display home page
app.use(eventRouter);


const PORT = 3636;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});