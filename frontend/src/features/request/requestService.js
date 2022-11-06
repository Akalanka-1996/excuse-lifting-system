import axios from "axios";

const API_URL = '/api/requests/'

// create a request

const createRequest = async(requestData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + 'create', requestData, config)

    return response.data
}

// get requests

const getRequests = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}


const requestService = {
    createRequest,
    getRequests
}

export default requestService