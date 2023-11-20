import axios from "axios";
import {config} from "../App";

const instance = axios.create(
    {
        withCredentials: true,
        headers: {
            "API-KEY": "8bf529cc-e7bb-4c13-ad05-c2e0207800f3"
        },
        baseURL: 'https://social-network.samuraijs.com/api/1.0'
    }
)

export const userApi= {
    getUser(activePage: number, pageSize: number) {
        return instance.get(`/users?page=${activePage}&count=${pageSize}`)
    },
    unfollow(id: number) {
        return instance.delete(`/follow/${id}`)
    },
    follow(id: number) {
        return instance.post(`/follow/${id}`)
    }
}