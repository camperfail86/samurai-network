import {NavLink, Route, Routes} from 'react-router-dom';
import style from './dialogs.module.css';

export type DialogItemType = {
    name: string
    id: number
}

export type MessageType = {
    message: string
    id: number
}

export type DialogsPropsType = {
    names: DialogItemType[]
    messages: MessageType[]
}

function Message(props: MessageType) {
    return (
        <div>{props.message}</div>
    )
}

function DialogItem(props: DialogItemType) {
    let path = `/dialogs/${props.id}`

    return (
        <li className={style.item}>
            <NavLink to={path}>{props.name}</NavLink>
        </li>
    )
}

// let messagesItems2 = messages2.map((m) => <Message key={m.id} message={m.message}/>)

function Dialogs(props: DialogsPropsType) {
    let messagesItems = props.messages.map((m,index) => <Message key={m.id} message={m.message} id={m.id}/>)
    let dialogs = props.names.map((n) => <DialogItem key={n.id} name={n.name} id={n.id}/>)
    return (
        <div className={style.dialogs}>
            <ul className={style.list}>
                {dialogs}
            </ul>
            <div className={style.messages}>
                <Routes>
                    <Route path={'/dialogs/1'} element={<div>{messagesItems}</div>}/>
                    {/*<Route path={'/dialogs/2'} element={<div>{messagesItems2}</div>}/>*/}
                </Routes>
            </div>
        </div>
    )
}

export default Dialogs;