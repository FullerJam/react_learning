import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../Components/Button";
import styled from "styled-components";
import { SocialIcon } from "react-social-icons";
import { useForm } from 'react-hook-form'
import * as yup from 'yup'; // for everything
// or
import { string, object } from 'yup'; // for only what you need

function LoginForm(props) {
    
    console.log(useForm);
    
    let yup = require('yup');
    let schema = yup.object().shape({
        email: yup.string().required().email(),
        password: yup.number(),
        createdOn: yup.date().default(function () {
            return new Date();
        }),
    });

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => { console.log(data) }
    const { buttonText } = props;
    const [displayEmail, setDisplayEmail] = useState(false);

    const StyledHeading = styled.h2`
    text-align: center;
    margin-top: 2%;
    color: ${({ theme }) => theme.colors.purple};
  `;

    const StyledSocialIconArea = styled.div`
    display: flex;
    justify-content: space-around;
  `;

    const handleClick = (e) => {
        e.preventDefault();
        setDisplayEmail(!displayEmail);
    }

    return (
        <React.Fragment>
            <StyledSocialIconArea>
                <SocialIcon network="facebook" />
                <SocialIcon network="google" />
                <SocialIcon network="twitter" />
            </StyledSocialIconArea>
            <StyledHeading> OR </StyledHeading>


            {!displayEmail && (<Button text="Email" onClick={handleClick} />)}

            {displayEmail && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p>
                        <label> Email </label>
                    </p>
                    <p>
                        <input type="text" name="email" ref={register({ required: true })} />
                        <p>{errors.email && 'Email is required'} </p>
                    </p>
                    <p>
                        <label> Password </label>
                    </p>
                    <p>
                        <input type="password" name="password" ref={register({ required: true, minLength: 6 })} />
                        <p>{errors.password && 'Password is required (min char length 6)'}</p>
                    </p>
                    <Button text={buttonText} />
                </form>
            )}




        </React.Fragment>
    );
}

LoginForm.propTypes = {
    buttonText: PropTypes.string
};

LoginForm.defaultProps = {
    buttonText: "JOIN"
};

export default LoginForm;