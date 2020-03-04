import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../Components/Button";
import styled from "styled-components";
import { SocialIcon } from "react-social-icons";
import { useForm } from 'react-hook-form'
import * as yup from 'yup';


function LoginForm(props) {
    console.log(useForm);

    const loginSchema = yup.object().shape({
        email: yup.string().required('Email is required').email('Email is not valid'),
        password: yup.string().required('Password is required').min(8, 'Password must be a minimum of 8 chars'),
        createdOn: yup.date().default(function () {
            return new Date();
        }),
    });
    const { register, handleSubmit, errors } = useForm({ validationSchema: loginSchema });
    const onSubmit = data => { console.log(data) }


    const { buttonText } = props;
    const [displayEmail, setDisplayEmail] = useState(false);

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
                        <input type="text" name="email" /*ref={register({ required: true })}*/ />
                        <p>{errors.email && errors.email.message}</p>
                        {/* <p>{errors.email && 'Email is required'} </p> */}
                    </p>
                    <p>
                        <label> Password </label>
                    </p>
                    <p>
                        <input type="password" name="password" /*ref={register({ required: true, minLength: 6 })}*/ />
                        <p>{errors.password && errors.password.message}</p>
                        {/* <p>{errors.password && 'Password is required (min char length 6)'}</p> */}
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