import {checkResponse} from "./checkResponse";

export const BASE_URL = 'https://auth.nomoreparties.co';

function request(url, options) {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(url, options).then(checkResponse)
}

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
            email
        })
    })
        .then(checkResponse)
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
        .then(checkResponse)
};

/** отправляем запрос на роут аутентификации */
export const checkToken = (token) => {
    // console.log(token)
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(checkResponse)

}