/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, all, put, takeLatest } from "redux-saga/effects";
import axios, {  AxiosRequestConfig, AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  uploadSongSuccess,
  uploadSongFailure,
  uploadSongToCloudSuccess,
  uploadSongToCloudFailure,
  fetchSongSuccess,
  fetchSongFailure,
  fetchSongByAlbumSuccess,
  fetchSongByAlbumFailure,
  fetchSongByAlbumRequest,
  removeSongSuccess,
  removeSongFailure,
  updateSongSuccess,
  updateSongFailure,
  fetchSong,
  // uploadSongProgress,
  fetchSongByArtistSuccess,
  fetchSongByArtistFailure,
  fetchSongByArtistRequest,
  fetchSongByGenresSuccess,
  fetchSongByGenresFailure,
  fetchSongByGenresRequest,
  fetchTotalSongSuccess,
  fetchTotalSongFailure,
} from "../slice/SongSlice";
import { toast } from "react-toastify";



interface UploadSongToAction {
  payload: {
    id: string;
    Title: string;
    Artist: string;
    Genres: string;
    Album: string;
    file: File;
    Duration: string;
  };
}

interface updateSongAction {
    payload: {
        _id: string;
        Title: string;
        Artist: string;
        Genres: string;
        Album: string;
        file: string;
        Duration: string;
    }
}

function* uploadSong(action: PayloadAction<FormData>) {
  try {

const notify = () => toast("file uploaded successfully!");
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response: AxiosResponse = yield call(
      (url: string, data: FormData, config: AxiosRequestConfig) =>
        axios.post(url, data, config),
      "https://backend-backend-t16i.onrender.com/upload",
      action.payload,
      config
    );

    console.log("Upload response:", response.data);
    yield put(uploadSongSuccess(response.data.data));
    notify()
  } catch (error: any) {
    console.error("Upload error:", error);
    yield put(uploadSongFailure(error.message));
  }
}

function* fetchSongs(action: ReturnType<typeof fetchSong>) {
  try {
    const { page, pageSize, searchQuery } = action.payload;
    console.log(action.payload)
    const apiUrl = `https://backend-backend-t16i.onrender.com/songs?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`;
    const response: AxiosResponse = yield call(axios.get, apiUrl);
    yield put(fetchSongSuccess(response.data));
    console.log(response.data)
  } catch (error: any) {
    yield put(fetchSongFailure(error.message));
  }
}

function* fetchSongsByAlbum(action: PayloadAction<string>) {
  try {
    const res: AxiosResponse = yield call(
      axios.get,
      "https://backend-backend-t16i.onrender.com/album",
      {
        params: { album: action.payload },
      }
    );
    yield put(fetchSongByAlbumSuccess(res.data));
    console.log(res.data);
  } catch (error: any) {
    yield put(fetchSongByAlbumFailure(error.message));
  }
}

function* overviewsaga() {
  try {
    const res: AxiosResponse = yield call(
      axios.get,
      "https://backend-backend-t16i.onrender.com/overview"
    );
    yield put(fetchTotalSongSuccess(res.data));
  } catch (error: any) {
   yield put(fetchTotalSongFailure)
  }
}

function* fetchSongByArtistSaga(action: PayloadAction<string>) {
  try {
    const res: AxiosResponse = yield call(
      axios.get,
      "https://backend-backend-t16i.onrender.com/artist",
      {
        params: { artist: action.payload },
      }
    );
    yield put(fetchSongByArtistSuccess(res.data));
  } catch (error: any) {
    yield put(fetchSongByArtistFailure(error.message));
  }
}

function* fetchSongByGenreSaga(action: PayloadAction<string>) {
  try {
    const res: AxiosResponse = yield call(
      axios.get,
      "https://backend-backend-t16i.onrender.com/genres",
      {
        params: { genres: action.payload },
      }
    );
    yield put(fetchSongByGenresSuccess(res.data));
  } catch (error: any) {
    yield put(fetchSongByGenresFailure(error.message));
  }
}

function* uploadSongTo(action: PayloadAction<UploadSongToAction["payload"]>) {
  try {
    const notify = () => toast("Song added successfully!");
    const res: AxiosResponse = yield call(
      axios.post,
      "https://backend-backend-t16i.onrender.com/songs",
      action.payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    yield put(uploadSongToCloudSuccess(res.data));
    notify()
  } catch (error: any) {
    yield put(uploadSongToCloudFailure(error.message));
  }
}

function* deleteSongSage(action: PayloadAction<string>) {
  try {
    const notify = () => toast("Song deleted successfully!");
    yield call(
      axios.delete,
      `https://backend-backend-t16i.onrender.com/delete/${action.payload}`
    );
    yield put(removeSongSuccess(action.payload))
    notify()
  } catch (error: any) {
    yield put(removeSongFailure(error.message));
  }
}

function* updateSongSage(action: PayloadAction<updateSongAction["payload"]>) {
  try {
    const notify = () => toast("Song updated successfully!");
    const res: AxiosResponse = yield call(
      axios.put,
      `https://backend-backend-t16i.onrender.com/update/${action.payload._id}`,
      action.payload
    );
    console.log(action.payload._id)
    yield put(updateSongSuccess(res.data));
    notify()
  } catch (error: any) {
    yield put(updateSongFailure(error.message));
  }
}

function* watchDeleteSong() {
  yield takeLatest("song/removeSongRequest", deleteSongSage);
}

function* watchFetchSongByArtist() {
  yield takeLatest(fetchSongByArtistRequest.type, fetchSongByArtistSaga);
}

function* watchUpdateSong() {
  yield takeLatest("song/updateSongRequest", updateSongSage);
}

function* watchFetchSongByGenres() {
  yield takeLatest(fetchSongByGenresRequest.type, fetchSongByGenreSaga);
}

function* watchUploadSong() {
  yield takeLatest("song/uploadSong", uploadSong);
  yield takeLatest(fetchSongByAlbumRequest.type, fetchSongsByAlbum);
}

function* watchUploadTo() {
  yield takeLatest("song/uploadSongToCloud", uploadSongTo);
}

function* watchSongFetch() {
  yield takeLatest("song/fetchSong", fetchSongs);
}

function* watchOverview() {
  yield takeLatest("song/fetchTotalSongRequest", overviewsaga);
}

export default function* rootSaga() {
  yield all([
    watchUploadSong(),
    watchUploadTo(),
    watchSongFetch(),
    watchDeleteSong(),
    watchUpdateSong(),
    watchFetchSongByArtist(),
    watchFetchSongByGenres(),
    watchOverview()
  ]);
}


