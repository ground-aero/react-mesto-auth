export const BASE_URL = 'https://auth.nomoreparties.co';

/** Объект с ошибками сервера * { {"400": string, "401": string} } */
const SERVER_ERRORS = {
    400: "Одно из полей не заполнено или не прошло валидацию.",
    401: "Пользователь с введенным email не найден."
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
            email })
    })
        .then((response) => {
            console.log(response)
            try {
                if (response.status === 200){
                    return response.json();
                }
            } catch(e){
                return (e)
            }
        })
        // .then((res) => {
        //     console.log(res)
        //     return res;
        // })
        .catch((err) => console.log(err));/** код: 400 - некорректно заполнено одно из полей */
};

export const authorize = (password, email) => {
    console.log(password, email)
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then((response => response.json()))
        // .then((data) => {/** выдает токен: {token: 'ryJjlwrethmrtghryn...'} */
        //     console.log(data)
        //     localStorage.setItem('token', data.token);/** сохраняем токен */
        //     return data
        //     // if (data.user){
        //     //     return data;
        //     // }
        // })
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
        // .then((data) => {// {data: {email: aero@mail.ru, id_: '63ebb........'}}
        //   console.log(data)
        //     return data
        // })

}