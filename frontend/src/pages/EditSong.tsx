/** @jsxImportSource @emotion/react */

import React, { useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSongRequest } from "../slice/SongSlice";
import { RootState } from "../store"; 
import { Grid, Pad } from "../styled/components/Add";
import { EditContainer } from "../styled/pages/HomeStyle";
import { css } from "@emotion/react";
import { useFormValidation } from "../hook/useFormValidation";
import { ToastContainer } from "react-toastify";

interface Song {
  _id: string;
  Title: string;
  Album: string;
  Genres: string;
  Artist: string;
  Duration: string;
  file: File | null;
}

const validationRules = {
  Title: (value: string) => ({
    isValid: value.length > 0,
    message: value.length > 0 ? "" : "Title is required",
  }),
  Album: (value: string) => ({
    isValid: value.length > 0,
    message: value.length > 0 ? "" : "Album is required",
  }),
  Genres: (value: string) => ({
    isValid: value.length > 0,
    message: value.length > 0 ? "" : "Genres are required",
  }),
  Artist: (value: string) => ({
    isValid: value.length > 0,
    message: value.length > 0 ? "" : "Artist is required",
  }),
  Duration: (value: string) => ({
    isValid: value.length > 0,
    message: value.length > 0 ? "" : "Duration is required",
  }),
};

const Editsong: React.FC = () => {
  const selectedSong = useSelector(
    (state: RootState) => state.song.selectedSongUrl
  ) as unknown as Song;
  const [title, setTitle] = useState(selectedSong?.Title || "");
  const [album, setAlbum] = useState(selectedSong?.Album || "");
  const [genres, setGenres] = useState(selectedSong?.Genres || "");
  const [artist, setArtist] = useState(selectedSong?.Artist || "");
  const [duration, setDuration] = useState(selectedSong?.Duration || "");
  const [file, setFile] = useState<File | null>(selectedSong?.file || null);

 const { errors, validateField, validateForm } =useFormValidation(validationRules);

  const dispatch = useDispatch();
  console.log("onselected on edit", selectedSong);

  const handleUpdateSong = () => {
    const updateSong: Song = {
      _id: selectedSong._id,
      Title: title,
      Album: album,
      Genres: genres,
      Artist: artist,
      Duration: duration,
      file: file,
    };
    const formValues = {
      Title: title,
      Album: album,
      Genres: genres,
      Artist: artist,
      Duration: duration,
    };

    if (validateForm(formValues)) {
       //@ts-expect-error-error
       dispatch(updateSongRequest(updateSong));
     }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div
      css={css`
        overflow: hidden;
      `}
    >
      <EditContainer>
        <Pad>
          <div
            css={css`
              display: flex;
              justify-content: center;
              padding: 40px 0;
              color: black;
              font-size: 30px;
              @media (max-width: 768px) {
                font-size: 20px;
                padding: 20px 0;
              }
            `}
          >
            <h1>Would you like to update a song?</h1>
          </div>
          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 8px;
            `}
          >
            <Grid>
              <div>
                <input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    validateField("Title", e.target.value);
                  }}
                  type="text"
                  placeholder="Title"
                  css={css`
                    height: 44px;
                    outline: 2px solid transparent;
                    outline-offset: 2px;
                    color: black;
                    border-radius: 6px;
                  `}
                />
                {errors.Title && (
                  <p
                    css={css`
                      color: red;
                    `}
                  >
                    {errors.Title}
                  </p>
                )}
              </div>
              <div>
                <input
                  value={album}
                  onChange={(e) => {
                    setAlbum(e.target.value);
                    validateField("Album", e.target.value);
                  }}
                  type="text"
                  placeholder="album"
                  css={css`
                    height: 44px;
                    outline: 2px solid transparent;
                    outline-offset: 2px;
                    color: black;
                    border-radius: 6px;
                  `}
                />
                {errors.Album && (
                  <p
                    css={css`
                      color: red;
                    `}
                  >
                    {errors.Album}
                  </p>
                )}
              </div>
              <div>
                <input
                  value={genres}
                  onChange={(e) => {
                    setGenres(e.target.value);
                    validateField("Genres", e.target.value);
                  }}
                  type="text"
                  placeholder="genres"
                  css={css`
                    height: 44px;
                    outline: 2px solid transparent;
                    outline-offset: 2px;
                    color: black;
                    border-radius: 6px;
                  `}
                />
                {errors.Genres && (
                  <p
                    css={css`
                      color: red;
                    `}
                  >
                    {errors.Genres}
                  </p>
                )}
              </div>
              <div>
                <input
                  value={artist}
                  onChange={(e) => {
                    setArtist(e.target.value);
                    validateField("Artist", e.target.value);
                  }}
                  type="text"
                  placeholder="Artist"
                  css={css`
                    height: 44px;
                    outline: 2px solid transparent;
                    outline-offset: 2px;
                    color: black;
                    border-radius: 6px;
                    width: 100%;
                  `}
                />
                {errors.Artist && (
                  <p
                    css={css`
                      color: red;
                    `}
                  >
                    {errors.Artist}
                  </p>
                )}
              </div>
            </Grid>
          </div>
          <div
            css={css`
              padding: 16px 19px;
              width: full;
              display: flex;
            `}
          >
            <input
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
                validateField("Duration", e.target.value);
              }}
              type="text"
              placeholder="duration"
              css={css`
                height: 44px;
                outline: 2px solid transparent;
                outline-offset: 2px;
                color: black;
                border-radius: 6px;
                width: 87%;
              `}
            />
            {errors.Duration && (
              <p
                css={css`
                  color: red;
                `}
              >
                {errors.Duration}
              </p>
            )}
          </div>
          <div
            css={css`
              padding: 16px 0;
            `}
          >
            <label
              css={css`
                width: 78%;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-left: 20px;
                border-radius: 0.5rem;
                background-color: white;
                letter-spacing: 0.025em;
                box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
                border-width: 1px;
                cursor: pointer;
              `}
            >
              <svg
                css={css`
                  width: 32px;
                  height: 32px;
                `}
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4a2 2 0 012 2v12a.5.5 0 01-1 0V6a.5.5 0 011-1h4a.5.5 0 011 1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a.5.5 0 011-1h4zm1 14a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                css={css`
                  margin-top: 8px;
                  font-size: 1rem /* 16px */;
                  line-height: 1.5rem /* 24px */;
                  color: black;
                `}
              >
                Select audio file (.mp3/ogg ...)
              </span>
              <input
                onChange={handleFileChange}
                type="file"
                className="hidden"
                accept="audio/*"
              />
            </label>
          </div>
          <div
            css={css`
              display: flex;
              gap: 40px;
              width: full;
            `}
          >
            <div>
              <button
                css={css`
                  height: 48px;
                  background-color: #1eab7a;
                  color: white;
                  border-radius: 0.375rem /* 6px */;
                  padding: 0 12px;
                  transition: transform 0.3s ease;
                  :active {
                    transform: scale(1.1);
                  }
                `}
              >
                Upload File
              </button>
            </div>
            <div
              css={css`
                width: full;
              `}
            >
              <ToastContainer />
              <button
                onClick={handleUpdateSong}
                css={css`
                  height: 48px;
                  background-color: #1eab7a;
                  color: white;
                  border-radius: 6px;
                  padding: 0 12px;

                  transition: transform 0.3s ease;
                  :active {
                    transform: scale(1.1);
                  }
                `}
              >
                upload song
              </button>
            </div>
          </div>
        </Pad>
      </EditContainer>
    </div>
  );
};

export default Editsong;
