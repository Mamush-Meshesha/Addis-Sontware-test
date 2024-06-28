import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import Home from "./pages/Home";
import Genres from "./pages/Genres";
import Albums from "./pages/Album"; // Assuming this should be Albums instead of Album
import store from "./store";
import AlbumDetail from "./pages/AlbumDetail";
import Artists from "./pages/Artist";
import ArtistDetail from "./pages/ArtistDetail";
import GenresDetail from "./pages/GenresDetail";
import EditSong from "./pages/EditSong"; // Ensure the filename matches

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/genres/:genresName" element={<GenresDetail />} />
        <Route path="/album" element={<Albums />} />
        <Route path="/album/:albumName" element={<AlbumDetail />} />
        <Route path="/artist" element={<Artists />} />
        <Route path="/edit" element={<EditSong />} />
        <Route path="/artist/:artistName" element={<ArtistDetail />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
