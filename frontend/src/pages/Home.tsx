/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Player from "../components/Player";
import {
  fetchSong,
  fetchTotalSongRequest,
  setIsPlaying,
  setSelectedSongUrl,
} from "../slice/SongSlice";
import { Container } from "../styled/pages/HomeStyle";
import { RootState, AppDispatch } from "../store";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { ClipLoader } from "react-spinners";
import { FaPlay } from "react-icons/fa";
import { removeSongRequest } from "../slice/SongSlice";
import { EachSong, Head } from "../styled/components/Song";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface songDetail {
  _id: string;
  Title: string;
  Genres: string;
  Artist: string;
  Album: string;
  Duration: string;
  file: File | null;
}

const Home: React.FC = () => {
  const songs = useSelector((state: RootState) => state.song.song || []);
  const totalSong = useSelector((state: RootState) => state.song.total);
  const selectedSongUrl = useSelector(
    (state: RootState) => state.song.selectedSongUrl
  );
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.song.isLoading);
  const error = useSelector((state: RootState) => state.song.error);
  const [showPlayer, setShowPlayer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  useEffect(() => {
    console.log("Dispatching fetchSongs");
    dispatch(fetchSong({ searchQuery: searchTerm, page, pageSize }));
  }, [dispatch, searchTerm, page, pageSize]);

  useEffect(() => {
    dispatch(fetchTotalSongRequest());
  }, [dispatch]);
  // const handleSearch = () => {
  //   setPage(1);
  //   dispatch(fetchSong({ searchQuery: searchTerm, page: 1, pageSize }));
  // };

  const handleSongSelect = (file: File | null) => {
    console.log("Song selected:", file);
    dispatch(setSelectedSongUrl(file));
    setShowPlayer(true);
    dispatch(setIsPlaying(true));
  };
  const [isHovered, setIsHovered] = useState<boolean[]>(
    new Array(songs.length).fill(false)
  );
  const navigate = useNavigate();
  const [showList, setShowList] = useState(false);

  const showHandleUpdate = () => {
    setShowList(!showList);
  };

  const handleMouseEnter = (index: number) => {
    const newIsHovered = new Array(songs.length).fill(false);
    newIsHovered[index] = true;
    setIsHovered(newIsHovered);
  };

  const handleMouseLeave = (index: number) => {
    setIsHovered(isHovered.map((hover, i) => (i === index ? false : hover)));
  };

  const handleEditSong = (song: songDetail) => {
    if (song.file) {
      // @ts-expect-error-error
      dispatch(setSelectedSongUrl(song));
      navigate("/edit");
    } else {
      console.error("No file found for the selected song.");
    }
  };

  const handleDeleteSong = (id: string) => {
    if (window.confirm("are you sure you want to delete this song?")) {
      dispatch(removeSongRequest(id));
    }
    toast.success("successfully deleted the song");
  };
  const handlePagination = (newPage: number) => {
    setPage(newPage);
    dispatch(fetchSong({ searchQuery: searchTerm, page: newPage, pageSize }));
  };

  return (
    <div>
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
            justify-content: center; /* Centers the content horizontally */
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
            <input
              type="search"
              placeholder="Search any song"
              onChange={(e) => setSearchTerm(e.target.value)}
              css={css`
                width: 100%;
                max-width: 600px;
                height: 40px; /* Slightly increased height for better appearance */
                border-radius: 8px;
                padding-left: 25px;
                border: 2px solid #ccc; /* Initial border color */
                transition: all 0.3s ease; /* Smooth transition for focus effects */
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle initial shadow */

                &:focus {
                  border-color: #3f51b5; /* Change border color on focus */
                  box-shadow: 0 0 10px #3f51b5, 0 2px 10px rgba(0, 0, 0, 0.2); /* Glowing effect */
                  outline: none; /* Remove default outline */
                }

                &:hover {
                  border-color: #3f51b5; /* Optional: Change border color on hover */
                }

                &::placeholder {
                  color: #999; /* Placeholder text color */
                  opacity: 1; /* Ensure placeholder is visible */
                }
              `}
            />
          </div>
        </div>

        <div
          css={css`
            padding: 0 10px;
            // @media (min-width: 320px) {
            //   margin-top: 10px;
            // }
            // @media (min-width: 360px) {
            //   margin-top: 90px;
            // }

            // @media (min-width: 768px) {
            //   margin-top: 190px;
            // }
            // @media (min-width: 1280px) {
            //   margin-top: 200px;
            // }
            // @media (min-width: 1480px) {
            //   margin-top: 290px;
            // }
          `}
        >
          <div
            css={css`
              z-index: 30;
              padding: 15px;
            `}
          >
            <div
              css={css`
                display: flex;
                gap: 16px;
              `}
            >
              Total songs: {totalSong}
            </div>
            <div>
              <Head>
                <h1>Title</h1>
                <h1>artist</h1>
                <h1>genres</h1>
                <h1>album</h1>
                <h1>duration</h1>
              </Head>

              <hr
                css={css`
                  background-color: secondary;
                  overflow: hidden;
                  position: relative;
                `}
              />

              <div
                css={css`
                  color: #4a4a4a;
                  padding-bottom: 30px;
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
                ) : Array.isArray(songs) ? (
                  <div>
                    {songs.map((song: songDetail, index: number) => (
                      <div key={index}>
                        <div>
                          <span
                            css={css`
                              border: 1px;
                              border-color: #39b298;
                              display: flex;
                              gap: 12px;
                              width: full;
                              height: 80px;
                            `}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                          >
                            {isHovered[index] ? (
                              <div
                                css={css`
                                  width: 90%;
                                  position: absolute;
                                  height: 80px;
                                  border-bottom: 1px;
                                  display: flex;
                                  align-items: center;
                                  padding: 0 24px;
                                  opacity: 0.9;
                                  background-color: #4d4e4c;
                                  @media (min-width: 320px) {
                                    width: 85.7%;
                                  }
                                  @media (min-width: 360px) {
                                    width: 85.7%;
                                  }
                                  @media (min-width: 390px) {
                                    width: 85.7%;
                                  }
                                  @media (min-width: 768px) {
                                    width: 73.7%;
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
                                    onClick={() => handleSongSelect(song.file)}
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
                                      background-color: #fff;
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
                                        handleEditSong(song);
                                      }}
                                      css={css`
                                        border: 1px solid #3a3c42;
                                        border-radius: 8px;
                                        padding: 0 12px;
                                        height: 44px;
                                        background-color: #fff;
                                        color: #4a4a4a;
                                        transition: transform 0.3s ease;
                                        :active {
                                          transform: scale(1.1);
                                        }
                                      `}
                                    >
                                      <div
                                        css={css`
                                          display: flex;
                                          gap: 4px;
                                          align-items: center;
                                        `}
                                      >
                                        <FiEdit css={css``} />
                                        Edit
                                      </div>
                                    </button>
                                    <ToastContainer />
                                    <button
                                      onClick={() => handleDeleteSong(song._id)}
                                      css={css`
                                        border: 1px solid #3a3c42;
                                        border-radius: 8px;
                                        background-color: transparent;
                                        color: #4a4a4a;
                                        padding: 0 12px;
                                        height: 44px;
                                        transition: transform 0.3s ease;
                                        :active {
                                          transform: scale(1.1);
                                        }
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
                                align-items: center;
                              `}
                            >
                              {index + 1}.{" "}
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
                                    width: 40px;
                                    border-rqdius: 6px;
                                    height: 40px;
                                    border-radius: 6px;
                                    object-fit: cover;
                                  `}
                                  alt={song.Title}
                                />
                                <h1>{song.Title}</h1>
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
                                  {song.Genres}
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
                                  {song.Album}
                                </h1>
                              </div>
                              <div
                                css={css`
                                  display: flex;
                                  align-items: center;
                                  overflow: hidden;
                                `}
                              >
                                <h1>{song.Duration}</h1>
                              </div>
                            </EachSong>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <h1>No songs found</h1>
                  </div>
                )}
              </div>
              {/* padination */}
              <div
                css={css`

                      @media (min-width: 320px) {
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    // bottom: 10px;
                    z-index: 50;
                  }
                  @
                  @media (min-width: 360px) {
                    display: flex;
                    position: absolute;
                    bottom: 10px;
                    // padding: 0 10%;
                    z-index: 50;
                  }
                  @media (min-width: 428px) {
                    display: flex;
                    position: absolute;
                    bottom: 10px;
                    // padding: 0 10%;
                    z-index: 50;
                  }
                  @media (min-width: 768px) {
                    display: flex;
                    position: absolute;
                    bottom: 10px;
                    // padding: 0 20%;
                    z-index: 50;
                  }
                  @media (min-width: 884px) {
                  width: 80%;
                    display: flex;
                    position: absolute;
                    bottom: 10px;
                    // padding: 0 20%;
                    z-index: 50;
                     justify-content: space-between;
                  }
                  @media (min-width: 1280px) {
                  width: 80%;
                    display: flex;
                    flex-direction: row;
                    position: absolute;
                    bottom: 10px;
                    // padding: 0 30%;
                    z-index: 50;
                     justify-content: space-between;
                  }
                  @media (min-width: 1440px) {
                  
                    display: flex;
                    bottom: 10px;
                    // padding: 0 25%;
                    justify-content: space-between;
                  }
                `}
              >
                <div css={css``}>
                  {showPlayer && (
                    // @ts-expect-error-error
                    <Player songUrl={selectedSongUrl} />
                  )}
                </div>
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    gap: 30px;
                  `}
                >
                  <button
                    css={css`
                      border: 1px solid;
                      color: #4a4a4a;
                      border-radius: 8px;
                      :hover {
                        background-color: green;
                        color: white;
                      }
                      @media (min-width: 320px) {
                        height: 20px;
                        width: 90px;
                      }
                      @media (min-width: 360px) {
                        height: 20px;
                        width: 70px;
                      }
                      @media (min-width: 768px) {
                        height: 20px;
                        width: 70px;
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
                      color: #4a4a4a;
                      font-size: 20px;
                      @media (min-width: 768px) {
                        font-size: 15px;
                      }
                    `}
                  >
                    {page}
                  </span>
                  <button
                    css={css`
                      border: 1px solid;
                      color: #4a4a4a;
                      border-radius: 8px;
                      :hover {
                        background-color: green;
                        color: white;
                      }
                      @media (min-width: 320px) {
                        height: 20px;
                        width: 90px;
                      }
                      @media (min-width: 360px) {
                        height: 20px;
                        width: 70px;
                      }
                      @media (min-width: 768px) {
                        height: 20px;
                        width: 70px;
                      }
                    `}
                    onClick={() => handlePagination(page + 1)}
                    disabled={songs.length < pageSize}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
