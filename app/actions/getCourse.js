import { LOAD_COURSE, SET_COURSE, GET_COURSE, LOAD_MY_COURSE, SET_MY_COURSE, GET_MY_COURSE, LOAD_SEARCH, SET_SEARCH_COURSE, SEARCH_COURSE, CLEAR_SEARCH } from "./types";

export const setCourse = (data) => ({ type: SET_COURSE, data })
export const loadCourse = (data) => ({ type: LOAD_COURSE, data })
export const getCourse = (data) => ({ type: GET_COURSE, data });


//MY course

export const setMyCourse = (data) => ({ type: SET_MY_COURSE, data })
export const loadMyCourse = (data) => ({ type: LOAD_MY_COURSE, data })
export const getMyCourse = (data) => ({ type: GET_MY_COURSE, data });

//Search course
export const searchCourse = (data) => ({ type: SEARCH_COURSE, data })
export const loadSearchCourse = (data) => ({ type: LOAD_SEARCH, data })
export const setSearchCourse = (data) => ({ type: SET_SEARCH_COURSE, data })
export const clearSearchCourse = (data) => ({ type: CLEAR_SEARCH, data })