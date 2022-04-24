import { call, put, takeLatest } from "@redux-saga/core/effects";
import { GET_COURSE, GET_MY_COURSE, SEARCH_COURSE } from '../actions/types';
import { myCourseApi, freeCourseApi, searchCourseApi } from '../api/index';
import { loadCourse, setCourse, loadMyCourse, setMyCourse, loadSearchCourse, setSearchCourse } from '../actions/getCourse';

function* freeCourse({ data }) {
    yield put(loadCourse(true));

    try {
        const res = yield call(freeCourseApi, data);
        yield put(setCourse(res.data));
    } catch (error) {
        yield put(loadCourse(false));

    } finally {
        yield put(loadCourse(false));

    }
}

function* getMyCourse({ data }) {
    yield put(loadMyCourse(true))

    try {
        const res = yield call(myCourseApi, data);
        yield put(setMyCourse(res.data));
    } catch (error) {
        yield put(loadMyCourse(false));
    } finally {
        yield put(loadMyCourse(false));
    }
}


function* searchCourse({ data }) {
    yield put(loadSearchCourse(true))

    try {
        const res = yield call(searchCourseApi, data)
        yield put(setSearchCourse(res.data))
    } catch (error) {
        yield put(loadSearchCourse(false));
    } finally {
        yield put(loadSearchCourse(false));
    }
}



function* mycourseSaga() {
    yield takeLatest(GET_COURSE, freeCourse);
    yield takeLatest(GET_MY_COURSE, getMyCourse);
    yield takeLatest(SEARCH_COURSE, searchCourse);
}

export default mycourseSaga;