import styled from "@emotion/styled";

const Container = styled.div`
  background-color: #3a3c42;
  min-height: 100vh;

  overflow-x: hidden;
  @media (min-width: 640px) {
    max-width: 100%;
  }

    @media (min-width: 768px) {
    width: 80%;
    margin-left: 20%;
  }

  @media (min-width: 884px) {
    max-width: 80%;
    margin-left: 20%;
  }

  @media (min-width: 1024px) {
    max-width: 80%;
    margin-left: 20%;
  }

  @media (min-width: 1200px) {
    max-width: 80%
    margin-left: 20%;
  }

  @media (min-width: 1280px) {
    max-width: 80%;
    margin-left: 20%;
  }

  @media (min-width: 1536px) {
    max-width: 80%;
    margin-left: 20%;
  }
     @media (min-width: 1986px) {
    max-width: 80%;
    margin-left: 20%;
  }
     @media (min-width: 2300px) {
    max-width: 80%;
    margin-left: 20%;
  }
`;
const EditContainer = styled.div`
  background-color: #3a3c42;
  min-height: 97vh;
  width: 100vw;
  display:flex;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  @media (min-width: 640px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 668px;
  }

  @media (min-width: 884px) {
    max-width: 707.2px;
    margin-left: 20%;
  }

  @media (min-width: 1024px) {
    max-width: 960px;
    margin-left: 20%;
  }

  @media (min-width: 1200px) {
    max-width: 1100px;
    margin-left: 20%;
  }

  @media (min-width: 1280px) {
    max-width: 1024px;
    margin-left: 20%;
  }

  @media (min-width: 1536px) {
    max-width: 1480px;
    margin-left: 20%;
  }
`;
const Players = styled.div`
    background-image: linear-gradient(
    to bottom,
    #0e7182,
    #537075,
    #2f4245
  );
    @media (min-width: 320px) {
    height: 70px;
    left : 0;
    right: 0;
    width: 100%;
  }
  @media (min-width: 360px) {
    height: 70px;
    margin-right: 5%;
    left : 0;
    right: 0;
    width: 100%;
  }
 @media (min-width: 390px) {
    height: 70px;
    margin-right: 163px;
    left : 0;
    width: 100%;
  }

   @media (min-width: 428px) {
    height: 70px;
    margin-right: 200px;
    left : 0;
    width: 100%;
  }

  
 @media (min-width: 640px) {
    height: 150px;
  }

  @media (min-width: 768px) {
    height: 150px;
  }

  @media (min-width: 884px) {
    height: 180px;
    
  }

  @media (min-width: 1024px) {
    height: 180px;
    
  }

  @media (min-width: 1200px) {
    height: 200px;
    width: 80%;
   
  }

  @media (min-width: 1280px) {
    height: 180px;
    
  }

  @media (min-width: 1536px) {
    height: 250px;
    
  }
      @media (min-width: 2300px) {
    height: 250px;
  
    
  }
}
`;
export { Container, Players, EditContainer };
