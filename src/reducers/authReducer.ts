import {UsersType, UsersAPITypeProps} from "../components/main/users/UsersAPI";
import {authApi} from "../api/auth-api";
import {Dispatch} from "redux";
import {AppDispatchType} from "../redux/redux-store";
import {setErrorAC} from "./appReducer";

export type AuthType = {
    userId: string | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

export type DataTypeLogin = {
    email: string
    password: string
    rememberMe: boolean
}

let initialState: AuthType = {
    userId: null,
    email: null,
    login: null,
    // isAuth: true
    isAuth: false
}

export type authActionType = setAuthType

export const authReducer = (state = initialState, action: authActionType) => {
    switch (action.type) {
        case "AUTH/SET-USER-DATA":
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export type setAuthType = ReturnType<typeof setAuthAC>
export type PropsSetAuthProps = string | null
export const setAuthAC = (userId: PropsSetAuthProps, email: PropsSetAuthProps, login: PropsSetAuthProps, isAuth: boolean) => {
    return {
        type: 'AUTH/SET-USER-DATA',
        payload: {userId, email, login, isAuth}
    } as const
}

export const setAuthTC = () => async (dispatch: Dispatch) => {
    return authApi.setAuth()
        .then((res) => {
                if (res.data.resultCode === 0) {
                    const {id, email, login} = res.data.data
                    dispatch(setAuthAC(id, email, login, true))
                }
            }
        )
}

export const loginTC = (data: DataTypeLogin) => async (dispatch: AppDispatchType) => {
    const res = await authApi.login(data)
    if (res.data.resultCode === 0) {
        dispatch(setAuthTC())
        dispatch(setErrorAC(null))
    } else {
        dispatch(setErrorAC(res.data.messages[0]))
    }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
    const res = await authApi.logout()
    if (res.data.resultCode === 0) {
        dispatch(setAuthAC(null, null, null, false))
    }
}
