import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import FreeCourseReducer from "./reducers/freeCourseReducer";
import rootSaga from "./saga/rootSaga";
import MyCourseReducer from './reducers/myCourseReducer';
import searchReducer from "./reducers/searchReducer";


const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [],
};

const rootReducer = combineReducers({
    freeCourse:FreeCourseReducer,
    myCourse:MyCourseReducer,
    search:searchReducer

});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

let composeEnhancers = compose;
// eslint-disable-next-line no-undef
composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
);
export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export default store;