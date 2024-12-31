import axios from 'axios';
import { GETALLAPPLICATIONS, GETMYAPPLICATIONS, GETPARTICIPANTSLIST } from '../ActionTypes/ApplicationTypes';
import {handleError} from './ErrorsActions'

// Base URL of the backend
const API_BASE_URL = 'https://grback.onrender.com';

export const getAllApplications = () => async (dispatch) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/applications/getAllApplications`);

        dispatch({
            type: GETALLAPPLICATIONS,
            payload: res.data.applications,
        });
    } catch (error) {
        console.log(error);
    }
};

export const getMyApplications = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/applications/getMyApplications/${id}`);

        dispatch({
            type: GETMYAPPLICATIONS,
            payload: res.data,
        });
    } catch (error) {
        console.log(error);
    }
};

export const applyToEvent = (application) => async (dispatch) => {
    try {
        await axios.post(`${API_BASE_URL}/api/applications/applyToEvent`, application);
        dispatch(getAllApplications());
    } catch (error) {
        error.response.data.errors.forEach((element) => {
            dispatch(handleError(element.msg));
          });
    }
};

export const cancelApplication = (id, idParticipant) => async (dispatch) => {
    try {
        await axios.delete(`${API_BASE_URL}/api/applications/deleteApplication/${id}`);
        dispatch(getMyApplications(idParticipant));
    } catch (error) {
        console.log(error);
    }
};

export const getParticipantsList = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/applications/getParticpantsList/${id}`);

        dispatch({
            type: GETPARTICIPANTSLIST,
            payload: res.data,
        });
    } catch (error) {
        console.log(error);
    }
};

export const approveOrReject = (eventId, appId, newStatus) => async (dispatch) => {
    try {
        await axios.put(`${API_BASE_URL}/api/applications/UpdateApplicationStatus/${appId}`, newStatus);
        dispatch(getParticipantsList(eventId));
    } catch (error) {
        console.log(error);
    }
};
