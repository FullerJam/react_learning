import React from 'react'
import PropTypes from 'prop-types'
import DaysCompleted from "./Components/DaysCompleted";
import CheckinComment from "./Components/CheckinComment";

function Dash(props) {
    return (
        <div>
            <h1> Dash </h1>
            <DaysCompleted days={15} checkins={checkins}>
                {" "}
            </DaysCompleted>
            <CheckinComment />
        </div>
    )
}

Dash.propTypes = {

}

export default Dash;