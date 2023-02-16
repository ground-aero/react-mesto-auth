export const BASE_URL = 'https://auth.nomoreparties.co';

/** Объект с ошибками сервера * { {"400": string, "401": string} } */
const SERVER_ERROR = {
    400: "Одно из полей не заполнено или не прошло валидацию",
    401: "Пользователь с введенным email не найден"
}

const handleAuthRes = (res) => {
    if (res.status === 400 || res.status === 401) {
        throw new Error(SERVER_ERROR[res.status]);
    } else {
        return res.json();
    }
};

/** authentication of user - отправка рег данных*/
export const register = (password, email) => {
    // console.log(password, email)
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password,
            email })
    })
        .then((response) => {
            // console.log(response)
                if (response.ok){
                    return response.json();
                } else {
                    return Promise.reject(response.status)
                }
        })
};

export const authorize = (password, email) => {
    // console.log(password, email)
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then((response) => handleAuthRes(response) )
        .catch(err => console.log(err))/** коды: 400 - не передано одно из полей;  401 - пользователь с email не найден  */
};

/** отправляем запрос на роут аутентификации */
export const checkToken = (token) => {
    console.log(token)
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
        .then((res) => res.json())

}