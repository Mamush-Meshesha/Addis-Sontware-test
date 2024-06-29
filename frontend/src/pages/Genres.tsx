/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSong, fetchSongByGenresRequest } from "../slice/SongSlice";
import { AlbumStyled, Box, Pad, Placed } from "../styled/pages/AlbumStyle";
import { Container } from "../styled/pages/HomeStyle";
import { RootState } from "../store"; 
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";



const Genres: React.FC = () => {
      const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
     const [searchTerm] = useState("");
   const songs = useSelector((state: RootState) => state.song.song);
  const totalSong: number = useSelector((state: RootState) => {
  //@ts-expect-error-error
  return state.song.genres.totalSong;
});
  const loading = useSelector((state: RootState) => state.song.isLoading)
  const error = useSelector((state:RootState) =>state.song.error)
  useEffect(() => {
    localStorage.setItem("totalSong", JSON.stringify(totalSong))
  }, [totalSong])

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
  const handleGenresName = (genres: string) => {
    dispatch(fetchSongByGenresRequest(genres));
    navigate(`/genres/${genres}`);
  };

 
  const totalGenres = useSelector((state: RootState) => state.song.totalGenres);

   const uniqueGenres = Array.from(
     new Set(songs.map((song) => song.Genres))
   ).map((genres) => {
     return songs.find((song) => song.Genres === genres);
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
            Genres
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
          Total Genres: {totalGenres}
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
            {uniqueGenres.map((song, index: number) => (
              <Box
                onClick={() => handleGenresName(song!.Genres)}
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
                  >
                    {song!.Genres}
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
                      Artist:
                    </span>
                    {song!.Artist}
                  </p>
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
                      Album:
                    </span>
                    {song!.Album}
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

export default Genres;
