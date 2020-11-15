import _ from 'lodash';
import {
	CREATE_STREAM_TYPE,
	FETCH_STREAM_TYPE,
	FETCH_STREAMS_TYPE,
	EDIT_STREAM_TYPE,
	DELETE_STREAM_TYPE,
} from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case CREATE_STREAM_TYPE:
			return { ...state, [action.payload.id]: action.payload };
		case FETCH_STREAM_TYPE:
			return { ...state, [action.payload.id]: action.payload };
		case FETCH_STREAMS_TYPE:
			return { ...state, ..._.mapKeys(action.payload, 'id') };
		case EDIT_STREAM_TYPE:
			return { ...state, [action.payload.id]: action.payload };
		case DELETE_STREAM_TYPE:
			return _.omit(state, action.payload);
		default:
			return state;
	}
};
