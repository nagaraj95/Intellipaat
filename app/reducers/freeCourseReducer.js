import { LOAD_COURSE, SET_COURSE } from '../actions/types';

const initialState = {
    data: [],
    loading: false
}

const FreeCourse = (state = initialState, action) => {
    const { type, data } = action;

    switch (type) {
        case LOAD_COURSE:

            return {
                ...state,
                loading: data
            };
        case SET_COURSE:
            return {
                ...state,
                data
            }

        default:
                return state
    }
}

export default FreeCourse;