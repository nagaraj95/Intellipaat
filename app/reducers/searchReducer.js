import { LOAD_MY_COURSE, SET_SEARCH_COURSE, CLEAR_SEARCH } from '../actions/types';

const intialData = {
    loading: false,
    data: []
}


const searchReducer = (state = intialData, action) => {
    const { type, data } = action;

    switch (type) {
        case LOAD_MY_COURSE:
            return {
                ...state, loading: data
            }

        case SET_SEARCH_COURSE:
            return {
                ...state, data
            }
        case CLEAR_SEARCH:
            return intialData;

        default:
            return state;
    }
}

export default searchReducer;