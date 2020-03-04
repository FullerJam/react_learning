import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import drinkIcon from "../assets/drink-icon.svg";
import foodIcon from "../assets/food-icon.svg";
import Button from "../Components/Button";
import styled from "styled-components";
// import ErrorLabel from "../Components/ErrorLabel"
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const StyledForm = styled.form`
  display: grid;
  justify-content: center;
  text-align: left;
`;

const StyledLabel = styled.label`
  text-align: left;
  margin-top: 5%;
`;

const StyledCheckinP = styled.p`
  display: flex;
  font-size: 13px;
  justify-content: space-around;
  margin-top: 5%;
  input:nth-child(1) {
    background: green;
  }
  input:checked {
    background-color: #a77e2d !important;
    color: #ffffff !important;
  }
`;

const StyledFoodDrinkArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
`;

const StyledSelect = styled.select`
  padding-left: 25%;
  text-indent: 40%;
  background: white;
  width: 135px;
  height: 44px;
  font-size: 14px;
  color: rgba(31, 32, 65, 0.75);
`;

const StyledIcon = styled.img`
  margin-right: -10px;
  z-index: 2000;
  display: relative;
  position: absolute;
  margin-top: 10px;
  margin-left: 6px;
`;

const StyledCheckinTitle = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    font-size: 12px;
    color: ${({ theme, error }) => error ? theme.colors.red : theme.colors.darkShade[25]};
    margin-top: 5%;
  }
`;

const StyledPointsP = styled.p`
  color: ${({ theme }) => theme.colors.darkGreen};
  text-align: right;
`;
const StyledErrorMsg = styled.p`
  color: ${({ theme }) => theme.colors.red};
  text-align: center;
`;

const StyledHeading = styled.h4`
  text-align: center;
  margin-top: 2%;
  color: ${({ theme }) => theme.colors.purple};
`;



function CheckinForm(props) {
  const [total, setTotal] = useState(0);

  const maxCmmtChars = 145;
  
  const checkinSchema = yup.object().shape({
    exercise: yup.string().required("required"),
    veg: yup.string().required("required"),
    water: yup.string().required("required"),
    diet: yup.string().required("required"),
    comment: yup.string().max(145,{
      message:"your comments must be below 145 characters in length"
    })
    // createdOn: yup.date().default(function () {
      //   return new Date()
      // })

      //make sure you add ref={register to each of the inputs that you're wanting to validate/interact with}
    })
    const { register, handleSubmit, errors, watch } = useForm({
      validationSchema: checkinSchema,
      defaultValues: { comment: "", exercise:"",veg:"",water:"",diet:"" }
    });
    
    const comment = watch('comment');
    const diet = watch('diet');
    const [ remainingCmmtChars, setRemainingCmmtChars] = useState(maxCmmtChars);
    
  /**
   * Handles max char limit on text box
   */  
  useEffect(() => {
    setRemainingCmmtChars(maxCmmtChars - comment.length)
  }, [comment]);

  const formFields = watch(); //watch(); react form utility watches for form changes
  let checkinScore = {
    exercise:0,
    veg:0,
    water:0,
    diet:0
  }

  /**
   * Handles checkin score tally
   */
  useEffect(() => {
    checkinScore.exercise = !formFields.exercise ? 0 : parseInt(formFields.exercise);
    checkinScore.veg = !formFields.veg ? 0 : parseInt(formFields.veg);
    checkinScore.water = !formFields.water ? 0 : parseInt(formFields.water);

    //if the diet form field no longer has it's default value then run
    if(formFields.diet !== ""){
      // console.log(formFields.diet)
      checkinScore.diet = formFields.diet === "0" ?  10 - (parseInt(formFields.foodDeduction) + parseInt(formFields.drinkDeduction)) : parseInt(formFields.diet)
    }

    setTotal(checkinScore.exercise + checkinScore.veg + checkinScore.water + checkinScore.diet);
    
  }, [formFields]);

  //function called by handlesubmit() show's error msg JSON object to console
  const onSubmit = data => { 
    console.log({...data,...checkinScore,...{total:total}}) 
    //if handling a real form submit this should be passed as a prop to the checkin component once validated and submittted to the database.
  }





  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      {/* {JSON.stringify(diet)} */}
      <StyledLabel>Did you exercise for at least 20 mins (5) ?</StyledLabel>
      <StyledCheckinP>
        {" "}
        <span>
          <input type="radio" value="5" ref={register} name="exercise" /> Yes{" "}
        </span>{" "}
        <span>
          <input type="radio" value="0" ref={register} name="exercise" /> No{" "}
        </span>{" "}
      </StyledCheckinP>
      <StyledErrorMsg>{errors.exercise && errors.exercise.message}</StyledErrorMsg>
      <StyledLabel>Did you eat 5 portions of veg (3)?</StyledLabel>
      <StyledCheckinP>
        <span>
          <input type="radio" value="3" ref={register} name="veg" /> Yes
          </span>
        <span>
          <input type="radio" value="0" ref={register} name="veg" /> No
          </span>
      </StyledCheckinP>
      <StyledErrorMsg>{errors.veg && errors.veg.message}</StyledErrorMsg>
      <StyledLabel>Did you drink 2l of water (2)?</StyledLabel>
      <StyledCheckinP>
        <span>
          <input type="radio" value="2" ref={register} name="water" /> Yes
          </span>
        <span>
          <input type="radio" value="0" ref={register} name="water" /> No
          </span>
      </StyledCheckinP>
      <StyledErrorMsg>{errors.water && errors.water.message}</StyledErrorMsg>

      <StyledLabel>Was your diet perfect (10)?</StyledLabel>
      <StyledCheckinP>
        <span>
          <input type="radio" value="10" ref={register} name="diet" /> Yes
          </span>
        <span>
          <input type="radio" value="0" ref={register} name="diet" /> No
          </span>
      </StyledCheckinP>
      <StyledErrorMsg>{errors.diet && errors.diet.message}</StyledErrorMsg>
      {diet === "0" && <StyledFoodDrinkArea>
        <StyledLabel>Naughty Drinks</StyledLabel>
        <StyledLabel>Naughty Food</StyledLabel>
        <div>

          <StyledIcon src={drinkIcon} />
          <StyledSelect name="drinkDeduction" ref={register}>
            <option value="0"> 0 </option>
            <option value="1"> 1 </option>
            <option value="2"> 2 </option>
            <option value="3"> 3 </option>
            <option value="4"> 4 </option>
            <option value="5"> 5 </option>
          </StyledSelect>
        </div>
        <div>
          <StyledIcon src={foodIcon} />
          <StyledSelect name="foodDeduction" ref={register}>
            <option value="0"> 0 </option>
            <option value="1"> 1 </option>
            <option value="2"> 2 </option>
            <option value="3"> 3 </option>
            <option value="4"> 4 </option>
            <option value="5"> 5 </option>
          </StyledSelect>
        </div>
      </StyledFoodDrinkArea>}
      <StyledCheckinTitle error={remainingCmmtChars < 0}><StyledLabel>Comments</StyledLabel> <p>{remainingCmmtChars} chars</p> </StyledCheckinTitle>
      <textarea name="comment" rows="4" cols="40" ref={register}></textarea>
      <StyledErrorMsg>{errors.text && errors.text.message}</StyledErrorMsg>
      <StyledHeading> Total: {total} points </StyledHeading>
      <Button text="CHECKIN">   <StyledPointsP> {total} </StyledPointsP>   </Button>
    </StyledForm>
  );
}

CheckinForm.propTypes = {
};

export default CheckinForm;