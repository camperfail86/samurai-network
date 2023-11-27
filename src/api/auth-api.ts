import axios from "axios";
import {instance} from "./users-api";


export const authApi= {
    setAuth() {
        return instance.get(`/auth/me`)
    },
}