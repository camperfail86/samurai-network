import {NavLink, Route, Routes} from 'react-router-dom';
import style from './dialogs.module.css';
import React, {ChangeEvent, createRef} from "react";
import {ActionType, DialogItemType, FriendsType, MessageType} from "../../../App";
import {addMessageAC, messageObjType, rerenderMessageAC} from "../../../reducers/messageReducer";

export type DialogsPropsType = {
    friends: FriendsType[]
    messages: messageObjType
    dispatch: (action: ActionType) => void
}

function Message(props: MessageType) {
    return (
        <div className={`${style.message} ${props.id === 1 ? style.messageUser : ''}`}>{props.message}</div>
    )
}

function DialogItem(props: DialogItemType) {
    let path = `/dialogs/${props.id}`

    return (
        <li className={style.item}>
            <NavLink className={style.link} to={path}>{props.name}</NavLink>
        </li>
    )
}

function Dialogs(props: DialogsPropsType) {
    const onClickHandler = () => {
        props.dispatch(addMessageAC(props.messages.newMessage))
        props.dispatch(rerenderMessageAC(''))
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.dispatch(rerenderMessageAC(e.currentTarget.value))
    }
    let inputRef = createRef<HTMLInputElement>()
    let messagesItems = props.messages.messages.map((m) => <Message key={m.id} message={m.message} id={m.id}/>)
    let dialogs = props.friends.map((f) => <DialogItem key={f.id} name={f.name} id={f.id}/>)
    return (
        <div className={style.dialogs}>
            <ul className={style.list}>
                {dialogs}
            </ul>
            <div className={style.messages}>
                <Routes>
                    <Route path='/1' element={messagesItems}/>
                    <Route path='/2' element={<div>2</div>}/>
                </Routes>
            </div>
            <input type="text" value={props.messages.newMessage} onChange={onChangeHandler}/>
            <button onClick={onClickHandler}>Добавить сообщение</button>
        </div>
    )
}

export default Dialogs;