import {PostsType} from "../App";

let initialState: PostsType[] = [
    {text: 'Клёва делаишь', likes: 2, id: 1},
    {text: 'Когда приедешь?', likes: 5, id: 2},
]

export const postsReducer = (state = initialState, action: postsReduceType) => {
    switch (action.type) {
        case 'ADD-POST':
            const newPost = {text: action.payload.text, likes: 0, id: state.length + 1}
            return [...state, newPost]
        default:
            return state
    }
}
export type postsReduceType = ReturnType<typeof postsReducerAC>
export const postsReducerAC = (text: string) => {
    return {
        type: 'ADD-POST',
        payload: {text}
    } as const
}