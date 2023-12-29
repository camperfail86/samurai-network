import {FriendsType} from "../App";

let initialState = [
    {name: 'Grisha', id: 1, sex: 'male'},
]

export const friendsReducer = (state: FriendsType[] = initialState, action: any) => {
    switch (action.type) {
        default: return state
    }
}