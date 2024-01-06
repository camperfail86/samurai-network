import {Dispatch} from "redux";
import axios from "axios";
import {userApi} from "../api/users-api";
import {profileApi} from "../api/profile-api";
import {PhotoType, Profile} from "../components/main/profile/profile";
import {pathToFileURL} from "url";
import {AppStateType} from "../redux/redux-store";

export type ProfileType = {
    "aboutMe": null | string,
    "contacts": {
        "facebook": null | string,
        "website": null | string,
        "vk": null | string,
        "twitter": null | string,
        "instagram": null | string,
        "youtube": null | string,
        "github": null | string,
        "mainLink": null | string
    },
    "lookingForAJob": boolean,
    "lookingForAJobDescription": null,
    "fullName": string,
    "userId": number,
    "photos": {
        "small": string | null,
        "large": string | null
    }
    "status": null | string
}

let initialState: ProfileType = {
    "aboutMe": null,
    "contacts": {
        "facebook": null,
        "website": null,
        "vk": null,
        "twitter": null,
        "instagram": null,
        "youtube": null,
        "github": null,
        "mainLink": null
    },
    "lookingForAJob": true,
    "lookingForAJobDescription": null,
    "fullName": 'VaSya',
    "userId": 10,
    "photos": {
        "small": null,
        "large": null
    },
    "status": ''
}

export type ProfileActionType = addProfileInfoType | GetStatusUserType | ChangePhotoType
export const profileReducer = (state = initialState, action: ProfileActionType) => {
    switch (action.type) {
        case "PROFILE/ADD-INFO-PROFILE":
            return {...action.payload.profileInfo}
        case "PROFILE/GET-STATUS": {
            return {...state, status: action.payload.status}
        }
        case "PROFILE/CHANGE-PHOTO": {
            return {...state, photos: action.payload.photos}
        }
        default:
            return state
    }
}

export type addProfileInfoType = ReturnType<typeof addProfileInfoAC>
export const addProfileInfoAC = (profileInfo: any) => {
    return {
        type: 'PROFILE/ADD-INFO-PROFILE',
        payload: {profileInfo}
    } as const
}

export type GetStatusUserType = ReturnType<typeof getStatusUserAC>
export const getStatusUserAC = (status: string | null) => {
    return {
        type: 'PROFILE/GET-STATUS',
        payload: {status}
    } as const
}

export type ChangePhotoType = ReturnType<typeof changePhotoAC>
export const changePhotoAC = (photos: any) => {
    return {
        type: 'PROFILE/CHANGE-PHOTO',
        payload: {photos}
    } as const
}

export const getUserProfileInfoTC = (id: number) => async (dispatch: Dispatch) => {
    const res = await profileApi.getProfileInfo(id)
    dispatch(addProfileInfoAC(res.data))
}

export const getStatusUserTC = (id: number) => async (dispatch: Dispatch) => {
    const res = await profileApi.getStatus(id)
    dispatch(getStatusUserAC(res.data))
}

export const setStatusUserTC = (status: string | null) => async (dispatch: Dispatch) => {
    const res = await profileApi.updateStatus(status)
    if (res.data.resultCode === 0) {
        dispatch(getStatusUserAC(status))
    }
}

export const changePhotoTC = (photo: PhotoType) => async (dispatch: Dispatch) => {
    const res = await profileApi.changePhoto(photo)
    if (res.data.resultCode === 0) {
        dispatch(changePhotoAC(res.data.data.photos))
    }
}

export const setProfileInfoTC = (profile: Profile) => async (dispatch: Dispatch, getState: ()=>AppStateType) => {
    const state = getState();
    const model = {
        contacts: {
            vk: profile.vk, github: profile.github
        },
        aboutMe: state.profile.aboutMe,
        fullName: state.profile.fullName,
        lookingForAJob: profile.lookingForAJob,
        lookingForAJobDescription: profile.lookingForAJobDescription,
        status: state.profile.status,
        photos: {
            large: state.profile.photos.large
        }
    }
    const res = await profileApi.setProfileInfo(model)

    if (res.data.resultCode === 0) {
        dispatch(addProfileInfoAC(model))
    }
}

// const model = {
//     aboutMe: null,
//     contacts: {facebook: null, website: null,
//     vk: profile.contacts.vk, github: profile.contacts.github, twitter: null, instagram: null,
//     mainLink:null, youtube:null},
//     fullName:"camperfail86",
//     lookingForAJob:false,
//     lookingForAJobDescription:null,
//     photos:{small: 'https://social-network.samuraijs.com/activecontent/images/users/30118/user-small.jpg?v=4', large: 'https://social-network.samuraijs.com/activecontent/images/users/30118/user.jpg?v=4'},
//     status:"aasdsdsdsdd",
//     userId: 30118
// }