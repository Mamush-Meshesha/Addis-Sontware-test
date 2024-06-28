import styled from "@emotion/styled";

const Headers = styled.div`
  width: 18%;
  background-color: #3a3c42;
  position: fixed;
  z-index: 40;
  border-radius: 10px;
  margin: 15px;
  top: 0;
`;
const Order = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 20px;
  padding: 40px;
  @media (min-width: 768px) {
    height: 85%;
  }
`;

const AddSongButton = styled.h1`
  @media (min-width: 640px) {
    addSongButton {
      display: block;
    }
  }
`;
export { Headers, Order, AddSongButton };
