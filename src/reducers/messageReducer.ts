import {MessageType} from "../App";

// let initialState: MessageType[]  =  [
//     {message: 'Привет', id: 1},
//     {message: 'Как сам', id: 1},
//     {message: 'Нормально', id: 2},
//     {message: 'ТЫ как?', id: 2},
// ]

export type messageObjType = {
    newMessage: string
    messages: MessageType[]
}

let initialState: messageObjType  = {
    newMessage: '',
    messages: [
        {message: 'Привет', id: 1},
        {message: 'Как сам', id: 1},
        {message: 'Нормально', id: 2},
        {message: 'ТЫ как?', id: 2},
    ]
}

export type MessageActionType = rerenderMessageType | addMessageType

export const messageReducer = (state  = initialState, action: MessageActionType) => {
    switch (action.type) {
        case 'ADD-MESSAGE':
            const newMessage = {message: action.payload.newMessage, id: 1}
            return {...state, messages: [...state.messages, newMessage]}
        case "RERENDER-MESSAGE":
            return {...state, newMessage: action.payload.newSymbolMessage}
        default: return state
    }
}

export type addMessageType = ReturnType<typeof addMessageAC>
export const addMessageAC = (newMessage: string) => {
    return {
        type: 'ADD-MESSAGE',
        payload: {
            newMessage
        }
    } as const
}

export type rerenderMessageType = ReturnType<typeof rerenderMessageAC>
export const rerenderMessageAC = (newSymbolMessage: string) => {
    return {
        type: 'RERENDER-MESSAGE',
        payload: {
            newSymbolMessage
        }
    } as const
}