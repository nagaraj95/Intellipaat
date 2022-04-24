import axios from 'axios';

const URL = 'https://bigdataonlinetraining.us/academy/mobile_apis/V1/courses.php?'

export const myCourseApi = () => axios({
    method: 'get',
    url: `https://bigdataonlinetraining.us/academy/mobile_apis/V1/my_course.php?type=getMycourses&user_id=55`,
  })

export const freeCourseApi = () => axios.get(URL + 'type=getcoursebysearch&search_key=Data')

export const searchCourseApi = (data) => axios({
  method: 'get',
  url: `https://bigdataonlinetraining.us/academy/mobile_apis/V1/my_course.php?type=getMycourses&user_id=55&search_key=${data}`,
})