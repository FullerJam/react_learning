import React, {useState} from "react"
import styled from "styled-components"
import Tile from "../Components/Tile"
import { Link } from "react-router-dom"
import Form from "../Components/LoginForm"
import PropTypes from "prop-types"

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
  `

const StyledTile = styled(Tile)`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    justify-content: center;
    grid-row-gap: 20px;
    width: 100%;
    @media (min-width: 600px) {
      width: 30%;
    }
  `

const StyledHeading = styled.h2`
    text-align: center;
    margin-top: 2%;
    color: ${({ theme }) => theme.colors.purple};
  `
const StyledLink = styled(Link)`
    text-align: center;
  `

function Join(props) {
  const [serverErrorMessage, setServerErrorMessage] = useState('')
  const { signUpWithEmail, signInWithProvider } = props
  const handleEmailSubmit = async (data) => {
    // console.log(data)
    const { email, password } = data
    try {
      await signUpWithEmail(email, password)
    } catch (e) {
      console.log(e)
      setServerErrorMessage(e.message)
    }
  }

  const handleSocialLogin = provider => {
    signInWithProvider(provider)
  }



  return (
    <StyledWrapper>
      <StyledTile>
        <StyledHeading>Get Started</StyledHeading>
        <StyledHeading>Join With </StyledHeading>
        <Form onSocialLogin={handleSocialLogin} serverErrorMessage={serverErrorMessage} onSubmit={handleEmailSubmit} />
        <StyledLink to="/login"> Already a member - Login </StyledLink>
      </StyledTile>
    </StyledWrapper>
  )
}

Join.propTypes = {
  signUpWithEmail: PropTypes.func.isRequired,
  signInWithProvider: PropTypes.func.isRequired
}

export default Join