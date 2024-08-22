import styled from "@emotion/styled";

const PlayerStyle = styled.div`
  display: flex;
  align-items: center;
  border-radius: 12px;
  gap: 1rem;
  padding: 1rem;
  width: 85%;
  background-color: #2b3a42; /* Changed background color */
  border: 1px solid #517076;
  color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Added subtle shadow */

  /* General styling for all screen sizes */
  margin: 1rem 0;
  position: relative;
  top: 0;

  @media (max-width: 360px) {
    margin-top: 0.5rem;
    display: flex;
    width: 100%;
    padding: 0.5rem;
    top: 0;
  }

  @media (min-width: 640px) {
    margin: 1.5rem 0;
    padding: 1rem;
  }

  @media (min-width: 768px) {
    margin: 2rem 0;
    padding: 1rem 2rem;
  }

  @media (min-width: 884px) {
    margin: 2.5rem 0;
    padding: 1rem 3rem;
  }

  @media (min-width: 1024px) {
    margin: 3rem 0;
    padding: 1.5rem 4rem;
  }

  @media (min-width: 1200px) {
    margin: 3.5rem 0;
    padding: 1.5rem 5rem;
  }

  @media (min-width: 1594px) {
    margin: 4rem 0;
    padding: 2rem 6rem;
  }
`;

export { PlayerStyle };
