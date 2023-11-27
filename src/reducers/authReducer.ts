import {UsersType, UsersAPITypeProps} from "../components/main/users/UsersAPI";
import {authApi} from "../api/auth-api";
import {Dispatch} from "redux";

export type AuthType = {
    userId: string,
    email: string,
    login: string,
    isAuth: boolean
}

let initialState: AuthType = {
    userId: '1',
    email: 'asjn@mail.ru',
    login: '1',
    isAuth: false
}

export type authActionType = setAuthType

export const authReducer = (state = initialState, action: authActionType) => {
    switch (action.type) {
        case "SET-USER-DATA":
            return {
                ...state,
                ...action.payload,
                isAuth: true
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

export const setAuthTC = () => (dispatch: Dispatch) => {
    authApi.setAuth()
        .then((res) => {
                if (res.data.resultCode === 0) {
                    const {id, email, login} = res.data.data
                    dispatch(setAuthAC(id, email, login))
                }
            }
        )
}
