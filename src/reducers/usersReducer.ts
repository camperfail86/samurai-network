import {UsersType, UsersAPITypeProps} from "../components/main/users/UsersAPI";

export type UserActionType = FollowUserType | AddUsersType | ToggleActivePage | setTotalCountType | ToggleFetchingType

export type InitStateType = {
    users: UsersType[]
    totalUsersCount: number
    pageSize: number
    activePage: number
    isFetching: boolean
}

let initialState: InitStateType = {
    users: [],
    totalUsersCount: 100,
    pageSize: 5,
    activePage: 1,
    isFetching: true
}

export const usersReducer = (state = initialState, action: UserActionType) => {
    switch (action.type) {
        case "TOGGLE-FETCHING":
            return {...state, isFetching: action.payload.isFetching}
        case "SET-COUNT":
            return {...state, totalUsersCount: action.payload.count}
        case "TOGGLE-PAGE":
            return {...state, activePage: action.payload.id}
        case "ADD-USERS":
            return {...state, users: action.payload.array.map(u => u)}
        case "FOLLOW-UNFOLLOW":
            return {...state, users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: !u.followed} : u)}
        default:
            return state
    }
}
export type FollowUserType = ReturnType<typeof followUserAC>
export const followUserAC = (userId: number) => {
    return {
        type: 'FOLLOW-UNFOLLOW',
        payload: {userId}
    } as const
}

export type AddUsersType = ReturnType<typeof addUsersAC>
export const addUsersAC = (array: UsersAPITypeProps[]) => {
    return {
        type: 'ADD-USERS',
        payload: {array}
    } as const
}

export type ToggleActivePage = ReturnType<typeof ToggleActivePageAC>
export const ToggleActivePageAC = (id: number) => {
    return {
        type: 'TOGGLE-PAGE',
        payload: {id}
    } as const
}

export type setTotalCountType = ReturnType<typeof setTotalCountAC>
export const setTotalCountAC = (count: number) => {
    return {
        type: 'SET-COUNT',
        payload: {count}
    } as const
}


export type ToggleFetchingType = ReturnType<typeof toggleFetchingAC>
export const toggleFetchingAC = (isFetching: boolean) => {
    return {
        type: 'TOGGLE-FETCHING',
        payload: {isFetching}
    } as const
}