import { API } from "../../backend"



export const getAllOrders = (userId, token) => {
    return fetch(`${API}/order/all/${userId}`, {
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