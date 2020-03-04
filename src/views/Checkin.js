import React from "react";
import Tile from "../Components/Tile";
import CheckinForm from "../Components/CheckinForm"
import styled from "styled-components";


const StyledTile = styled(Tile)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-content: center;
  grid-row-gap: 20px;
  width: 100%;
`;

const StyledHeading = styled.h4`
  text-align: center;
  margin-top: 2%;
  color: ${({ theme }) => theme.colors.purple};
`;

const Checkin = props => {

  

  return (
    <StyledTile>
      <StyledHeading> Log Your Progress For May 18 </StyledHeading>
      <CheckinForm/>
    </StyledTile>
  );
};

Checkin.propTypes = {};

export default Checkin;