import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {stateType} from './App';
import {store} from "./redux/redux-store";
import {Provider} from "react-redux";
// import {Provider} from "react-redux";

// убрать пропсы если что
// const rerender = (state: stateType) => {
ReactDOM.render(
    <Provider store={store}>
        <App
             // dispatch={store.dispatch.bind(store)}
        />
    </Provider>
    , document.getElementById('root')
)
// ;
// }

// rerender(store.getState())

// store.subscribe(() => {
//     let state = store.getState()
//     rerender(state)
// })
