import { axiosInstance } from '../../axiosInstance'

export const signup = (email, password) => {
    return axiosInstance.post("user/create/",{
        email: email,
        password: password
    })
}

export const signin = (email, password) => {
    return axiosInstance.post("user/token/",{
        email: email,
        password: password
    })
}

export const isAuthenticated = () => {
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    if (jwt) {
        return jwt
    }
    return false;
}

export const authenticate = (jwt,is_staff,is_lead,email) => {
    if (jwt) {
        localStorage.setItem("jwt",JSON.stringify(jwt));
        localStorage.setItem("is_staff",JSON.stringify(is_staff));
        localStorage.setItem("is_lead",JSON.stringify(is_lead));
        localStorage.setItem("email",JSON.stringify(email));
    }
}

export const signout = (next=f=>f) => {
    localStorage.clear();
    next();
}

export const isStaff = () => {
    const is_staff = JSON.parse(localStorage.getItem("is_staff"))
    return is_staff;
}

export const isLead = () => {
    const is_lead = JSON.parse(localStorage.getItem("is_lead"))
    return is_lead;
}

export const getEmail = () => {
    const email = JSON.parse(localStorage.getItem("email"))
    return email;
}