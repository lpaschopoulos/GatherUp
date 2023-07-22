const mongoose = require("mongoose");
require ("dotenv").config();
const uri = process.env.MongoDB_URI;


main()
.then(() => console.log("Connected to database"))
.catch(err => console.log("Error connecting to the database", err));

async function main() {
  await mongoose.connect(uri);
}