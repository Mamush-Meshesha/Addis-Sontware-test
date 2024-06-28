import styled from "@emotion/styled";

const Container = styled.div`
  width: 79%;
  margin-left: 20%;
  background-color: #132040;
  margin-right: 0.75rem;
  border-radius: 0.5rem;
  height: 97vh;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Titl = styled.div`
  font-size: 30px;
  display: flex;
  justify-content: center;
  width: 100%;
  color: white;
  padding: 40px 0;
`;

const EachArtist = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 80px;
`;
const Table = styled.div`
  display: flex;
  background-color: black;
  gap: 2;
  padding: 16px 20px;
  color: white;
  border-radius: 6px;
`;
export { Container, Titl, EachArtist, Table };
