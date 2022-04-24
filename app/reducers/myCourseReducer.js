import {LOAD_MY_COURSE,SET_MY_COURSE} from '../actions/types';

const initialState = {
    data:[],
    loading:false
}


const myCourse = (state= initialState,action)=>{
    const {type,data} = action;

    switch (type) {
        case LOAD_MY_COURSE:

        return{
            ...state,loading:data
        }

        case SET_MY_COURSE:
            return {
                ...state,data
            }
    
        default:
            return state;
    }
}

export default myCourse;