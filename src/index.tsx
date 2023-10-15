import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {state, subscribe} from "./redux/state"
import {addPost} from "./redux/state"
const rerender = () => {
    ReactDOM.render(
        <App addPost={addPost} state={state}/>,
        document.getElementById('root'));
}
rerender()
subscribe(rerender)
