/** @jsxImportSource @emotion/react */
import React, { useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  uploadSong, uploadSongToCloud } from "../slice/SongSlice";
import { HiOutlineX } from "react-icons/hi";
import { Add, Grid, Pad } from "../styled/components/Add";
import { css } from "@emotion/react";
import { RootState } from "../store";
import { useFormValidation } from "../hook/useFormValidation";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

interface AddsongProps {
  close: () => void;
}

const validationRules = {
  title: (value: string) => ({
    isValid: value.length > 0,
    message: value.length > 0 ? "" : "Title is required",
  }),
  album: (value: string) => ({
    isValid: value.length > 0,
    message: value.length > 0 ? "" : "Album is required",
  }),
  genres: (value: string) => ({
    isValid: value.length > 0,
    message: value.length > 0 ? "" : "Genres are required",
  }),
  artist: (value: string) => ({
    isValid: value.length > 0,
    message: value.length > 0 ? "" : "Artist is required",
  }),
  duration: (value: string) => ({
    isValid: value.length > 0,
    message: value.length > 0 ? "" : "Duration is required",
  }),
};

const Addsong: React.FC<AddsongProps> = ({ close }) => {
  const [audios, setAudios] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [genres, setGenres] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [album, setAlbum] = useState<string>("");
  const dispatch = useDispatch();
  const { errors, validateField, validateForm } =
    useFormValidation(validationRules);

  const { uploadedFile } = useSelector((state: RootState) => state.song);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAudios(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!audios) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", audios);

    console.log("Dispatching uploadSong with:", formData);
    dispatch(uploadSong(formData));
   
  };

  const files =useSelector((state:RootState) => state.song.uploadedFile) || []
  //@ts-expect-error-error
  const file = files[0]?.url;
  console.log(file);
   const notify = ()=> toast("file upload isn't finished yet!")
  const handleSongUpload = () => {
    if (!uploadedFile) {
      notify()
      return
    }

    const songDetails = {
      _id: "",
      title,
      artist,
      genres,
      album,
      file: file, 
      duration,
    };
    
    const formValues = {
      title,
      album,
      genres,
      artist,
      duration,
    };

    if (validateForm(formValues)) {
      dispatch(uploadSongToCloud(songDetails));
      close();
    }
    else {
      toast.error("song validation failed")
    }
  };

 

  return (
    <div
      css={css`
        overflow: hidden;
      `}
    >
      <Add>
        <Pad>
          <div
            css={css`
              display: flex;
              justify-content: center;
              padding-top: 2.3rem;
              color: white;
              font-size: 30px;
            `}
          >
            <h1
              css={css`
                font-size: 1.25rem /* 24px */;
                @media (min-width: 768px) {
                  font-size: 1.5rem /* 24px */;
                  line-height: 2rem /* 32px */;
                }
              `}
            >
              Would you like to add a song?
            </h1>
          </div>
          <button onClick={close}>
            <HiOutlineX
              css={css`
                position: absolute;
                top: 0;
                right: 0;
                margin: 25px;
                font-size: 30px;
                color: white;
                border: 1px;
                padding: 4px;
                color: red;
                border-radius: 2px;
              `}
            />
          </button>
          <Grid>
            <div>
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  validateField("title", e.target.value);
                }}
                type="text"
                placeholder="Title"
                css={css`
                  height: 44px;
                  padding-left: 12px;
                  outline: 2px solid transparent;
                  border-radius: 6px;
                `}
              />
              {errors.title && (
                <p
                  css={css`
                    color: red;
                  `}
                >
                  {errors.title}
                </p>
              )}
            </div>
            <div>
              <input
                value={album}
                onChange={(e) => {
                  setAlbum(e.target.value);
                  validateField("album", e.target.value);
                }}
                type="text"
                placeholder="Album"
                css={css`
                  height: 44px;
                  padding-left: 12px;
                  outline: 2px solid transparent;
                  border-radius: 6px;
                `}
              />
              {errors.album && (
                <p
                  css={css`
                    color: red;
                  `}
                >
                  {errors.album}
                </p>
              )}
            </div>
            <div>
              <input
                value={genres}
                onChange={(e) => {
                  setGenres(e.target.value);
                  validateField("genres", e.target.value);
                }}
                type="text"
                placeholder="Genres"
                css={css`
                  height: 44px;
                  padding-left: 12px;
                  outline: 2px solid transparent;
                  border-radius: 6px;
                `}
              />
              {errors.genres && (
                <p
                  css={css`
                    color: red;
                  `}
                >
                  {errors.genres}
                </p>
              )}
            </div>
            <div>
              <input
                value={artist}
                onChange={(e) => {
                  setArtist(e.target.value);
                  validateField("artist", e.target.value);
                }}
                type="text"
                placeholder="Artist"
                css={css`
                  height: 44px;
                  padding-left: 12px;
                  outline: 2px solid transparent;
                  border-radius: 6px;
                `}
              />
              {errors.artist && (
                <p
                  css={css`
                    color: red;
                  `}
                >
                  {errors.artist}
                </p>
              )}
            </div>
          </Grid>
          <div
            css={css`
              padding: 20px;
            `}
          >
            <input
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
                validateField("duration", e.target.value);
              }}
              type="text"
              placeholder="Duration"
              css={css`
                height: 44px;
                padding-left: 12px;
                outline: 2px solid transparent;
                border-radius: 6px;
              `}
            />
            {errors.duration && (
              <p
                css={css`
                  color: red;
                `}
              >
                {errors.duration}
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
                width: full;
                display: flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;
                padding: 12px 24px;
                background-color: white;
                border-radius: 6px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                  0 4px 6px -2px rgba(0, 0, 0, 0.05);
                letter-spacing: 0.025em;
                text-transform: uppercase;
                border: 1px;
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
                  font-size: 14px;
                  line-height: 1.5;
                `}
              >
                Select audio file (.mp3/ogg ...)
              </span>
              <input
                type="file"
                className="hidden"
                accept="audio/*"
                onChange={handleFileChange}
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
              <ToastContainer />
              <button
                css={css`
                  height: 48px;
                  width: 120px;
                  background-color: #1eab7a;
                  color: white;
                  border-radius: 6px;
                  border: none;
                  font-size: 16px;
                  font-weight: 600;
                  cursor: pointer;
                  padding: 0 12px;
                  transition: transform 0.3s ease;
                  :active {
                    transform: scale(1.1);
                  }
                `}
                onClick={handleSubmit}
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
                css={css`
                  height: 48px;
                  width: 120px;
                  background-color: #1eab7a;
                  color: white;
                  border-radius: 6px;
                  border: none;
                  font-size: 16px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: transform 0.3s ease;
                  :active {
                    transform: scale(1.1);
                  }
                `}
                onClick={handleSongUpload}
              >
                Upload Song
              </button>
            </div>
          </div>
        </Pad>
      </Add>
    </div>
  );
};

export default Addsong;
