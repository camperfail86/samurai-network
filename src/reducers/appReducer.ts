import {authApi} from "../api/auth-api";
import { AppDispatchType} from "../redux/redux-store";
import {setAuthTC} from "./authReducer";
import {Dispatch} from "redux";

export type AuthType = {
    error: string | null
    initialized: boolean
}

let initialState: AuthType = {
    error: null,
    initialized: false
}

export type AppAllActionType = SetErrorType | SetInitializedType

export const appReducer = (state = initialState, action: AppAllActionType) => {
    switch (action.type) {
        case "SET-ERROR": {
            return {...state, error: action.payload.error}
        }
        case "SET-INITIALIZED": {
            return {...state, initialized: action.payload.initialized}
        }
        default:
            return state
    }
}

export type SetErrorType = ReturnType<typeof setErrorAC>
export const setErrorAC = (error: string | null) => {
    return {
        type: 'SET-ERROR',
        payload: {error}
    } as const
}

export type SetInitializedType = ReturnType<typeof setInitializedAC>
export const setInitializedAC = (initialized: boolean) => {
    return {
        type: 'SET-INITIALIZED',
        payload: {initialized}
    } as const
}

export const initializeTC = () => (dispatch: AppDispatchType) => {
    const promise = dispatch(setAuthTC())
    promise.then(()=> {
        dispatch(setInitializedAC(true))
    })
}


