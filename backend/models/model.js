const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Artist: {
    type: String,
    required: true,
  },
  Genres: {
    type: String,
    required: true,
  },
  Album: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    
  },
  Duration: {
    type: String,
    required: true,
  },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
