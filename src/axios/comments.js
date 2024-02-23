import axios from "axios";
import { authApi } from "./auth";

const commentsAxios = axios.create({
    // 스탠다드 / baseURL 틀렸음.. 이게 오류의 원인인듯
    baseURL: `${process.env.REACT_APP_API_URL}/comments/`,
    timeout: 1500
});

commentsAxios.interceptors.request.use(
    async config => {
        // 스탠다드 /유저가 가지고 있는 토큰이 지금 요청을 보내려고 하는 이 시점에 맞아? -> 이미 auth에서 확인 로직이 있음
        try {
            await authApi.get("/users")

            // 성공
            return config;
            //config.headers.Authorization = `Bearer ${response.data.accessToken}`
        } catch (error) {
            return Promise.reject(error);
        }
    },
    error => {
        return error;
    }
);

commentsAxios.interceptors.response.use(
    response => {
        console.log("요청 성공입니다.")
        return response;
    }, error => {
        return Promise.reject(error);
    }
);

export default commentsAxios;
