/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchSongByArtistRequest,
  removeSongRequest,
  setSelectedSongUrl,
  setShowPlayer,
} from "../slice/SongSlice";
import { EachSong, Head } from "../styled/components/Song";
import { Container } from "../styled/pages/HomeStyle";
import Player from "../components/Player";
import { ClipLoader } from "react-spinners";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RootState } from "../store";
import {css} from "@emotion/react"
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaPlay } from "react-icons/fa6";

interface songDetail {
  _id: string;
  Title: string;
  Genres: string;
  Artist: string;
  Album: string;
  Duration: string;
  file: File | null;
}
const ArtistDetail: React.FC = () => {
    const [showList, setShowList] = useState(false);

  const { artistName } = useParams<{ artistName: string }>();

  const artist =
    useSelector((state: RootState) => {
      //@ts-expect-error-error
      return state.song.artist.songs
    }) || [];
  const total = useSelector((state: RootState) => {
    //@ts-expect-error-error
    return state.song.artist.totalSong;
  })
  const loading = useSelector((state: RootState) => state.song.isLoading);
  const error = useSelector((state:RootState) => state.song.error)
  const showPlayer = useSelector((state: RootState) => state.song.showPlayer);
  const selectedSongUrl = useSelector(
    (state: RootState) => state.song.selectedSongUrl
  );
  const songs = useSelector((state: RootState) => {
    //@ts-expect-error-error
    return state.song.songs
  });
const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState<boolean[]>(
    new Array(artist.length).fill(false)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (artistName) {
      dispatch(fetchSongByArtistRequest(artistName));
    }
  }, [dispatch, artistName]);

  const handleSongSelect = (file: File) => {
    console.log("Song selected:", file);
    dispatch(setSelectedSongUrl(file));
    dispatch(setShowPlayer(true));
  };

  const showHandleUpdate = () => {
    setShowList(!showList);
  };
  const handleMouseEnter = (index: number) => {
    const newIsHovered = new Array(artist.length).fill(false);
    newIsHovered[index] = true;
    setIsHovered(newIsHovered);
  };

  const handleMouseLeave = (index: number) => {
    setIsHovered(isHovered.map((hover, i) => (i === index ? false : hover)));
  };

    const handleEditSong = () => {
      navigate("/edit");
    };

    const handleDeleteSong = (id: string) => {
      dispatch(removeSongRequest(id));
    };


  return (
    <Container>
      <div
        css={css`
          z-index: 30;
          top: 0;
          width: 100%;
          background-color: #e3f2fd;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <div
          css={css`
            width: 80%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;
            @media (max-width: 767px) {
              display: none;
            }
          `}
        >
          
        </div>
      </div>
      <div
        css={css`
          padding: 0 10px;
          margin-top: 10px;

          // @media (min-width: 768px) {
          //   margin-top: 190px;
          // }

          //     @media (min-width: 1280px) {
          //   margin-top: 230px;
          // }
          //   @media (min-width: 1480px) {
          //     margin-top: 290px;
          //   }
          // }
        `}
      >
        <div
          css={css`
            color: #4a4a4a;
          `}
        >
          Total songs: {total}
        </div>
        <Head>
          <h1># Title</h1>
          <h1>artist</h1>
          <h1>genres</h1>
          <h1>album</h1>
          <h1>duration</h1>
        </Head>
        <hr
          css={css`
            color: #39b298;
            background-color: secondary;
            padding: 0 48px;
          `}
        />
        <div
          css={css`
            color: #4a4a4a;
            position: relative;
          `}
        >
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
            <div>
              {artist && artist.length > 0 ? (
                artist.map((song: songDetail, index: number) => (
                  <div key={index}>
                    <div>
                      <span
                        css={css`
                          display: flex;
                          gap: 9px;
                          width: 100%;
                          height: 80px;
                        `}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                      >
                        {isHovered[index] ? (
                          <div
                            css={css`
                              position: absolute;
                              width: 97%;
                              height: 80px;
                              background-color: #4d4e4c;
                              border-bottom: 1px;
                              display: flex;
                              align-items: center;
                              padding: 0 24px;
                              opacity: 0.9;

                              @media (min-width: 320px) {
                                width: 85%;
                              }
                              @media (min-width: 451px) {
                                width: 89%;
                              }
                              @media (min-width: 640px) {
                                width: 92%;
                              }
                              @media (min-width: 768px) {
                                width: 94%;
                              }
                              @media (min-width: 1110px) {
                                width: 95%;
                              }
                              @media (min-width: 1500px) {
                                width: 96%;
                              }
                              @media (min-width: 1510px) {
                                width: 96.5%;
                              }
                            `}
                          >
                            <div
                              css={css`
                                display: flex;
                                width: 100%;
                                justify-content: space-between;
                              `}
                            >
                              <button
                                css={css`
                                  background-color: transparent;
                                  border: none;
                                  padding: 0;
                                  cursor: pointer;
                                `}
                                onClick={() =>
                                  // @ts-expect-error-error
                                  handleSongSelect(song.file)
                                }
                              >
                                <FaPlay
                                  css={css`
                                    font-size: 20px;
                                    color: green;
                                  `}
                                />
                              </button>
                              <button
                                css={css`
                                  background-color: transparent;
                                  border: none;
                                  padding: 0;
                                  cursor: pointer;
                                `}
                                onClick={showHandleUpdate}
                              >
                                <HiOutlineDotsHorizontal
                                  css={css`
                                    font-size: 20px;
                                  `}
                                />
                              </button>
                            </div>
                            {showList && (
                              <div
                                css={css`
                                  display: flex;
                                  flex-direction: column;
                                  position: absolute;
                                  top: 0;
                                  margin-top: 79px;
                                  background-color: #000;
                                  width: 100%;
                                  right: 0;
                                  border-radius: 8px;
                                  gap: 14px;
                                  padding: 20px;
                                  border: 1px solid black;
                                  @media (min-width: 320px) {
                                    width: 45%;
                                  }
                                  @media (min-width: 360px) {
                                    width: 40%;
                                  }
                                  @media (min-width: 390px) {
                                    width: 38.7%;
                                  }
                                  @media (min-width: 480px) {
                                    width: 35%;
                                  }
                                  @media (min-width: 768px) {
                                    width: 30%;
                                  }
                                  @media (min-width: 883px) {
                                    width: 20%;
                                  }
                                  @media (min-width: 1024px) {
                                    width: 15%;
                                  }
                                  @media (min-width: 1544px) {
                                    width: 10%;
                                  }
                                `}
                              >
                                <button
                                  onClick={() => {
                                    handleEditSong();
                                    //@ts-expect-error-error
                                    handleSongSelect(song);
                                  }}
                                  css={css`
                                    border: 1px solid #3a3c42;
                                    border-radius: 8px;
                                    padding: 0 12px;
                                    height: 44px;
                                  `}
                                >
                                  <div
                                    css={css`
                                      display: flex;
                                      gap: 4px;
                                      align-items: center;
                                    `}
                                  >
                                    <FiEdit
                                      css={css`
                                        color: green;
                                      `}
                                    />
                                    Edit
                                  </div>
                                </button>
                                <button
                                  onClick={() => handleDeleteSong(song._id)}
                                  css={css`
                                    border: 1px solid #3a3c42;
                                    border-radius: 8px;
                                    padding: 0 12px;
                                    height: 44px;
                                  `}
                                >
                                  <div
                                    css={css`
                                      display: flex;
                                      gap: 4px;
                                      align-items: center;
                                    `}
                                  >
                                    <MdDelete
                                      css={css`
                                        color: red;
                                        font-size: 24px;
                                      `}
                                    />
                                    Delete
                                  </div>
                                </button>
                              </div>
                            )}
                          </div>
                        ) : null}
                        <span
                          css={css`
                            display: flex;
                            gap: 8px;
                            align-items: center;
                          `}
                        >
                          {index + 1}.
                        </span>
                        <EachSong>
                          <div
                            css={css`
                              display: flex;
                              gap: 8px;
                              align-items: center;
                              width: 77%;
                              overflow: hidden;
                              height: 100%;
                            `}
                          >
                            <img
                              src="/music1.jpg"
                              css={css`
                                width: 35px;
                                border-radius: 6px;
                                height: 35px;
                                object-fit: cover;
                              `}
                              alt={song.Title}
                            />
                            <h1
                              css={css`
                                color: white;
                              `}
                            >
                              {song.Title}
                            </h1>
                          </div>
                          <div
                            css={css`
                              display: flex;
                              gap: 8px;
                              align-items: center;
                              width: 77%;
                              overflow: hidden;
                              height: 100%;
                            `}
                          >
                            <h1
                              css={css`
                                text-overflow: ellispsis;
                                white-space: nowrap;
                                overflow: hidden;
                              `}
                            >
                              {song.Artist}
                            </h1>
                          </div>
                          <div
                            css={css`
                              display: flex;
                              gap: 8px;
                              align-items: center;
                            `}
                          >
                            <h1
                              css={css`
                                text-overflow: ellispsis;
                                white-space: nowrap;
                                overflow: hidden;
                              `}
                            >
                              {song.Genres}
                            </h1>
                          </div>
                          <div
                            css={css`
                              display: flex;
                              gap: 8px;
                              align-items: center;
                            `}
                          >
                            <h1
                              css={css`
                                text-overflow: ellispsis;
                                white-space: nowrap;
                                overflow: hidden;
                              `}
                            >
                              {song.Album}
                            </h1>
                          </div>
                          <div
                            css={css`
                              display: flex;
                              gap: 8px;
                              align-items: center;
                            `}
                          >
                            <h1>{song.Duration}</h1>
                          </div>
                        </EachSong>
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div>No songs found for this artist.</div>
              )}
            </div>
          )}
        </div>
        <div
          css={css`
            position: fixed;
            bottom: 0;
            width: 86%;
            z-index: 50; /* Ensure it is above other content */
            background-color: #fff; /* Optional: Set a background color */
          `}
        >
          {showPlayer && (
            // @ts-expect-error-error
            <Player songUrl={selectedSongUrl} song={songs} />
          )}
        </div>
      </div>
    </Container>
  );
};

export default ArtistDetail;
