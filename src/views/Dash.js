import React from '../../node_modules/react';
import PropTypes from '../../node_modules/prop-types';
import DaysCompleted from "../Components/DaysCompleted";
import CheckinComment from "../Components/CheckinComment";

function Dash(props) {

    const {checkins, days} = props;

    return (
        <React.Fragment>
            <DaysCompleted days={days} checkins={checkins} />
            <CheckinComment />
        </React.Fragment>
    )
}

Dash.propTypes = {
    checkins: PropTypes.array.isRequired,
    days: PropTypes.number.isRequired
}

export default Dash;