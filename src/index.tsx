import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {stateType} from './App';
import {store} from "./redux/redux-store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
// import {Provider} from "react-redux";

// убрать пропсы если что
// const rerender = (state: stateType) => {
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root')
)
// ;
// }

// rerender(store.getState())

// store.subscribe(() => {
//     let state = store.getState()
//     rerender(state)
// })
