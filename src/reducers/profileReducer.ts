import {Dispatch} from "redux";
import axios from "axios";
import {userApi} from "../api/users-api";
import {profileApi} from "../api/profile-api";

export type ProfileType = {
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

export type ProfileActionType = addProfileInfoType | GetStatusUserType


export const profileReducer = (state = initialState, action: ProfileActionType) => {
    switch (action.type) {
        case "PROFILE/ADD-INFO-PROFILE":
            return {...action.payload.profileInfo}
        case "PROFILE/GET-STATUS": {
            return {...state, status: action.payload.status}
        }
        default:
            return state
    }
}

export type addProfileInfoType = ReturnType<typeof addProfileInfoAC>
export const addProfileInfoAC = (profileInfo: ProfileType) => {
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
    dispatch(getStatusUserAC(status))
}
