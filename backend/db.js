const mongoose = require("mongoose");
const data = require("./constants");
const connection = mongoose.createConnection(process.env.DATABASE_URL);

const initialDB = async () => {
  await connection.on("open", function () {
    connection.db.listCollections().toArray((err, collectionNamesList) => {
      if (err) {
        console.log(err);
        return;
      }

      const collection = collectionNamesList.filter(
        (collectionName) => collectionName.name === "codeblocks"
      )[0];

      if (collection) {
        return;
      }

      connection.db.collection("codeblocks").insertMany(data, (err, res) => {
        if (err) throw err;
      });
    });
  });
};

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});

db.once("open", () => {
  console.log("Connected to mongoDB");
});

module.exports = initialDB;
