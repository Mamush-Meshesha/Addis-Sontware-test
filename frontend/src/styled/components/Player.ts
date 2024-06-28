import styled from "@emotion/styled";

const PlayerStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  gap: 0.5rem;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  width: 100%;
  background-image: linear-gradient(to bottom, #314447, #517076, #343a46);
  border: 0;
  border-color: transparent;
  color: #ffffff;

  @media (max-width: 360px) {
    margin-top: 0.1rem;
    display: flex;
   width: 100%;
   position: absolute;
    top: 0;
  }

  @media (min-width: 640px) {
    margin: 6.5rem 0rem;
    position: absolute;
    padding-left: 0rem;
    top: 0;
  }

  @media (min-width: 768px) {
    margin: 6.5rem 0rem;
    padding-left: 0rem;
    position: absolute;
    top: 0;
  }

  @media (min-width: 884px) {
    margin: 6.5rem 0rem;
    position: absolute;
    top: 0;
    padding-left: 5rem;
  }

  @media (min-width: 1024px) {
    margin: 13.5rem 0rem;
    position: absolute;
    top: 0;
    padding-left: 5rem;
  }

  @media (min-width: 1200px) {
    margin: 9rem 0rem;
    position: absolute;
    padding-left: 5rem;
    top: 0;
  }

  @media (min-width: 1594px) {
    margin: 13.5rem 0rem;
    position: absolute;
    top: 0;
    padding-left: 5rem;
  }
`;

export { PlayerStyle };
