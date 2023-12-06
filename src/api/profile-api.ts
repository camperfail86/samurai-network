import {instance} from "./users-api";

export const profileApi= {
    getProfileInfo(id: number) {
        return instance.get(`/profile/${id}`)
    },
    getStatus(id: number) {
        return instance.get(`profile/status/${id}`)
    },
    updateStatus(status: string | null){
        return instance.put(`profile/status`, {status: status})
    }
}