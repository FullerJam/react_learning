import PropTypes from "prop-types";
import styled from "styled-components";


const Tile = styled.div`box-shadow: 0px 10px 20px rgba(31, 32, 32, ${props => props.elevation});padding: 3%;max-width:700px; margin:0 auto;`;


Tile.propTypes = {
  elevation: PropTypes.string
};

Tile.defaultProps = {
  elevation: "0.05"
};

export default Tile;
