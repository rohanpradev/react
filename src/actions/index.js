import streams from '../api/streams';
import {
	SIGN_IN_TYPE,
	SIGN_OUT_TYPE,
	CREATE_STREAM_TYPE,
	FETCH_STREAMS_TYPE,
	FETCH_STREAM_TYPE,
	EDIT_STREAM_TYPE,
	DELETE_STREAM_TYPE,
} from './types';
import history from '../history';

const signIn = (userId) => {
	return {
		type: SIGN_IN_TYPE,
		payload: userId,
	};
};

const signOut = () => {
	return {
		type: SIGN_OUT_TYPE,
	};
};

const createStream = (formValues) => async (dispatch, getState) => {
	const { userid } = getState().auth;
	const { data } = await streams.post('/streams', { ...formValues, userid });
	dispatch({ type: CREATE_STREAM_TYPE, payload: data });
	history.push('/');
};

const fetchStreams = () => async (dispatch) => {
	const { data } = await streams.get('/streams');
	dispatch({ type: FETCH_STREAMS_TYPE, payload: data });
};

const fetchStream = (id) => async (dispatch) => {
	const { data } = await streams.get(`/streams/${id}`);
	dispatch({ type: FETCH_STREAM_TYPE, payload: data });
};

const editStream = (id, formValues) => async (dispatch) => {
	const { data } = await streams.patch(`/streams/${id}`, formValues);
	dispatch({ type: EDIT_STREAM_TYPE, payload: data });
	history.push('/');
};

const deleteStream = (id) => async (dispatch) => {
	await streams.delete(`/streams/${id}`);
	dispatch({ type: DELETE_STREAM_TYPE, payload: id });
	history.push('/');
};

export { signIn, signOut, createStream, fetchStreams, fetchStream, editStream, deleteStream };
