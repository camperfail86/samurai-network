import React from "react";
import {deletePostAC, postsReducer, postsReducerAC} from "../reducers/postsReducer";

test('new post ', () => {
    let state = [
        {text: 'Клёва делаишь', likes: 2, id: 1},
        {text: 'Когда приедешь?', likes: 5, id: 2},
    ]

    let endState = [
        {text: 'Клёва делаишь', likes: 2, id: 1},
        {text: 'Когда приедешь?', likes: 5, id: 2},
        {text: 'test', likes: 0, id: 3}
    ]

    let newState = postsReducer(state, postsReducerAC('test'))

    expect(newState).toEqual(endState)
    expect(newState.length).toBe(3)
});

test('delete post ', () => {

    let state = [
        {text: 'Клёва делаишь', likes: 2, id: 1},
        {text: 'Когда приедешь?', likes: 5, id: 2},
    ]

    let endState = [
        {text: 'Когда приедешь?', likes: 5, id: 2},
    ]

    let newState = postsReducer(state, deletePostAC(1))

    expect(newState).toEqual(endState)
    expect(newState.length).toBe(1)
});