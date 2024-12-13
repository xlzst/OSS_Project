import styled from "styled-components";
import Courses from "../components/Courses";

function MainPage () {
    return (
        <MainWrapper>
            <Courses />
        </MainWrapper>
    );
}

export default MainPage;

const MainWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0.5rem;
`;