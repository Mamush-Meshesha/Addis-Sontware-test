// const mongoose = require("mongoose");
// const model = require("./models/model.js");
// const data = require("./songs.json");

// const MONGO_URL =
//   "mongodb+srv://mam1620she:Mamush12192123@cluster0.mopt8jl.mongodb.net/song_management";

// mongoose
//   .connect(MONGO_URL)
//   .then(() => {
//     console.log("connected to db");
//     // Call the Songs function here
//     Songs();
//   })
//   .catch((err) => console.log(err));

// const Songs = async () => {
//   try {
//     const addSong = await model.insertMany(data);
//     console.log("success");
//   } catch (error) {
//     console.log(error);
//   }
// };
