import axios from "axios";
// 인증서버를 바라봐요

export const authApi = axios.create({
    baseURL: 'https://moneyfulpublicpolicy.co.kr',
    headers: {
        "Content-Type": "application/json"
    }
});

authApi.interceptors.request.use(
    config => {
        if (config.url.includes("user")) {
            const accessToken = localStorage.getItem('accessToken')
            if (accessToken) {
                // 스탠다드 [문자열] 점과 같음 객체 표현식
                // config.headers.Authorization 과 똑같음
                config.headers["Authorization"] = `Bearer ${accessToken}`
            } else {
                // (스탠다드) 왜 필요할까? 요청이 날라갈 때(인터셉터) 토큰 확인
                alert("인증이 필요합니다.");
                return Promise.reject("인증이 필요합니다.");
            }
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

authApi.interceptors.request.use();
