/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../styled/components/Song";

interface Song {
  _id: string;
  Title: string;
  Genres: string;
  Artist: string;
  Album: string;
  Duration: string;
  file: File | null;
  totalSong: number
}
interface SongUpload {
  _id: string;
  title: string;
  genres: string;
  artist: string;
  album: string;
  duration: string;
  file: File | null;
}

export interface SongState {
  uploadedFile: File | null;
  isLoading: boolean;
  song: Song[];
  totalSong: number;
  album: Song[];
  artist: Song[];
  genres: Song[];
  selectedSongUrl: File | null;
  filteredSong: Song[];
  showPlayer: boolean;
  isHovered: boolean[];
  showUpdate: boolean[];
  isPlaying: boolean;
  currentSongIndex: number;
  duration: number;
  currentTime: number;
  error: string | null;
  isDeleted: boolean;
  total: number;
  totalAlbum: number;
  totalArtist: number;
  totalGenres: number;
  songsByArtist: Array<{ _id: string; count: number; albums: string[] }>;
}

interface SongQuery {
  searchQuery?: string;
  page?: number;
  pageSize?: number;
}

const initialState: SongState = {
  uploadedFile: null,
  isLoading: false,
  song: [],
  totalSong: 0,
  album: [],
  artist: [],
  genres: [],
  selectedSongUrl: null,
  filteredSong: [],
  showPlayer: false,
  isHovered: [],
  showUpdate: [],
  isPlaying: false,
  currentSongIndex: 0,
  duration: 0,
  currentTime: 0,
  error: null,
  isDeleted: false,
  total: 0,
  totalAlbum: 0,
  totalArtist: 0,
  totalGenres: 0,
  songsByArtist: [],
};

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    uploadSong: (state, _action: PayloadAction<FormData>) => {
      state.isLoading = true;
    },
    uploadSongSuccess: (state, action: PayloadAction<File>) => {
      state.uploadedFile = action.payload;
      state.isLoading = false;
    },
    uploadSongFailure: (state) => {
      state.isLoading = false;
    },

    // upload song
    uploadSongToCloud: (state, _action: PayloadAction<SongUpload>) => {
      state.isLoading = true;
    },
    uploadSongToCloudSuccess: (state, action: PayloadAction<Song[]>) => {
      state.song = action.payload;
      state.isLoading = false;
    },
    uploadSongToCloudFailure: (state) => {
      state.isLoading = false;
    },
    fetchSong: (state, _action: PayloadAction<SongQuery>) => {
      state.isLoading = true;
    },
    fetchSongSuccess: (state, action: PayloadAction<Song[]>) => {
      state.song = action.payload;
      state.isLoading = false;
      
    },
    fetchSongFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchSongByAlbumRequest: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    fetchSongByAlbumSuccess: (state, action: PayloadAction<Song[]>) => {
      state.album = action.payload;
      state.isLoading = false;
    },
    fetchSongByAlbumFailure: (state, action: PayloadAction<string>) => {
      (state.isLoading = false), (state.error = action.payload);
    },
    removeSongRequest: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
    },
    removeSongSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isDeleted = true;
      state.song = state.song.filter((song) => song._id !== action.payload);
    },
    removeSongFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateSongRequest: (state, _action: PayloadAction<Song>) => {
      state.isLoading = true;
    },
    updateSongSuccess: (state, action: PayloadAction<Song>) => {
      state.isLoading = false;
      state.song = state.song.map((song) =>
        song._id === action.payload._id ? action.payload : song
      );
    },
    updateSongFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    fetchSongByArtistRequest: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    fetchSongByArtistSuccess: (state, action: PayloadAction<Song[]>) => {
      state.artist = action.payload;
      state.isLoading = false;
    },
    fetchSongByArtistFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchSongByGenresRequest: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSongByGenresSuccess: (state, action: PayloadAction<Song[]>) => {
      state.genres = action.payload;
      state.isLoading = false;
    },
    fetchSongByGenresFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    fetchTotalSongRequest: (state, _action: PayloadAction) => {
      state.isLoading = true;
      state.error = null;
    },

    fetchTotalSongSuccess: (
      state,
      action: PayloadAction<
        Omit<
          SongState,
          | "isLoading"
          | "error"
          | "uploadedFile"
          | "song"
          | "selectedSongUrl"
          | "showPlayer"
          | "isHovered"
          | "showUpdate"
          | "isPlaying"
          | "currentSongIndex"
          | "duration"
          | "currentTime"
          | "isDeleted"
          | "total"
        >
      >
    ) => {
      state.total = action.payload.totalSong;
      state.totalAlbum = action.payload.totalAlbum;
      state.totalArtist = action.payload.totalArtist;
      state.totalGenres = action.payload.totalGenres;
      state.isLoading = false;
    },

    fetchTotalSongFailure: (state, action: PayloadAction<null>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //local state

    setShowPlayer: (state, action: PayloadAction<boolean>) => {
      state.showPlayer = action.payload;
    },
    setSelectedSongUrl: (state, action: PayloadAction<File | null>) => {
      console.log("on slice", action.payload);
      state.selectedSongUrl = action.payload;
    },
    setIsHovered: (state, action: PayloadAction<{ songs: Song[] }>) => {
      state.isHovered = new Array(action.payload.songs.length).fill(false);
    },
    setShowUpdate: (state, action: PayloadAction<boolean[]>) => {
      state.showUpdate = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentSongIndex: (state, action: PayloadAction<number>) => {
      state.currentSongIndex = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    resetDeletedState: (state) => {
      state.isDeleted = false;
    },
  },
});


export type { SongQuery };
export const {
  resetDeletedState,
  uploadSong,
  uploadSongSuccess,
  uploadSongFailure,
  uploadSongToCloud,
  uploadSongToCloudSuccess,
  uploadSongToCloudFailure,
  fetchSong,
  fetchSongSuccess,
  fetchSongFailure,
  fetchSongByAlbumRequest,
  fetchSongByAlbumSuccess,
  fetchSongByAlbumFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  removeSongFailure,
  removeSongRequest,
  removeSongSuccess,
  fetchSongByArtistFailure,
  fetchSongByArtistRequest,
  fetchSongByArtistSuccess,
  fetchSongByGenresFailure,
  fetchSongByGenresRequest,
  fetchSongByGenresSuccess,
  fetchTotalSongRequest,
  fetchTotalSongFailure,
  fetchTotalSongSuccess,
  setIsHovered,
  setSelectedSongUrl,
  setShowPlayer,
  setShowUpdate,
  setIsPlaying,
  setCurrentSongIndex,
  setCurrentTime,
  setDuration
} = songSlice.actions;

export default songSlice.reducer;
