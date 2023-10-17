import {stateType} from "../App";

type storeType = {
    _state: stateType
    _rerender: ()=> void
    addPost: (post: string) => void
    subscribe: (observer: ()=> void) => void
    getState: ()=> stateType
    addMessage: (message: string)=> void
}

export const store: storeType = {
    _state: {
        messages: [
            {message: 'Привет', id: 1},
            {message: 'Как сам', id: 1},
            {message: 'Нормально', id: 2},
            {message: 'ТЫ как?', id: 2},
        ],
        names: [
            {name: 'Grisha', id: 1},
            {name: 'Nikita', id: 2},
            {name: 'Nastya', id: 3}
        ],
        friends: [
            {name: 'Grisha', id: 1, sex: 'male'},
            {name: 'Yarik', id: 2, sex: 'male'},
            {name: 'Nastya', id: 3, sex: 'female'}
        ],
        posts: [
            {text: 'Клёва делаишь', likes: 2, id: 1},
            {text: 'Когда приедешь?', likes: 5, id: 2},
        ]
    },
    _rerender(){
        console.log('render')
    },
    addPost(post: string) {
        const newPost = {text: post, likes: 0, id: this._state.posts.length + 1}
        this._state.posts.push(newPost)
        this._rerender()
    },
    addMessage(message: string) {
        const newMessage = {message: message, id: 1}
        this._state.messages.push(newMessage)
        this._rerender()
    },
    getState() {
        return this._state
    },
    subscribe(observer: ()=> void){
        this._rerender = observer
    }
}



