import { useParams } from "react-router-dom";
import React from "react";

function withParams(Component) {
    return (props) => <Component {...props} params={useParams()}/>;
}

export default withParams