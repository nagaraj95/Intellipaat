import { combineReducers } from "redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from "redux-persist/es/persistReducer";
import FreeCourse from "./freeCourseReducer";
import MyCourse from './myCourseReducer';
import SearchReducer from "./searchReducer";


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    timeout: 100000,
    whitelist: []
};



const reducers = combineReducers({
    freeCourse: FreeCourse,
    myCourse: MyCourse,
    searchData: SearchReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default persistedReducer;

