import {NavLink, Route, Routes} from 'react-router-dom';
import { Navigate } from "react-router-dom";
import style from './dialogs.module.css';
import React, {ChangeEvent, createRef} from "react";
import {ActionType, DialogItemType, FriendsType, MessageType} from "../../../App";
import {addMessageAC, messageObjType, rerenderMessageAC} from "../../../reducers/messageReducer";
import {AuthType} from "../../../reducers/authReducer";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppStateType} from "../../../redux/redux-store";

export type DialogsPropsType = {
    friends: FriendsType[]
    messages: messageObjType
    dispatch: (action: ActionType) => void
    // auth: AuthType
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
// props: DialogsPropsType
function Dialogs() {
    const dispatch = useDispatch<AppDispatchType>()
    const friends = useSelector<AppStateType, FriendsType[]>(state => state.friends)
    const messages = useSelector<AppStateType, messageObjType>(state => state.messages)
    const onClickHandler = () => {
        // props.dispatch(addMessageAC(props.messages.newMessage))
        dispatch(addMessageAC(messages.newMessage))
        // props.dispatch(rerenderMessageAC(''))
        dispatch(rerenderMessageAC(''))
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // props.dispatch(rerenderMessageAC(e.currentTarget.value))
        dispatch(rerenderMessageAC(e.currentTarget.value))
    }
    let inputRef = createRef<HTMLInputElement>()
    // let messagesItems = props.messages.messages.map((m) => <Message key={m.id} message={m.message} id={m.id}/>)
    let messagesItems = messages.messages.map((m) => <Message key={m.id} message={m.message} id={m.id}/>)
    // let dialogs = props.friends.map((f) => <DialogItem key={f.id} name={f.name} id={f.id}/>)
    let dialogs = friends.map((f) => <DialogItem key={f.id} name={f.name} id={f.id}/>)

    // if (!props.auth.isAuth) {return <Navigate to='/login'/>}

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
            {/*<input type="text" value={props.messages.newMessage} onChange={onChangeHandler}/>*/}
            <input type="text" value={messages.newMessage} onChange={onChangeHandler}/>
            <button onClick={onClickHandler}>Добавить сообщение</button>
        </div>
    )
}

export default WithAuthRedirect(Dialogs);