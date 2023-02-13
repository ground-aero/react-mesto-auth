export const BASE_URL = 'https://auth.nomoreparties.co';

/** authentication of user */
export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then((response) => {
            try {
                if (response.status === 200){
                    return response.json();
                }
            } catch(e){
                return (e)
            }
        })
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err));
};

export const authorize = (identifier, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({identifier, password})
    })
        .then((response => response.json()))
        .then((data) => {
            if (data.user){
                localStorage.setItem('jwt', data.jwt);
                return data;
            }
        })
        .catch(err => console.log(err))
};