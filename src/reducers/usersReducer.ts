import {UsersType, UsersAPITypeProps} from "../components/main/users/UsersAPI";
import {Dispatch} from "redux";
import {userApi} from "../api/users-api";

export type UserActionType = FollowUserType
    | AddUsersType
    | ToggleActivePage
    | setTotalCountType
    | ToggleFetchingType
    | ToggleDisabledType

export type InitStateType = {
    users: UsersType[]
    totalUsersCount: number
    pageSize: number
    activePage: number
    isFetching: boolean
    // isDisabled: boolean
    isDisabledArray: number[]
}

let initialState: InitStateType = {
    users: [],
    totalUsersCount: 30,
    pageSize: 5,
    activePage: 1,
    isFetching: true,
    isDisabledArray: []
}

export const usersReducer = (state = initialState, action: UserActionType) => {
    switch (action.type) {
        case "USERS/TOGGLE-FETCHING":
            return {...state, isFetching: action.payload.isFetching}
        case "USERS/SET-COUNT":
            return {...state, totalUsersCount: action.payload.count}
        case "USERS/TOGGLE-PAGE":
            return {...state, activePage: action.payload.id}
        case "USERS/ADD-USERS":
            return {...state, users: action.payload.array.map(u => u)}
        case "USERS/FOLLOW-UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => u.id === action.payload.userId ? {
                    ...u,
                    followed: action.payload.boolean
                } : u)
            }
        case "USERS/TOGGLE-DISABLED": {
            return {
                ...state,
                isDisabledArray: action.payload.isDisabled
                    ? [...state.isDisabledArray, action.payload.userId]
                    : state.isDisabledArray.filter(id => id != action.payload.userId)
            }
        }
        default:
            return state
    }
}
export type FollowUserType = ReturnType<typeof followUserAC>
export const followUserAC = (boolean: boolean, userId: number) => {
    return {
        type: 'USERS/FOLLOW-UNFOLLOW',
        payload: {boolean, userId}
    } as const
}

export type AddUsersType = ReturnType<typeof addUsersAC>
export const addUsersAC = (array: UsersAPITypeProps[]) => {
    return {
        type: 'USERS/ADD-USERS',
        payload: {array}
    } as const
}

export type ToggleActivePage = ReturnType<typeof ToggleActivePageAC>
export const ToggleActivePageAC = (id: number) => {
    return {
        type: 'USERS/TOGGLE-PAGE',
        payload: {id}
    } as const
}

export type setTotalCountType = ReturnType<typeof setTotalCountAC>
export const setTotalCountAC = (count: number) => {
    return {
        type: 'USERS/SET-COUNT',
        payload: {count}
    } as const
}


export type ToggleFetchingType = ReturnType<typeof toggleFetchingAC>
export const toggleFetchingAC = (isFetching: boolean) => {
    return {
        type: 'USERS/TOGGLE-FETCHING',
        payload: {isFetching}
    } as const
}

export type ToggleDisabledType = ReturnType<typeof toggleDisabledAC>
export const toggleDisabledAC = (isDisabled: boolean, userId: number) => {
    return {
        type: 'USERS/TOGGLE-DISABLED',
        payload: {isDisabled, userId}
    } as const
}

export const getUsersTC = (activePage: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(toggleFetchingAC(true))
    const res = await userApi.getUsers(activePage, pageSize)
    dispatch(addUsersAC(res.data.items))
    dispatch(setTotalCountAC(res.data.totalCount))
    dispatch(toggleFetchingAC(false))
}

export const toggleActivePageTC = (p: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(ToggleActivePageAC(p))
    dispatch(toggleFetchingAC(true))
    const res = await userApi.getUsers(p, pageSize)
    dispatch(addUsersAC(res.data.items))
    dispatch(setTotalCountAC(res.data.totalCount))
    dispatch(toggleFetchingAC(false))
}

export const followAndUnfollowTC = (u: UsersType) => async (dispatch: Dispatch) => {
    dispatch(toggleDisabledAC(true, u.id))
    const res = await userApi.unfollow(u.id)
    if (u.followed) {
        dispatch(followUserAC(false, u.id));
        dispatch(toggleDisabledAC(false, u.id))
    } else {
        dispatch(followUserAC(true, u.id))
        dispatch(toggleDisabledAC(false, u.id))
    }
}