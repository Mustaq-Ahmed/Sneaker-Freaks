import { API } from "../../backend"

export const getUserInfo = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then((res) => res.json())
        .catch((err) => console.log(err))
}

export const updateUserInfo = (userId, token, userInfo) => {
    return fetch(`${API}/user/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userInfo)
    })
        .then((res) => res.json())
        .catch((err) => console.log(err))
}