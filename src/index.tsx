import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {stateType} from './App';
import {store} from "./redux/state";

// убрать пропсы если что
const rerender = () => {
    ReactDOM.render(
        <App state={store.getState()}
             addMessage={store.addMessage.bind(store)}
             addPost={store.addPost.bind(store)}/>,
        document.getElementById('root'));
}
rerender()
store.subscribe(rerender)
