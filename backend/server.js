const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors");
const mongoose = require("mongoose");
const seeder = require("./seeder.js");
const Song = require("./models/model.js");
const app = express();
const upload = require("./multer.js");
const cloudinary = require("./cloudinary.js");
const fs = require("fs");
const MONGO_URL = process.env.MONGO_URL

const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send({
    message:
      "hello world, docker is on, but without node modules and lot aupdate",
  });
});

app.post("/upload", upload.array("file"), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, "file");

  if (req.method === "POST") {
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    res.status(200).json({ message: "success", data: urls });
  } else {
    res.status(400).json({ message: "error uploading audio" });
  }
});

// create song
app.post("/songs", async (req, res) => {
  const song = new Song({
    Title: req.body.title,
    Artist: req.body.artist,
    Genres: req.body.genres,
    Album: req.body.album,
    Duration: req.body.duration,
    file: req.body.file,
  });
  try {
    await song.save();
    res.status(200).json(song);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/genres", async (req, res) => {
  try {
    const genres = req.query.genres;

    const genresList = genres.split(",");
    const songs = await Song.find({ Genres: { $in: genresList } });

    const totalSong = songs.length;

    const response = {
      songs,
      totalSong,
    };
    res.json(response);
  } catch (error) {
    console.log("error fetching generes song", error);
  }
});

app.get("/album", async (req, res) => {
  try {
    const album = req.query.album;
    const albumList = album.split(",");
    const songs = await Song.find({ Album: { $in: albumList } });

    const totalSong = songs.length;
    const response = {
      totalSong,
      songs,
    };
    res.status(200).json(response);
  } catch (error) {
    console.log("error fetching albums", error);
    res.status(500).json({ error: "Error fetching albums" });
  }
});

app.get("/artist", async (req, res) => {
  try {
    const artist = req.query.artist;
    const artistList = artist.split(",");

    // Retrieve songs by the given artists
    const songs = await Song.find({ Artist: { $in: artistList } });
    const totalSong = songs.length;

    // Aggregate to get album counts per artist
    const artistAlbumCountsAggregation = await Song.aggregate([
      {
        $match: { Artist: { $in: artistList } },
      },
      {
        $group: {
          _id: "$Artist",
          uniqueAlbums: { $addToSet: "$Album" },
        },
      },
      {
        $project: {
          _id: 0,
          Artist: "$_id",
          albumCount: { $size: "$uniqueAlbums" },
        },
      },
    ]);

    // Prepare the final response
    const response = {
      songs,
      totalSong,
      artistAlbumCounts: artistAlbumCountsAggregation,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log("error retrieving artists", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// app.get("/artist", async (req, res) => {
//   try {
//     const artist = req.query.artist;

//     const artistList = artist.split(",");
//     const songs = await Song.find({ Artist: { $in: artistList } });
//     const totalSong = songs.length;

//     const artistAlbumCounts = await Song.aggregate([
//       {
//         $group: {
//           _id: "$Artist",
//           albumCount: { $addToSet: "$Album" },
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     const response = {
//       songs,
//       totalSong,
//       artistAlbumCounts,
//     };
//     res.status(200).json(response);
//   } catch (error) {
//     console.log("error retriving artists", error);
//   }
// });

app.put("/update/:id", async (req, res) => {
  const { Title, Artist, Album, Genres, file, Duration } = req.body;

  try {
    const updateSong = await Song.findById(req.params.id);

    if (updateSong) {
      updateSong.Title = Title;
      updateSong.Artist = Artist;
      updateSong.Genres = Genres;
      updateSong.Album = Album;
      updateSong.file = file;
      updateSong.Duration = Duration;

      const updated = await updateSong.save();
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: "Song not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    await Song.deleteOne({ _id: song.id });
    res.status(200).json({ message: "Song removed successfully" });
  } catch (error) {
    console.error("Error deleting song:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/single/:_id", async (req, res) => {
  const song = await Song.findById(req.params._id);
  res.status(200).json(song);
});

app.get("/songs", async (req, res) => {
  try {
    const { page = 1, pageSize = 5, search } = req.query;

    const query = search ? { title: { $regex: new RegExp(search, "i") } } : {};

    const songs = await Song.find(query)
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));

    res.json(songs);
  } catch (error) {
    console.log(error);
  }
});

app.get("/overview", async (req, res) => {
  try {
    const totalSong = await Song.countDocuments();
    const totalArtist = await Song.distinct("Artist").then(
      (artists) => artists.length
    );
    const totalAlbum = await Song.distinct("Album").then(
      (albums) => albums.length
    );
    const totalGenres = await Song.distinct("Genres").then(
      (genres) => genres.length
    );

    const songsByGenres = await Song.aggregate([
      { $group: { _id: "$Genres", count: { $sum: 1 } } },
    ]);
    const songSByArtist = await Song.aggregate([
      {
        $group: {
          _id: "$Artist",
          count: { $sum: 1 },
          albums: { $addToSet: "$Album" },
        },
      },
    ]);
    const songsByAlbum = await Song.aggregate([
      { $group: { _id: "$Album", count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      totalSong,
      totalAlbum,
      totalArtist,
      totalGenres,
      songSByArtist,
      songsByAlbum,
      songsByGenres,
    });
  } catch (error) {
    console.log(error);
  }
});

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
