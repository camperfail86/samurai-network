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
    "status": null
}

export type ProfileActionType = addProfileInfoType | GetStatusUserType


export const profileReducer = (state = initialState, action: ProfileActionType) => {
    switch (action.type) {
        case "ADD-INFO-PROFILE":
            return {...action.payload.profileInfo}
        case "GET-STATUS": {
            return {...state, status: action.payload.status}
        }
        default:
            return state
    }
}

export type addProfileInfoType = ReturnType<typeof addProfileInfoAC>
export const addProfileInfoAC = (profileInfo: ProfileType) => {
    return {
        type: 'ADD-INFO-PROFILE',
        payload: {profileInfo}
    } as const
}

export type GetStatusUserType = ReturnType<typeof getStatusUserAC>
export const getStatusUserAC = (status: string | null) => {
    return {
        type: 'GET-STATUS',
        payload: {status}
    } as const
}

export const getUserProfileInfoTC = (id: number) => (dispatch: Dispatch) => {
    profileApi.getProfileInfo(id).then((res) =>
        dispatch(addProfileInfoAC(res.data))
    )
}

export const getStatusUserTC = (id: number) => (dispatch: Dispatch) => {
    profileApi.getStatus(id).then((res) => {
            dispatch(getStatusUserAC(res.data))
        }
    )
}

export const setStatusUserTC = (status: string | null) => (dispatch: Dispatch) => {
    profileApi.updateStatus(status).then((res) => {
            dispatch(getStatusUserAC(status))
        }
    )
}
