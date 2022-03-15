import React from "react"
import axios from "axios"
import {connect} from "react-redux"


const Create = ({create}) => {
    return (
        <button onClick = {create}>Create Guitarist</button>
    )
}

const mapDispatch = dispatch => {
    return {
        create: async() => {
            const response = await axios.post('/api/guitarists')
            dispatch({ type: "CREATE_GUITARIST", guitarist: response.data})
        }
    };
};

export default connect(null, mapDispatch) (Create)