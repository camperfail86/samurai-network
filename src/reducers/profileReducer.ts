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
}

let initialState: ProfileType  = {
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
    }
}

export type ProfileActionType = addProfileInfoType


export const profileReducer = (state  = initialState, action: ProfileActionType) => {
    switch (action.type) {
        case "ADD-INFO-PROFILE":
            return action.payload.profileInfo
        default: return state
    }
}

export type addProfileInfoType = ReturnType<typeof addProfileInfoAC>
export const addProfileInfoAC = (profileInfo: ProfileType) => {
    return {
        type: 'ADD-INFO-PROFILE',
        payload: {
            profileInfo
        }
    } as const
}
