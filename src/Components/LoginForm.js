import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../Components/Button";
import styled from "styled-components";
import { SocialIcon } from "react-social-icons";
import { useForm } from 'react-hook-form'
import * as yup from 'yup';

const StyledHeading = styled.h3`
    text-align: center;
    margin-top: 2%;
    color: ${({ theme }) => theme.colors.purple};
  `;

const StyledSocialIconArea = styled.div`
    display: flex;
    justify-content: space-around;
    min-width:200px;
    margin:0 auto;
  `;

/**
 * 
 * @param {*} props 
 */
function LoginForm(props) {

    const { buttonText, onSubmit, serverErrorMessage, onSocialLogin } = props;
    const [displayEmail, setDisplayEmail] = useState(false);

    const loginSchema = yup.object().shape({
        email: yup.string().email('Email is not valid').required('Email is required'),
        password: yup.string().required('Password is required').min(8, 'Password must be a minimum of 8 chars')
    });
    const { register, handleSubmit, errors } = useForm({ validationSchema: loginSchema });


    const handleClick = e => {
        e.preventDefault();
        setDisplayEmail(!displayEmail);
    }

    const handleDataSubmit = data => { onSubmit(data) }
    const handleSocialClick = provider => {
        onSocialLogin(provider)
    }

    return (
        <React.Fragment>
            <StyledSocialIconArea>
                <SocialIcon onClick={() => handleSocialClick("facebook")} network="facebook" />
                <SocialIcon onClick={() => handleSocialClick("google")} network="google" />
            </StyledSocialIconArea>
            <StyledHeading> OR </StyledHeading>


            {!displayEmail && (<Button text="Email" onClick={handleClick} />)}

            {displayEmail && (
                <form onSubmit={handleSubmit(handleDataSubmit)}>
                    <p>
                        <label> Email </label>
                    </p>
                    <p>
                        <input type="text" name="email" ref={register} />
                        {errors.email && errors.email.message}
                    </p>
                    <p>
                        <label> Password </label>
                    </p>
                    <p>
                        <input type="password" name="password" ref={register} />
                        {errors.password && errors.password.message}
                    </p>
                    <Button text={buttonText} />
                    {serverErrorMessage}
                </form>
            )}




        </React.Fragment>
    );
}

LoginForm.propTypes = {
    buttonText: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onSocialLogin: PropTypes.func.isRequired,
    serverErrorMessage: PropTypes.string
};

LoginForm.defaultProps = {
    buttonText: "JOIN",
    serverErrorMessage:''
};

export default LoginForm;