import { API } from "../../backend"


export const signup = (user) => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then((res) => res.json())
        .catch((err) => console.log(err))
}


export const signin = (user) => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then((res) => res.json())
        .catch((err) => console.log(err))
}


export const authenticate = (data, next) => {  
    if (typeof window !== undefined) {
        localStorage.setItem("jwt", JSON.stringify(data)) 
        next()
    }
}


export const signout = (next) => {
    if (typeof window !== undefined) {    
        localStorage.removeItem("jwt")
        next()

        return fetch(`${API}/signout`)   // fetch default is "GET" method
            .then((res) => console.log("Signout Successfull"))
            .catch((err) => console.log(err))
    }
}


export const isAuthenticated = () => {
    if (typeof window == undefined) {     // window is UNDEFINED(is not there)
        return false
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt")) //we get the token & compare user & token at frontend.
    } else {
        return false
    }
}