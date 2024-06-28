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
const Tilt = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  color: white;
  padding: 80px 0 40px 0;
`;
const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin: 0 10%;
`;
export { Container, Tilt, Table };
