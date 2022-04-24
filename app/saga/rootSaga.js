
import { all } from 'redux-saga/effects'
import mycourseSaga from './getMyCourseSaga';

// saga imports


export default function* rootSaga() {
    yield all([
        mycourseSaga()
    ]);
}