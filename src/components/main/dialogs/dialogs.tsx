import {NavLink, Route, Routes} from 'react-router-dom';
import style from './dialogs.module.css';
import React, {createRef} from "react";
import {DialogItemType, MessageType} from "../../../App";

export type DialogsPropsType = {
    names: DialogItemType[]
    messages: MessageType[]
    addMessage:(message: string)=> void
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

// let messagesItems2 = messages2.map((m) => <Message key={m.id} message={m.message}/>)

function Dialogs(props: DialogsPropsType) {
    const onClickHandler = () => {
        if (inputRef.current) {
            props.addMessage(inputRef.current.value)
            inputRef.current.value = ''
        }

    }
    let inputRef = createRef<HTMLInputElement>()
    let messagesItems = props.messages.map((m) => <Message key={m.id} message={m.message} id={m.id}/>)
    let dialogs = props.names.map((n) => <DialogItem key={n.id} name={n.name} id={n.id}/>)
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
            <input type="text" ref={inputRef}/>
            <button onClick={onClickHandler}>Добавить сообщение</button>
        </div>
    )
}

export default Dialogs;