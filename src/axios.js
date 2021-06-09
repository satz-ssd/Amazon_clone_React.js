import axios from 'axios';

const instance= axios.create({
    baseURL:"http://localhost:5001/clone-75b23/us-central1/api" // api (cloud function) URL
});

export default instance;  