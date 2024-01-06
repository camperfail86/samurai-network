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
    },
    changePhoto(photo: any) {
        var formData = new FormData();
        formData.append("image", photo);
        return instance.post(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    setProfileInfo(profile: any) {
        return instance.put('profile', profile)
    }
}