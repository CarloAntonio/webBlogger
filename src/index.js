import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

//global axios configuration
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

//request interceptor
axios.interceptors.request.use(request => {
    //edit all request here if a global change needs to be made
    console.log(request);

    //must always return the request after using
    return request; 
}, error => {
    //global error handler
    console.log(error);

    //must always return error
    return Promise.reject(error); 
}); //registers axios intercepter that affects all sub files

//response interceptor
axios.interceptors.response.use(response => {
    //edit all response here if a global change needs to be made
    console.log(response);

    //must always return the response after using
    return response;
}, error => {
    console.log(error);

    //must always return error
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
