import axios from "axios";
import {instance} from "./users-api";
import {DataTypeLogin} from "../reducers/authReducer";


export const authApi= {
    setAuth() {
        return instance.get(`/auth/me`)
    },
    login({email, password, rememberMe}: DataTypeLogin) {
        return instance.post(`/auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}