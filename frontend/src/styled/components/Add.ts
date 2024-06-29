import styled from "@emotion/styled";
const Add = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
`;
const Pad = styled.div`
  border-radius: 8px;
  background-color: #3a3c42;
  position: relative;
  border: 2px solid green;
  @media (min-width: 320px) {
    padding: 10px;
    width: 350px;
    hieght: auto;
    font-size: 16px;
  }

  @media (min-width: 360px) {
    padding: 10px;
    width: 350px;
    hieght: auto;
    font-size: 16px;
  }

  @media (min-width: 390px) {
    padding: 10px;
    width: 350px;
    hieght: auto;
    font-size: 16px;
  }

  @media (min-width: 690px) {
    padding: 10px;
    width: 200px;
    hieght: 450px;
  }

  @media (min-width: 768px) {
    padding: 10px;
    width: 300px;
    hieght: 450px;
  }

  @media (min-width: 884px) {
    width: 500px;
    hieght: 500px;
  }

  @media (min-width: 1024px) {
    width: 600px;
    hieght: 600px;
  }

  @media (min-width: 1200px) {
    width: 600px;
    hieght: 600px;
  }

  @media (min-width: 1280px) {
    width: 600px;
    hieght: 600px;
  }

  @media (min-width: 1536px) {
    width: 600px;
    hieght: 600px;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 20px;
  padding: 0 20px;
  @media (min-width: 320px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 360px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 412px) {
    width: 100%;

    display: flex;
    flex-direction: column;
  }
  @media (min-width: 640px) {
    width: 100%;
    display: flex;
    flex-direction: columns;
  }

  @media (min-width: 768px) {
    display: flex;
    flex-direction: columns;
  }

  @media (min-width: 884px) {
    display: flex;
    flex-direction: columns;
  }

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1280px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1536px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;
export { Add, Pad, Grid };
