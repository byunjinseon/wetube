//Global 
const HOME = "/"; //home
const JOIN = "/join"; //회원가입
const LOGIN = "/login"; //로그인
const SEARCH = "/search"; //검색
const LOGOUT = "/logout"; //로그아웃
 


//Users
const USERS = "/users";
const USER_DETAIL = "/:id"; // users와 user_detail을 합치면 이런식이 됨 /users/1 :은 변하는 값인걸 express가 인식함
const EDIT_PROFILE = "/edit-profile"; //얘도 users와 합치면 /users/edit-profile 이런식,,
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

//Videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit"; // /video/1/edit
//:id 변하는 값,  그냥 id 는 문자열로 인식함
const DELETE_VIDEO = "/:id/delete";

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback"

const KAKAO = "/auth/kakao";
const KAKAO_CALLBACK = "/auth/kakao/callback";


//API

const API = "/api";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";


const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    userDetail: (id) => {
        if (id) {
            return `/users/${id}`
        } else {
            return USER_DETAIL;
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: (id) => {
        if (id) {
            return `/videos/${id}`;
        } else {
            return VIDEO_DETAIL;
        }
    },
    editVideo: (id) => {
        if (id) {
            return `/videos/${id}/edit`;
        } else {
            return EDIT_VIDEO;
        }
    },
    deleteVideo: (id) => {
        if (id) {
            return `/videos/${id}/delete`;
        } else {
            return DELETE_VIDEO;
        }
    },
    github: GITHUB,
    githubCallback: GITHUB_CALLBACK,
    me: ME,
    kakao: KAKAO,
    kakaoCallback: KAKAO_CALLBACK,
    api: API,
    registerView: REGISTER_VIEW,
    addComment: ADD_COMMENT
};
export default routes;