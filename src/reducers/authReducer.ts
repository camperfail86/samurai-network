import {UsersType, UsersAPITypeProps} from "../components/main/users/UsersAPI";

export type AuthType = {
    userId: string,
    email: string,
    login: string
}

let initialState: AuthType = {
    userId: '1',
    email: 'asjn@mail.ru',
    login: ''
}

type authActionType = setAuthType

export const authReducer = (state = initialState, action: authActionType) => {
    switch (action.type) {
        case "SET-USER-DATA":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export type setAuthType = ReturnType<typeof setAuthAC>
export type PropsSetAuthProps = string | null
export const setAuthAC = (userId: PropsSetAuthProps, email: PropsSetAuthProps, login: PropsSetAuthProps) => {
    return {
        type: 'SET-USER-DATA',
        payload: {userId, email, login}
    } as const
}
