let rerender = () => {
    console.log('render')
}

export const state = {
    messages: [
        {message: 'Привет', id: 1},
        {message: 'Как сам', id: 1},
        {message: 'Нормально', id: 2},
        {message: 'ТЫ как?', id: 2},
    ],
    names: [
        {name: 'Grisha', id: 1},
        {name: 'Nikita', id: 2},
        {name: 'Anatoliy', id: 3}
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
}

export const addPost = (post: string) => {
    const newPost = {text: post, likes: 0, id: state.posts.length + 1}
    state.posts.push(newPost)
    rerender()
}

export const subscribe = (observer: ()=> void) => {
    rerender = observer
}


