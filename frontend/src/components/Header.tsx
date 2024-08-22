/** @jsxImportSource @emotion/react */
import { NavLink } from "react-router-dom";
import { IoMenuOutline } from "react-icons/io5";
import Addsong from "./AddSong";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Order, AddSongButton, SmallOrder } from "../styled/components/Header";
import { css } from "@emotion/react";
import { useDispatch } from "react-redux";
import { fetchSong } from "../slice/SongSlice";

const Header: React.FC = () => {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [searchTerm] = useState("");
  const [page] = useState(1);
  const [pageSize] = useState(5);
  const dispatch = useDispatch();
  const toggleShow = () => {
    setShowAdd(!showAdd);
    setTimeout(() => {
      dispatch(fetchSong({ searchQuery: searchTerm, page, pageSize }));
    }, 3000);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div
        css={css`
          z-index: 40;
          position: fixed;
          top: 0;

          @media (min-width: 768px) {
            width: 15%;
            height: 100%;
            border-radius: 6px;
            background-color: #e3f2fd;
            border-right: 2px solid white;
          }
        `}
      >
        {/* Icon for small devices */}
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            padding: 16px;
            @media (min-width: 768px) {
              display: none;
            }
          `}
        >
          <button
            onClick={toggleMenu}
            css={css`
              background-color: transparent;
              border: none;
              padding: 0;
              cursor: pointer;
            `}
          >
            <IoMenuOutline size={30} />
          </button>
        </div>

        {/* Menu for large devices */}
        <div
          css={css`
            display: none;

            @media (min-width: 768px) {
              display: block;
            }
          `}
        >
          <Order>
            <span
              css={css`
                height: 45px;
                display: flex;
                border-radius: 10px;
                border-top: 2px solid white;
                border-bottom: 2px solid white;
                align-items: center;
                background-color: transparent;
                transition: 2sec ease;
                &:hover,
                &:active,
                &:focus-within {
                  background-color: #fff;
                  transform: scale(1.1);
                }
              `}
            >
              <NavLink
                to="/"
                css={css`
                  font-size: 12px;
                  display: flex;

                  align-items: center;
                  text-decoration: none;
                  padding-left: 12px;
                  border: #020008;
                  border-radius: 6px;
                  @media (min-width: 640px) {
                    display: flex;
                    gap: 0.75rem;
                  }
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  css={css`
                    width: 20px;
                    height: 20px;
                  `}
                >
                  <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                  <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                </svg>
                <h1
                  css={css`
                    font-size: 18px;
                    dispaly: hidden;
                    @media (min-width: 640px) {
                      display: block;
                    }
                    @media (max-width: 979px) {
                      display: none;
                    }
                  `}
                >
                  Home
                </h1>
              </NavLink>
            </span>
            <span
              css={css`
                border-radius: 10px;
                height: 45px;
                display: flex;
                border-top: 2px solid white;
                border-bottom: 2px solid white;
                align-items: center;
                background-color: transparent;
                transition: 2sec ease;
                &:hover,
                &:active,
                &:focus-within {
                  background-color: #fff;
                  transform: scale(1.1);
                  color: black;
                }
              `}
            >
              <NavLink
                to="/artist"
                css={css`
                  font-size: 12px;
                  border: 1px;
                  display: flex;
                  align-items: center;
                  text-decoration: none;
                  padding-left: 12px;
                  border-radius: 6px;
                  @media (min-width: 640px) {
                    display: flex;
                    gap: 0.75rem;
                  }
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  css={css`
                    width: 20px;
                    height: 20px;
                  `}
                >
                  <path
                    fillRule="evenodd"
                    d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z"
                    clipRule="evenodd"
                  />
                </svg>
                <h1
                  css={css`
                    font-size: 18px;
                    dispaly: hidden;
                    @media (min-width: 640px) {
                      display: block;
                    }
                    @media (max-width: 979px) {
                      display: none;
                    }
                  `}
                >
                  Artists
                </h1>
              </NavLink>
            </span>
            <span
              css={css`
                border-radius: 10px;
                height: 45px;
                display: flex;
                border-top: 2px solid white;
                border-bottom: 2px solid white;
                align-items: center;
                background-color: transparent;
                transition: 2sec ease;
                &:hover,
                &:active,
                &:focus-within {
                  background-color: #fff;
                  transform: scale(1.1);
                  color: black;
                }
              `}
            >
              <NavLink
                to="/album"
                css={css`
                  font-size: 12px;
                  display: flex;
                  align-items: center;
                  padding-left: 12px;
                  text-decoration: none;
                  border: #020008;
                  border-radius: 6px;
                  @media (min-width: 640px) {
                    display: flex;
                    gap: 0.75rem;
                  }
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  css={css`
                    width: 20px;
                    height: 20px;
                  `}
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx={12} cy={12} r={2}></circle>
                    <circle cx={18} cy={9} r={2}></circle>
                    <path d="M15.318 3.631a9 9 0 1 0 5.368 10.736M20 9V2l2 2"></path>
                  </g>
                </svg>
                <h1
                  css={css`
                    font-size: 18px;
                    dispaly: hidden;
                    @media (min-width: 640px) {
                      display: block;
                    }
                    @media (max-width: 979px) {
                      display: none;
                    }
                  `}
                >
                  Albums
                </h1>
              </NavLink>
            </span>
            <span
              css={css`
                border-radius: 10px;
                border-top: 2px solid white;
                border-bottom: 2px solid white;
                height: 45px;
                display: flex;
                align-items: center;
                padding-left: 12px;
                background-color: transparent;
                transition: 2sec ease;
                &:hover,
                &:active,
                &:focus-within {
                  background-color: #fff;
                  transform: scale(1.1);
                  color: black;
                }
              `}
            >
              <NavLink
                to="/genres"
                css={css`
                  font-size: 12px;
                  display: flex;
                  align-items: center;
                  text-decoration: none;
                  border-radius: 6px;
                  @media (min-width: 640px) {
                    display: flex;
                    gap: 0.75rem;
                  }
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  css={css`
                    width: 28px;
                    height: 28px;
                  `}
                >
                  <path
                    fill="currentColor"
                    d="M10.072 17.692q1.12 0 1.909-.785T12.769 15V7.846h2.077q.31 0 .54-.221t.23-.548q0-.31-.23-.54t-.54-.23h-2.192q-.31 0-.54.23t-.23.54v5.938q-.388-.315-.85-.511q-.463-.196-.957-.196q-1.122 0-1.907.784t-.785 1.903t.784 1.909t1.903.788M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.708-3.51t1.924-2.859t2.856-1.925T11.997 3t3.51.708t2.859 1.924t1.925 2.856t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                  ></path>
                </svg>
                <h1
                  css={css`
                    font-size: 20px;
                    dispaly: hidden;
                    @media (min-width: 640px) {
                      display: block;
                    }
                    @media (max-width: 979px) {
                      display: none;
                    }
                  `}
                >
                  Genres
                </h1>
              </NavLink>
            </span>
            <span
              onClick={toggleShow}
              css={css`
                border-radius: 10px;
                border-top: 2px solid white;
                border-bottom: 2px solid white;
                height: 45px;
                display: flex;
                align-items: center;
                padding-left: 12px;
                background-color: transparent;
                transition: 2sec ease;
                &:hover,
                &:active,
                &:focus-within {
                  background-color: #fff;
                  transform: scale(1.1);
                  color: black;
                }
              `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                css={css`
                  width: 28px;
                  height: 28px;
                `}
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
              <AddSongButton
                onClick={toggleShow}
                css={css`
                  dispaly: hidden;
                  font-size: 20px;
                  color: #6209bf;
                  @media (min-width: 640px) {
                    display: block;
                  }
                  @media (max-width: 979px) {
                    display: none;
                  }
                `}
              >
                Add Song
              </AddSongButton>
            </span>
          </Order>
        </div>

        {/* Menu for small devices */}
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ y: -100 }} // Start off-screen
            animate={{ y: 0 }} // Animate to visible position
            exit={{ y: -100 }} // Animate back off-screen
            transition={{
              duration: 0.5, // Duration of the animation
              ease: [0.4, 0.6, 0.8, 1], // Custom easing function for smoothness
            }}
            css={css`
              @media (min-width: 768px) {
                display: none;
              }
              background-color: #e3f2fd;
            `}
          >
            <SmallOrder>
              <motion.button
                whileTap={{ margin: "2px", scale: 0.9 }}
                css={css`
                  height: 55px;
                  display: flex;
                  align-items: center;
                  border: none;
                  background-color: transparent;
                  transition: transform 0.3s ease-in-out;
                  &:hover,
                  &:active,
                  &:focus-within {
                    background-color: #020008;
                    transform: scale(1.1);
                  }
                `}
              >
                <NavLink
                  to="/"
                  css={css`
                    font-size: 10px;
                    display: flex;
                    gap: 10px;
                    align-items: center;
                    text-decoration: none;
                    padding-left: 12px;
                    @media (min-width: 640px) {
                      display: flex;
                      gap: 0.75rem;
                    }
                  `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    css={css`
                      width: 28px;
                      height: 28px;
                    `}
                  >
                    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                  </svg>
                  <h1
                    css={css`
                      font-size: 20px;
                    `}
                  >
                    Home
                  </h1>
                </NavLink>
              </motion.button>
              <motion.button
                whileTap={{ margin: "2px", scale: 0.9 }}
                css={css`
                  height: 55px;
                  display: flex;
                  border: none;
                  align-items: center;
                  background-color: transparent;
                  transition: 2sec ease;
                  &:hover,
                  &:active,
                  &:focus-within {
                    background-color: #020008;
                    transform: scale(1.1);
                  }
                `}
              >
                <NavLink
                  to="/artist"
                  css={css`
                    font-size: 12px;

                    display: flex;
                    gap: 10px;
                    align-items: center;
                    text-decoration: none;
                    padding-left: 12px;
                    @media (min-width: 640px) {
                      display: flex;
                      gap: 0.75rem;
                    }
                  `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    css={css`
                      width: 28px;
                      height: 28px;
                    `}
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h1>Artists</h1>
                </NavLink>
              </motion.button>
              <motion.button
                whileTap={{ margin: "2px", scale: 0.9 }}
                css={css`
                  height: 55px;
                  display: flex;
                  border: none;
                  align-items: center;
                  background-color: transparent;
                  transition: 2sec ease;
                  &:hover,
                  &:active,
                  &:focus-within {
                    background-color: #020008;
                    transform: scale(1.1);
                  }
                `}
              >
                <NavLink
                  to="/album"
                  css={css`
                    font-size: 12px;
                    display: flex;
                    gap: 10px;
                    align-items: center;
                    text-decoration: none;
                    padding-left: 12px;

                    @media (min-width: 640px) {
                      display: flex;
                      gap: 0.75rem;
                    }
                  `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    css={css`
                      width: 28px;
                      height: 28px;
                    `}
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx={12} cy={12} r={2}></circle>
                      <circle cx={18} cy={9} r={2}></circle>
                      <path d="M15.318 3.631a9 9 0 1 0 5.368 10.736M20 9V2l2 2"></path>
                    </g>
                  </svg>
                  <h1>Albums</h1>
                </NavLink>
              </motion.button>
              <motion.button
                whileTap={{ margin: "2px", scale: 0.9 }}
                css={css`
                  height: 55px;
                  border: none;
                  display: flex;
                  align-items: center;
                  background-color: transparent;
                  transition: 2sec ease;
                  &:hover,
                  &:active,
                  &:focus-within {
                    background-color: #020008;
                    transform: scale(1.1);
                  }
                `}
              >
                <NavLink
                  to="/genres"
                  css={css`
                    font-size: 12px;

                    display: flex;
                    gap: 10px;
                    align-items: center;
                    text-decoration: none;
                    padding-left: 12px;
                    @media (min-width: 640px) {
                      display: flex;
                      gap: 0.75rem;
                    }
                  `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    css={css`
                      width: 28px;
                      height: 28px;
                    `}
                  >
                    <path
                      fill="currentColor"
                      d="M10.072 17.692q1.12 0 1.909-.785T12.769 15V7.846h2.077q.31 0 .54-.221t.23-.548q0-.31-.23-.54t-.54-.23h-2.192q-.31 0-.54.23t-.23.54v5.938q-.388-.315-.85-.511q-.463-.196-.957-.196q-1.122 0-1.907.784t-.785 1.903t.784 1.909t1.903.788M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.708-3.51t1.924-2.859t2.856-1.925T11.997 3t3.51.708t2.859 1.924t1.925 2.856t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                    ></path>
                  </svg>
                  <h1>Genres</h1>
                </NavLink>
              </motion.button>
              <motion.button
                whileTap={{ margin: "2px", scale: 0.9 }}
                css={css`
                  height: 55px;
                  display: flex;
                  border: none;
                  align-items: center;
                  background-color: transparent;
                  transition: 2sec ease;
                  &:hover,
                  &:active,
                  &:focus-within {
                    background-color: #020008;
                    transform: scale(1.1);
                  }
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  css={css`
                    width: 28px;
                    height: 28px;
                  `}
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                <AddSongButton
                  css={css`
                    dispaly: hidden;
                    border: none;

                    font-size: 20px;
                  `}
                  onClick={toggleShow}
                >
                  Add Song
                </AddSongButton>
              </motion.button>
            </SmallOrder>
          </motion.div>
        )}
        <div>{showAdd && <Addsong close={toggleShow} />}</div>
      </div>
    </div>
  );
};

export default Header;
