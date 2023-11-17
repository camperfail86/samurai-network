import {FriendsType} from "../App";

let initialState = [
    {name: 'Grisha', id: 1, sex: 'male'},
    {name: 'Yarik', id: 2, sex: 'male'},
    {name: 'Nastya', id: 3, sex: 'female'}
]

export const friendsReducer = (state: FriendsType[] = initialState, action: any) => {
    switch (action.type) {
        default: return state
    }
}