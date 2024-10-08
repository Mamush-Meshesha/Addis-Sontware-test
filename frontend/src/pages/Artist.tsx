/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSong, fetchSongByArtistRequest } from "../slice/SongSlice";
import { AlbumStyled, Box, Pad, Placed } from "../styled/pages/AlbumStyle";
import { useNavigate } from "react-router-dom";
import { Container } from "../styled/pages/HomeStyle";
import { RootState } from "../store"; 
import { ClipLoader } from "react-spinners";


const Artists: React.FC = () => {
    const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
   const [searchTerm] = useState("");
  const songs = useSelector((state: RootState) => state.song.song);

  const loading = useSelector((state: RootState) => state.song.isLoading)
  const error = useSelector((state:RootState) => state.song.error)
  const dispatch = useDispatch();
  const navigate = useNavigate();

useEffect(() => {
  console.log("Dispatching fetchSongs");
  dispatch(fetchSong({ searchQuery: searchTerm, page, pageSize }));
}, [dispatch, searchTerm, page, pageSize]);

  const handlePagination = (newPage: number) => {
    setPage(newPage);
    dispatch(fetchSong({ page: newPage, pageSize }));
  };
  const handleArtistName = (artist: string) => {
    dispatch(fetchSongByArtistRequest(artist));
    navigate(`/artist/${artist}`);
  };

   

  const totalArtist =useSelector((state: RootState) => state.song.totalArtist)
   const uniqueArtist = Array.from(
     new Set(songs.map((song) => song.Artist))
   ).map((artist) => {
     return songs.find((song) => song.Artist === artist);
   });
  return (
    <Container>
      <AlbumStyled>
        <Pad>
          <h1
            css={css`
              font-size: 30px;
              color: white;
            `}
          >
            Artists
          </h1>
        </Pad>
        <div
          css={css`
            display: flex;
            gap: 16px;
            color: white;
            justify-content: center;
          `}
        >
          Total Artists: {totalArtist}
        </div>
        {loading ? (
          <div
            css={css`
              display: flex;
              justify-content: center;
              padding-top: 30px;
              font-size: 50px;
              color: green;
            `}
          >
            <ClipLoader color="#36d7b7" size={50} />
          </div>
        ) : error ? (
          <div
            css={css`
              color: red;
              display: flex;
              width: 100%;
              justify-content: center;
            `}
          >
            {error}
          </div>
        ) : (
          <Placed>
            {uniqueArtist.map((song, index) => (
              <Box
                onClick={() => handleArtistName(song!.Artist)}
                key={index}
                style={{ backgroundImage: `url("/music2.jpg")` }}
              >
                <div>
                  <h1
                    css={css`
                      font-size: 24px;
                      text-transform: capitalize;
                      color: white;
                    `}
                    key={index}
                  >
                    {song!.Artist}
                  </h1>
                  <p
                    css={css`
                      font-size: 14px;
                      color: #e1e6dad5;
                      padding: 8px 0;
                    `}
                  >
                    <span
                      css={css`
                        font-size: 15px;
                        color: pink;
                        font-weight: bold;
                      `}
                    >
                      Title:
                    </span>
                    {song!.Title}
                  </p>
                </div>
              </Box>
            ))}
          </Placed>
        )}
      </AlbumStyled>
      {/* padination */}
      <div
        css={css`
                      @media (min-width: 320px) {
                    display: flex;
                    position: fixed;
                    bottom: 0;
                    z-index: 50;
                  }
                  @
                  @media (min-width: 360px) {
                    display: flex;
                    position: fixed;
                    bottom: 0;
                    padding: 0 10%;
                    z-index: 50;
                  }
                  @media (min-width: 428px) {
                    display: flex;
                    position: fixed;
                    bottom: 0;
                    padding: 0 10%;
                    z-index: 50;
                  }
                  @media (min-width: 768px) {
                    display: flex;
                    position: fixed;
                    bottom: 0;
                    padding: 0 20%;
                    z-index: 50;
                  }
                  @media (min-width: 884px) {
                    display: flex;
                    position: fixed;
                    bottom: 0;
                    padding: 0 20%;
                    z-index: 50;
                  }
                  @media (min-width: 1280px) {
                    display: flex;
                    position: fixed;
                    bottom: 0;
                    padding: 0 30%;
                    z-index: 50;
                  }
                  @media (min-width: 1440px) {
                    display: flex;
                    position: fixed;
                    bottom: 0;
                    padding: 0 25%;
                  }
                `}
      >
        <div
          css={css`
            display: flex;
            gap: 30px;
          `}
        >
          <button
            css={css`
              height: 50px;
              border: 1px solid black;
              background-color: #000;
              width: 100px;
              color: white;
              border-radius: 50%;
              :hover {
                background-color: #3a3c42;
              }
            `}
            onClick={() => handlePagination(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span
            css={css`
              display: flex;
              align-items: center;
              color: white;
              font-size: 24px;
            `}
          >
            {page}
          </span>
          <button
            css={css`
              height: 50px;
              border: 1px solid black;
              background-color: #000;
              width: 100px;
              color: white;
              border-radius: 50%;
              :hover {
                background-color: #3a3c42;
              }
            `}
            onClick={() => handlePagination(page + 1)}
            disabled={songs.length < pageSize}
          >
            Next
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Artists;
