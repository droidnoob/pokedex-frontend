import axios from 'axios';

const apiCall = (url, method, data={}, success, errorf= ()=>{}) => {
    axios({
        method,
        url,
        baseURL: process.env.REACT_APP_API_URL,
        data
    }).then(success)
    .catch(errorf)
}

export default apiCall;
    
