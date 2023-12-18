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
import {SubmitHandler, useForm} from "react-hook-form";
import {friendsSelector, messagesSelector} from "../../../selectors/selectors";

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
const Dialogs = React.memo(() => {
    const dispatch = useDispatch<AppDispatchType>()
    const friends = useSelector<AppStateType, FriendsType[]>(friendsSelector)
    const messages = useSelector<AppStateType, messageObjType>(messagesSelector)
    const onClickHandler = () => {
        dispatch(addMessageAC(messages.newMessage))
        dispatch(rerenderMessageAC(''))
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(rerenderMessageAC(e.currentTarget.value))
    }
    let inputRef = createRef<HTMLInputElement>()
    let messagesItems = messages.messages.map((m) => <Message key={m.id} message={m.message} id={m.id}/>)
    let dialogs = friends.map((f) => <DialogItem key={f.id} name={f.name} id={f.id}/>)

    const { register, handleSubmit } = useForm(
        {
            defaultValues: {
                newMessage: '',
            },
        }
    )
    const onSubmit = (data: any) => console.log(data)

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
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('newMessage')} value={messages.newMessage} onChange={onChangeHandler}/>
                <input type="submit" onClick={onClickHandler}/>
            </form>
        </div>
    )
})

export default WithAuthRedirect(Dialogs);