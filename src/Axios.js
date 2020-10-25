import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:5001/challenge-b6dbb/us-central1/api"  // THE API (cloud function) URL
});

export default instance;